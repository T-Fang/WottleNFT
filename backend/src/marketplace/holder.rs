// Wallet that holds NFTs for sale

use crate::marketplace::un_goals::UnGoal;
use crate::{config::Config, decode_private_key, Error, Result};
use cardano_serialization_lib::address::{
    Address, EnterpriseAddress, NetworkInfo, StakeCredential,
};
use cardano_serialization_lib::crypto::{PrivateKey, TransactionHash, Vkeywitness};
use cardano_serialization_lib::metadata::{
    AuxiliaryData, GeneralTransactionMetadata, MetadataList, MetadataMap, TransactionMetadatum,
};
use cardano_serialization_lib::utils::{make_vkey_witness, to_bignum, Int};
use cardano_serialization_lib::{AssetName, PolicyID};
use serde::ser::SerializeStruct;
use serde::{Serialize, Serializer};
use serde_json::Value;
use sqlx::PgPool;
use tokio_stream::StreamExt;

const MARKETPLACE_METADATA_LABEL_KEY: u64 = 888;

pub struct MarketplaceHolder {
    pub address: Address,
    address_bech32: String,
    private_key: PrivateKey,
}

pub struct SellData {
    pub policy_id: PolicyID,
    pub asset_name: AssetName,
    pub metadata: SellMetadata,
}

pub struct SellMetadata {
    pub seller_address: Address,
    pub price: u64,
    pub un_goal: UnGoal,
}

#[derive(sqlx::FromRow)]
struct PgSellData {
    policy: Vec<u8>,
    name: Vec<u8>,
    json: Value,
}

impl PgSellData {
    fn to_sell_data(self) -> Option<SellData> {
        let policy_id = PolicyID::from_bytes(self.policy);
        let asset_name = String::from_utf8(self.name)
            .map_err(|_| Error::Message("Failed to convert asset name to string".to_string()))
            .and_then(|s| AssetName::new(s.into_bytes()).map_err(|e| Error::Js(e)));
        let seller_address = self
            .json
            .get("seller_address")
            .and_then(|v| v.as_array())
            .and_then(|arr| {
                arr.into_iter()
                    .map(|v| v.as_str().map(|s| s.to_string()))
                    .collect::<Option<Vec<String>>>()
            })
            .map(|v| v.join(""))
            .ok_or(Error::Unknown)
            .and_then(|s| Address::from_bech32(&s).map_err(|e| Error::Js(e)));
        let price = self.json.get("price").and_then(|v| v.as_u64());

        let un_goal = self
            .json
            .get("un_goal")
            .ok_or(Error::Unknown)
            .and_then(|v| {
                serde_json::from_value::<UnGoal>(v.clone()).map_err(|e| Error::JsonDecode(e))
            });

        if let (Ok(policy_id), Ok(asset_name), Ok(seller_address), Some(price), Ok(un_goal)) =
            (policy_id, asset_name, seller_address, price, un_goal)
        {
            Some(SellData {
                policy_id,
                asset_name,
                metadata: SellMetadata {
                    seller_address,
                    price,
                    un_goal,
                },
            })
        } else {
            None
        }
    }
}

impl Clone for MarketplaceHolder {
    fn clone(&self) -> Self {
        let bytes = self.private_key.as_bytes();
        Self {
            address: self.address.clone(),
            address_bech32: self.address_bech32.clone(),
            private_key: PrivateKey::from_normal_bytes(&bytes).unwrap(),
        }
    }
}

impl MarketplaceHolder {
    pub fn from_config(config: &Config) -> Result<Self> {
        let private_key = decode_private_key(&config.marketplace_private_key_file)?;
        let pub_key_hash = private_key.to_public().hash();
        let network = if config.is_testnet {
            NetworkInfo::testnet().network_id()
        } else {
            NetworkInfo::mainnet().network_id()
        };
        let address =
            EnterpriseAddress::new(network, &StakeCredential::from_keyhash(&pub_key_hash))
                .to_address();
        let address_bech32 = address.to_bech32(None)?;
        Ok(Self {
            address,
            address_bech32,
            private_key,
        })
    }

    pub async fn get_nft_details(
        &self,
        pool: &PgPool,
        policy_id: &PolicyID,
        asset_name: &AssetName,
    ) -> Result<Option<SellData>> {
        let hex_policy = hex::encode(policy_id.to_bytes());
        let asset_name_str = String::from_utf8(asset_name.name())
            .map_err(|_| Error::Message("Cannot convert asset name to string".to_string()))?;
        let pg_sell_data: Option<PgSellData> = sqlx::query_as::<_, PgSellData>(
            r#"
                SELECT 
                    policy,
                    name,
                    json
                FROM tx_out 
                LEFT JOIN tx_in ON tx_out.tx_id = tx_in.tx_out_id AND tx_out.index = tx_in.tx_out_index
                INNER JOIN tx_metadata
                ON tx_out.tx_id = tx_metadata.tx_id AND tx_metadata.key = 888
                INNER JOIN ma_tx_out
                ON tx_out.id = ma_tx_out.tx_out_id
                AND tx_in.id IS NULL
                WHERE address = $1
                AND encode(policy, 'hex') = $2
                AND convert_from(name, 'utf-8') = $3
            "#,
        )
        .bind(&self.address_bech32)
        .bind(&hex_policy)
        .bind(&asset_name_str)
        .fetch_optional(pool)
        .await?;

        Ok(pg_sell_data.and_then(PgSellData::to_sell_data))
    }

    pub async fn get_nfts_for_sale(&self, pool: &PgPool) -> Result<Vec<SellData>> {
        let mut rows = sqlx::query_as::<_, PgSellData>(
            r#"
                SELECT 
                    policy,
                    name,
                    json
                FROM tx_out 
                LEFT JOIN tx_in ON tx_out.tx_id = tx_in.tx_out_id AND tx_out.index = tx_in.tx_out_index
                INNER JOIN tx_metadata
                ON tx_out.tx_id = tx_metadata.tx_id AND tx_metadata.key = 888
                INNER JOIN ma_tx_out
                ON tx_out.id = ma_tx_out.tx_out_id
                AND tx_in.id IS NULL
                WHERE address = $1
                "#,
        )
        .bind(&self.address_bech32)
        .fetch(pool);

        let mut sell_datas = vec![];

        while let Some(pg_data) = rows.try_next::<PgSellData, _>().await? {
            let pg_data: PgSellData = pg_data;
            if let Some(sell_data) = pg_data.to_sell_data() {
                sell_datas.push(sell_data);
            }
        }
        Ok(sell_datas)
    }

    pub fn sign_transaction_hash(&self, hash: &TransactionHash) -> Vkeywitness {
        make_vkey_witness(hash, &self.private_key)
    }
}

impl Serialize for SellData {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut serialize_struct = serializer.serialize_struct("SellData", 3)?;
        serialize_struct.serialize_field("policyId", &hex::encode(self.policy_id.to_bytes()))?;
        serialize_struct.serialize_field(
            "assetName",
            &String::from_utf8(self.asset_name.name())
                .map_err(|_| serde::ser::Error::custom("Failed to serialize asset name"))?,
        )?;
        serialize_struct.serialize_field("metadata", &self.metadata)?;
        serialize_struct.end()
    }
}

impl Serialize for SellMetadata {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut serialize_struct = serializer.serialize_struct("SellMetadata", 4)?;
        serialize_struct.serialize_field(
            "sellerAddress",
            &self
                .seller_address
                .to_bech32(None)
                .map_err(|_| serde::ser::Error::custom("Failed to serialize seller address"))?,
        )?;
        serialize_struct.serialize_field("price", &self.price)?;
        serialize_struct.serialize_field("unGoal", &self.un_goal)?;
        serialize_struct
            .serialize_field("namiAddress", &hex::encode(&self.seller_address.to_bytes()))?;
        serialize_struct.end()
    }
}

impl SellMetadata {
    pub fn create_sell_nft_metadata(&self) -> Result<AuxiliaryData> {
        let SellMetadata {
            seller_address,
            un_goal,
            price,
        } = self;
        let un_goal_serialized = serde_json::to_value(&un_goal)?
            .as_str()
            .unwrap()
            .to_string();
        let mut auxiliary_data = AuxiliaryData::new();
        let mut general_tx_data = GeneralTransactionMetadata::new();

        let tx_metadata = TransactionMetadatum::new_map(&{
            let mut map = MetadataMap::new();
            map.insert_str(
                "price",
                &TransactionMetadatum::new_int(&Int::new(&to_bignum(*price))),
            )?;
            map.insert_str(
                "un_goal",
                &TransactionMetadatum::new_text(un_goal_serialized)?,
            )?;

            let addr_string = seller_address.to_bech32(None)?;
            let addr_string_list: Vec<String> = addr_string
                .chars()
                .collect::<Vec<char>>()
                .chunks(64)
                .map(|c| c.iter().collect::<String>())
                .collect();
            let mut addr_list = MetadataList::new();

            for s in addr_string_list {
                addr_list.add(&TransactionMetadatum::new_text(s)?);
            }

            map.insert_str(
                "seller_address",
                &TransactionMetadatum::new_list(&addr_list),
            )?;
            map
        });

        general_tx_data.insert(&to_bignum(MARKETPLACE_METADATA_LABEL_KEY), &tx_metadata);
        auxiliary_data.set_metadata(&general_tx_data);
        Ok(auxiliary_data)
    }
}

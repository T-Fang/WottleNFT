use std::convert::TryFrom;

use cardano_serialization_lib::{
    address::Address,
    crypto::{PrivateKey, PublicKey, ScriptHash, TransactionHash, Vkeywitnesses},
    metadata::{AuxiliaryData, GeneralTransactionMetadata, MetadataMap, TransactionMetadatum},
    utils::{hash_transaction, make_vkey_witness, min_ada_required, to_bignum, Int, Value},
    AssetName, Assets, Mint, MintAssets, MultiAsset, NativeScript, NativeScripts, ScriptAll,
    ScriptHashNamespace, ScriptPubkey, TimelockExpiry, Transaction, TransactionOutput,
    TransactionWitnessSet,
};
use serde::{Deserialize, Serialize};

use crate::coin::TransactionWitnessSetParams;
use crate::{cardano_db_sync::ProtocolParams, error::Error, Result};
use cardano_serialization_lib::utils::{Coin, TransactionUnspentOutput};
use std::collections::HashMap;

const EXPIRY_IN_SECONDS: u32 = 3600;
const NFT_STANDARD_LABEL: u64 = 721;

#[derive(Debug, Serialize, Deserialize)]
pub struct WottleNftMetadata {
    name: String,
    description: String,
    image: String,
    #[serde(flatten)]
    pub rest: HashMap<String, serde_json::Value>,
}

impl WottleNftMetadata {
    pub fn new(name: String, description: String, image: String) -> Self {
        Self {
            name,
            description,
            image,
            rest: HashMap::new(),
        }
    }
}

impl std::convert::TryFrom<&WottleNftMetadata> for MetadataMap {
    type Error = crate::Error;

    fn try_from(value: &WottleNftMetadata) -> Result<Self> {
        let mut nft_metadata_map = MetadataMap::new();
        use serde_json::Value::*;
        for (k, v) in &value.rest {
            let key = TransactionMetadatum::new_text(k.to_string())?;
            let value = match v {
                Bool(bool) => TransactionMetadatum::new_text(format!("{}", bool))?,
                Number(n) => {
                    if n.is_i64() {
                        TransactionMetadatum::new_int(&Int::new_i32(
                            n.as_i64().ok_or_else(|| {
                                Error::Message("Failed to convert to i32".to_string())
                            })? as i32,
                        ))
                    } else if n.is_u64() {
                        TransactionMetadatum::new_int(&Int::new(&to_bignum(
                            n.as_u64().ok_or_else(|| {
                                Error::Message("Failed to convert to u64".to_string())
                            })?,
                        )))
                    } else {
                        TransactionMetadatum::new_text(
                            n.as_f64()
                                .ok_or_else(|| {
                                    Error::Message("Failed to convert to u64".to_string())
                                })?
                                .to_string(),
                        )?
                    }
                }
                String(s) => TransactionMetadatum::new_text(s.to_string())?,
                _ => continue,
            };

            nft_metadata_map.insert(&key, &value);
        }

        nft_metadata_map.insert(
            &TransactionMetadatum::new_text("name".to_string())?,
            &TransactionMetadatum::new_text(value.name.clone())?,
        );

        nft_metadata_map.insert(
            &TransactionMetadatum::new_text("description".to_string())?,
            &TransactionMetadatum::new_text(value.description.clone())?,
        );

        nft_metadata_map.insert(
            &TransactionMetadatum::new_text("image".to_string())?,
            &TransactionMetadatum::new_text(value.image.clone())?,
        );

        nft_metadata_map.insert(
            &TransactionMetadatum::new_text("Minted At".to_string())?,
            &TransactionMetadatum::new_text("© 2021 WottleNFT".to_string())?,
        );

        Ok(nft_metadata_map)
    }
}

pub struct NftPolicy {
    pub skey: PrivateKey,
    pub vkey: PublicKey,
    pub ttl: u32,
    pub script: NativeScript,
    pub hash: ScriptHash,
}

impl NftPolicy {
    pub fn new(slot: u32) -> Result<Self> {
        let skey = PrivateKey::generate_ed25519()?;
        let vkey = skey.to_public();
        let expiry_slot = slot + EXPIRY_IN_SECONDS;

        let pub_key_script = NativeScript::new_script_pubkey(&ScriptPubkey::new(&vkey.hash()));
        let time_expiry_script =
            NativeScript::new_timelock_expiry(&TimelockExpiry::new(expiry_slot));

        let mut native_scripts = NativeScripts::new();
        native_scripts.add(&time_expiry_script);
        native_scripts.add(&pub_key_script);

        let script = NativeScript::new_script_all(&ScriptAll::new(&native_scripts));
        let hash =
            ScriptHash::from_bytes(script.hash(ScriptHashNamespace::NativeScript).to_bytes())?;

        Ok(Self {
            skey,
            vkey,
            ttl: expiry_slot,
            script,
            hash,
        })
    }

    pub fn to_json(&self) -> serde_json::Value {
        serde_json::json!({
        "type": "all",
        "scripts": [
            {
                "type": "before",
                "slot": self.ttl,
            },
            {
                "type": "sig",
                "keyHash": hex::encode(self.vkey.hash().to_bytes())
            }
        ]
        })
    }
}

pub struct NftTransactionBuilder {
    policy: NftPolicy,
    asset_value: Value,
    asset_name: AssetName,
    metadata: GeneralTransactionMetadata,
    slot: u32,
    params: ProtocolParams,
}

impl NftTransactionBuilder {
    pub fn new(nft: WottleNftMetadata, slot: u32, params: ProtocolParams) -> Result<Self> {
        let policy = NftPolicy::new(slot)?;
        let (asset_value, asset_name) =
            Self::generate_asset_and_value(&policy, &nft, &params.minimum_utxo_value)?;
        let metadata = Self::build_metadata(&policy, &nft)?;

        Ok(Self {
            policy,
            asset_value,
            asset_name,
            metadata,
            params,
            slot,
        })
    }

    fn generate_asset_and_value(
        policy: &NftPolicy,
        nft: &WottleNftMetadata,
        min_utxo_value: &Coin,
    ) -> Result<(Value, AssetName)> {
        let mut value = Value::new(min_utxo_value);
        let mut assets = Assets::new();
        let asset_name = AssetName::new(nft.name.clone().into_bytes())?;
        assets.insert(&asset_name, &to_bignum(1));
        let mut multi_asset = MultiAsset::new();
        multi_asset.insert(&policy.hash, &assets);
        value.set_multiasset(&multi_asset);

        let min = min_ada_required(&value, min_utxo_value);
        value.set_coin(&min);

        Ok((value, asset_name))
    }

    fn build_metadata(
        policy: &NftPolicy,
        nft: &WottleNftMetadata,
    ) -> Result<GeneralTransactionMetadata> {
        let nft_metadata_map = MetadataMap::try_from(nft)?;

        let mut nft_asset = MetadataMap::new();
        nft_asset.insert(
            &TransactionMetadatum::new_text(nft.name.clone())?,
            &TransactionMetadatum::new_map(&nft_metadata_map),
        );

        let mut policy_metadata = MetadataMap::new();
        policy_metadata.insert(
            &TransactionMetadatum::new_text(hex::encode(policy.hash.to_bytes()))?,
            &TransactionMetadatum::new_map(&nft_asset),
        );

        Ok({
            let mut general_metadata = GeneralTransactionMetadata::new();
            general_metadata.insert(
                &to_bignum(NFT_STANDARD_LABEL),
                &TransactionMetadatum::new_map(&policy_metadata),
            );
            general_metadata
        })
    }

    pub fn create_transaction(
        &self,
        receiver: &Address,
        tax_address: &Address,
        utxos: Vec<TransactionUnspentOutput>,
    ) -> Result<Transaction> {
        let mut tx_outputs = vec![TransactionOutput::new(receiver, &self.asset_value)];

        let min_utxo_value = &self.params.minimum_utxo_value;
        let tax_amount = min_ada_required(&Value::new(min_utxo_value), min_utxo_value);
        tx_outputs.push(TransactionOutput::new(
            tax_address,
            &Value::new(&tax_amount),
        ));

        let native_scripts = &self.create_native_scripts();
        let witness_set_params: TransactionWitnessSetParams = TransactionWitnessSetParams {
            vkey_count: 2,
            native_scripts: Some(native_scripts),
            ..Default::default()
        };

        let tx_body = crate::coin::build_transaction_body(
            utxos,
            vec![],
            tx_outputs,
            self.slot + EXPIRY_IN_SECONDS,
            &self.params,
            None,
            Some(self.create_mint()),
            &witness_set_params,
            Some(self.create_auxiliary_data()),
        )?;

        let tx_hash = hash_transaction(&tx_body);
        let witnesses = self.get_witness_set(&tx_hash);
        let mut aux_data = AuxiliaryData::new();
        aux_data.set_metadata(&self.metadata);
        let transaction = Transaction::new(&tx_body, &witnesses, Some(aux_data));
        Ok(transaction)
    }

    pub fn policy_json(&self) -> serde_json::Value {
        self.policy.to_json()
    }

    pub fn policy_id(&self) -> String {
        hex::encode(self.policy.hash.to_bytes())
    }

    fn create_mint(&self) -> Mint {
        let mut mint = Mint::new();
        let mut mint_assets = MintAssets::new();
        mint_assets.insert(&self.asset_name, Int::new_i32(1));
        mint.insert(&self.policy.hash, &mint_assets);
        mint
    }

    fn create_auxiliary_data(&self) -> AuxiliaryData {
        let mut aux_data = AuxiliaryData::new();
        aux_data.set_metadata(&self.metadata);
        aux_data
    }

    fn create_native_scripts(&self) -> NativeScripts {
        let mut native_scripts = NativeScripts::new();
        native_scripts.add(&self.policy.script);
        native_scripts
    }

    fn get_witness_set(&self, tx_hash: &TransactionHash) -> TransactionWitnessSet {
        let mut witnesses = TransactionWitnessSet::new();
        witnesses.set_native_scripts(&self.create_native_scripts());
        witnesses.set_vkeys(&self.get_vkey_witnesses(tx_hash));
        witnesses
    }

    fn get_vkey_witnesses(&self, tx_hash: &TransactionHash) -> Vkeywitnesses {
        let mut vkey_witnesses = Vkeywitnesses::new();
        let vkey_witness = make_vkey_witness(tx_hash, &self.policy.skey);
        vkey_witnesses.add(&vkey_witness);
        vkey_witnesses
    }
}

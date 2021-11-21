use bigdecimal::ToPrimitive;
use cardano_serialization_lib::address::Address;
use cardano_serialization_lib::crypto::{DataHash, TransactionHash};
use cardano_serialization_lib::utils::{from_bignum, to_bignum, TransactionUnspentOutput, Value};
use cardano_serialization_lib::{
    AssetName, Assets, MultiAsset, PolicyID, TransactionInput, TransactionOutput,
};
use serde::ser::SerializeStruct;
use serde::{Serialize, Serializer};
use sqlx::types::BigDecimal;
use sqlx::PgPool;
use std::collections::HashMap;
use tokio_stream::StreamExt;

#[derive(Debug, sqlx::FromRow)]
pub struct PgTxOut {
    hash: Vec<u8>,
    index: i16,
    value: BigDecimal,
    data_hash: Option<Vec<u8>>,
    policy: Option<Vec<u8>>,
    name: Option<Vec<u8>>,
    quantity: Option<BigDecimal>,
}

pub async fn query_user_address_utxo(
    pool: &PgPool,
    addr: &Address,
) -> crate::Result<Vec<TransactionUnspentOutput>> {
    let mut rows = sqlx::query_as::<_, PgTxOut>(
        r#"
    SELECT
        tx.hash,
        tx_out.index,
        tx_out.value,
        tx_out.data_hash,
        ma_tx_out.policy,
        ma_tx_out.name,
        ma_tx_out.quantity
    FROM tx_out
    JOIN tx ON tx_out.tx_id = tx.id
    LEFT JOIN ma_tx_out ON tx_out.id = ma_tx_out.tx_out_id
    LEFT JOIN tx_in ON tx_out.tx_id = tx_in.tx_out_id AND tx_out.index = tx_in.tx_out_index
	WHERE address = $1
	AND tx_in.id IS NULL
    "#,
    )
    .bind(addr.to_bech32(None)?)
    .fetch(pool);

    let mut pgs = vec![];
    while let Some(pg_tx_out) = rows.try_next().await? {
        pgs.push(pg_tx_out);
    }

    pgtxout_to_utxo(pgs, addr)
}

fn pgtxout_to_utxo(
    pgs: Vec<PgTxOut>,
    addr: &Address,
) -> crate::Result<Vec<TransactionUnspentOutput>> {
    let mut multiassets_map = HashMap::new();

    for pg in &pgs {
        let multiasset = multiassets_map
            .entry((&pg.hash, &pg.index, &pg.value, &pg.data_hash))
            .or_insert_with(|| MultiAsset::new());

        if let (Some(policy), Some(name), Some(bd_quantity)) = (&pg.policy, &pg.name, &pg.quantity)
        {
            if let Some(number) = bd_quantity.to_u64() {
                let policy_id = PolicyID::from_bytes(policy.clone())?;
                let mut assets = multiasset.get(&policy_id).unwrap_or_else(|| Assets::new());

                let asset_name = AssetName::new(name.clone())?;
                if assets.get(&asset_name).is_none() {
                    assets.insert(&asset_name, &to_bignum(number));
                }
                multiasset.insert(&policy_id, &assets);
            }
        }
    }

    let mut utxos = Vec::with_capacity(multiassets_map.len());

    for ((hash, index, lovelace, data_hash), multiasset) in multiassets_map {
        let tx_hash = TransactionHash::from_bytes(hash.clone())?;
        let tx_input = TransactionInput::new(&tx_hash, *index as u32);
        let mut value = Value::new(&to_bignum(lovelace.to_u64().unwrap_or(0)));

        if multiasset.len() > 0 {
            value.set_multiasset(&multiasset);
        }

        let mut tx_output = TransactionOutput::new(addr, &value);
        if let Some(data_hash) = data_hash {
            let data_hash = DataHash::from_bytes(data_hash.clone())?;
            tx_output.set_data_hash(&data_hash);
        }

        utxos.push(TransactionUnspentOutput::new(&tx_input, &tx_output));
    }

    Ok(utxos)
}

#[derive(Serialize)]
struct AssetJson {
    policy_id: String,
    asset_name: String,
    qty: u64,
}

pub struct UtxoJson<'a>(pub &'a TransactionUnspentOutput);

impl<'a> From<&'a TransactionUnspentOutput> for UtxoJson<'a> {
    fn from(t: &'a TransactionUnspentOutput) -> Self {
        Self(t)
    }
}

impl<'a> Serialize for UtxoJson<'a> {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let utxo = self.0;
        let tx_input = utxo.input();
        let mut serialize_struct = serializer.serialize_struct("Utxo", 4)?;
        serialize_struct.serialize_field(
            "tx_hash",
            &hex::encode(tx_input.transaction_id().to_bytes()),
        )?;
        serialize_struct.serialize_field("tx_idx", &tx_input.index())?;

        let tx_output = utxo.output();
        serialize_struct.serialize_field("lovelace", &from_bignum(&tx_output.amount().coin()))?;

        let mut asset_jsons = vec![];

        if let Some(asset) = tx_output.amount().multiasset() {
            let policies = asset.keys();
            let n_policies = policies.len();
            for i in 0..n_policies {
                let policy_id = policies.get(i);
                if let Some(assets) = asset.get(&policy_id) {
                    let asset_names = assets.keys();
                    let n_assets = asset_names.len();
                    for j in 0..n_assets {
                        let asset_name = asset_names.get(j);
                        let optional_qty = assets.get(&asset_name);
                        if let Some(qty) = optional_qty {
                            asset_jsons.push(AssetJson {
                                qty: from_bignum(&qty),
                                policy_id: hex::encode(policy_id.to_bytes()),
                                asset_name: String::from_utf8(asset_name.name())
                                    .unwrap_or_else(|_| hex::encode(asset_name.to_bytes())),
                            });
                        }
                    }
                }
            }
        };
        serialize_struct.serialize_field("assets", &asset_jsons)?;
        serialize_struct.end()
    }
}

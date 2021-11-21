use bigdecimal::ToPrimitive;
use cardano_serialization_lib::address::Address;
use cardano_serialization_lib::crypto::TransactionHash;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use sqlx::postgres::PgRow;
use sqlx::types::BigDecimal;
use sqlx::{PgPool, Row};
use tokio_stream::StreamExt;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NftMetadata {
    policy_id: String,
    asset_name: String,
    quantity: u64,
    metadata: serde_json::Value,
}

#[derive(sqlx::FromRow)]
struct PgNftMetadata {
    policy: Vec<u8>,
    name: Vec<u8>,
    quantity: BigDecimal,
    json: serde_json::Value,
}

pub async fn query_user_address_nfts(
    pool: &PgPool,
    addr: &Address,
) -> crate::Result<Vec<NftMetadata>> {
    let mut rows = sqlx::query_as::<_, PgNftMetadata>(
        r#"
	SELECT
        ma_tx_mint.policy,
		ma_tx_mint.name,
		ma_tx_mint.quantity,
		tx_metadata.json
    FROM (
		SELECT tx_out.id
		FROM tx_out
		LEFT JOIN tx_in ON tx_out.tx_id = tx_in.tx_out_id AND tx_out.index = tx_in.tx_out_index
		WHERE tx_out.address = $1
		AND tx_in.id IS NULL
	) AS utxos
	INNER JOIN ma_tx_out ON utxos.id = ma_tx_out.tx_out_id
	INNER JOIN ma_tx_mint
		ON ma_tx_out.policy = ma_tx_mint.policy
		AND ma_tx_out.name = ma_tx_mint.name
		AND ma_tx_out.quantity = ma_tx_mint.quantity
	INNER JOIN tx_metadata
	ON ma_tx_mint.tx_id = tx_metadata.tx_id
	AND tx_metadata.key = 721
	ORDER BY ma_tx_mint.tx_id DESC
    "#,
    )
    .bind(addr.to_bech32(None)?)
    .fetch(pool);

    let mut nfts = vec![];

    while let Some(pg_nft_metadata) = rows.try_next::<PgNftMetadata, _>().await? {
        let mut pg_nft_metadata: PgNftMetadata = pg_nft_metadata;
        let policy_id = hex::encode(pg_nft_metadata.policy);
        let asset_name = String::from_utf8(pg_nft_metadata.name)
            .map_err(|e| crate::Error::Message(e.to_string()));
        let quantity = pg_nft_metadata.quantity.to_u64();

        if let (Ok(asset_name), Some(quantity)) = (asset_name, quantity) {
            if let Some(metadata) = pg_nft_metadata
                .json
                .get_mut(&policy_id)
                .and_then(|json| json.get_mut(&asset_name))
            {
                nfts.push(NftMetadata {
                    policy_id,
                    asset_name,
                    quantity,
                    metadata: metadata.take(),
                });
            }
        }
    }
    Ok(nfts)
}

pub async fn query_if_nft_minted(pool: &PgPool, tx_hash: &TransactionHash) -> crate::Result<bool> {
    let res = sqlx::query(
        r#"
        SELECT 1 
        FROM tx
        WHERE hash = $1
        "#,
    )
    .bind(tx_hash.to_bytes())
    .execute(pool)
    .await?;
    Ok(res.rows_affected() > 0)
}

pub async fn query_single_nft(
    pool: &PgPool,
    policy_id: &str,
    asset_name: &str,
) -> crate::Result<Option<Value>> {
    let res: Option<Value> = sqlx::query(
        r#"
        SELECT tx_metadata.json
        FROM ma_tx_mint
        INNER JOIN tx_metadata
        ON ma_tx_mint.tx_id = tx_metadata.tx_id
        WHERE encode(ma_tx_mint.policy, 'hex') = $1
        AND convert_from(ma_tx_mint.name, 'utf-8') = $2
        AND tx_metadata.key = 721
        ORDER BY ma_tx_mint.tx_id DESC
        LIMIT 1
        "#,
    )
    .bind(policy_id)
    .bind(asset_name)
    .map(|row: PgRow| row.get("json"))
    .fetch_optional(pool)
    .await?;

    Ok(res)
}

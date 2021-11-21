use bigdecimal::ToPrimitive;
use cardano_serialization_lib::fees::LinearFee;
use cardano_serialization_lib::utils::{to_bignum, Coin};
use sqlx::types::BigDecimal;
use sqlx::PgPool;

const MIN_UTXO_VALUE: u64 = 1000000;
const MAX_VAL_SIZE: u32 = 5000;
const POOL_DEPOSIT: u64 = 500000000;
const KEY_DEPOSIT: u64 = 2000000;
const COINS_PER_UTXO_WORD: u64 = 34482;

// There is a version in cardano_serialization_lib but always returns Option when trying to retrieve.
#[derive(Debug)]
pub struct ProtocolParams {
    pub linear_fee: LinearFee,
    pub minimum_utxo_value: Coin,
    pub pool_deposit: Coin,
    pub key_deposit: Coin,
    pub max_tx_size: u32,
    pub max_value_size: u32,
    pub coins_per_utxo_word: Coin,
}

#[derive(sqlx::FromRow, Debug)]
struct PgProtocolParams {
    min_fee_a: i32,
    min_fee_b: i32,
    max_tx_size: i32,
    key_deposit: BigDecimal,
    pool_deposit: BigDecimal,
    min_utxo_value: BigDecimal,
    max_val_size: Option<BigDecimal>,
    coins_per_utxo_word: Option<BigDecimal>,
}

pub async fn get_protocol_params(pool: &PgPool) -> Result<ProtocolParams, sqlx::Error> {
    let rec: PgProtocolParams = sqlx::query_as::<_, PgProtocolParams>(
        r#"
    SELECT min_fee_a, min_fee_b, max_tx_size, key_deposit,
            pool_deposit, max_val_size, coins_per_utxo_word, min_utxo_value
    FROM epoch_param 
    ORDER BY epoch_no DESC LIMIT 1
    "#,
    )
    .fetch_one(pool)
    .await?;
    let min_utxo_value = match rec.min_utxo_value.to_u64() {
        Some(0) => MIN_UTXO_VALUE,
        Some(v) => v,
        _ => MIN_UTXO_VALUE,
    };

    let coins_per_utxo_word = match rec.coins_per_utxo_word.and_then(|bd| bd.to_u64()) {
        Some(0) => COINS_PER_UTXO_WORD,
        Some(v) => v,
        _ => COINS_PER_UTXO_WORD,
    };

    Ok(ProtocolParams {
        linear_fee: LinearFee::new(
            &to_bignum(rec.min_fee_a as u64),
            &to_bignum(rec.min_fee_b as u64),
        ),
        minimum_utxo_value: to_bignum(min_utxo_value),
        pool_deposit: to_bignum(rec.pool_deposit.to_u64().unwrap_or(POOL_DEPOSIT)),
        key_deposit: to_bignum(rec.key_deposit.to_u64().unwrap_or(KEY_DEPOSIT)),
        max_tx_size: rec.max_tx_size as u32,
        max_value_size: rec
            .max_val_size
            .and_then(|bd| bd.to_u32())
            .unwrap_or(MAX_VAL_SIZE),
        coins_per_utxo_word: to_bignum(coins_per_utxo_word),
    })
}

#[derive(sqlx::FromRow)]
struct Slot {
    slot_no: i32,
}

pub async fn get_slot_number(pool: &PgPool) -> Result<u32, sqlx::Error> {
    let rec = sqlx::query_as::<_, Slot>(
        r#"
        SELECT MAX(slot_no) AS slot_no FROM block
        "#,
    )
    .fetch_one(pool)
    .await?;

    Ok(rec.slot_no as u32)
}

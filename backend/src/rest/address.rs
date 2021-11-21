use crate::Result;
use actix_web::{get, web, HttpResponse, Scope};
use cardano_serialization_lib::utils::{from_bignum, BigNum};
use serde_json::json;

use crate::cardano_db_sync::{query_user_address_nfts, query_user_address_utxo, UtxoJson};
use crate::rest::AppState;

#[get("/{address}/utxo")]
async fn get_all_utxos(path: web::Path<String>, data: web::Data<AppState>) -> Result<HttpResponse> {
    let address = super::parse_address(&path.into_inner())?;
    let utxos = query_user_address_utxo(&data.pool, &address).await?;

    let jsons: Vec<UtxoJson> = utxos.iter().map(UtxoJson::from).collect();

    Ok(HttpResponse::Ok().json(jsons))
}

#[get("/{address}/balance")]
async fn get_address_balance(
    path: web::Path<String>,
    data: web::Data<AppState>,
) -> Result<HttpResponse> {
    let address = super::parse_address(&path.into_inner())?;
    let utxos = query_user_address_utxo(&data.pool, &address).await?;

    let mut balance = BigNum::zero();
    for utxo in utxos {
        balance = balance.checked_add(&utxo.output().amount().coin())?;
    }
    Ok(HttpResponse::Ok().json(json!({ "total_value": from_bignum(&balance) })))
}

#[get("/{address}/nft")]
async fn get_address_nfts(
    path: web::Path<String>,
    data: web::Data<AppState>,
) -> Result<HttpResponse> {
    let address = super::parse_address(&path.into_inner())?;
    let nfts = query_user_address_nfts(&data.pool, &address).await?;
    Ok(HttpResponse::Ok().json(nfts))
}

pub fn create_address_service() -> Scope {
    web::scope("/address")
        .service(get_all_utxos)
        .service(get_address_balance)
        .service(get_address_nfts)
}

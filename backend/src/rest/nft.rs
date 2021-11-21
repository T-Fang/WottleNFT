use crate::{
    cardano_db_sync::{get_protocol_params, get_slot_number, query_user_address_utxo},
    nft::{NftTransactionBuilder, WottleNftMetadata},
    Result,
};
use actix_web::{get, post, web, HttpResponse, Scope};
use serde::Deserialize;
use serde_json::json;

use crate::cardano_db_sync::{query_if_nft_minted, query_single_nft};
use crate::rest::AppState;
use cardano_serialization_lib::crypto::TransactionHash;

#[derive(Deserialize)]
struct TransactionHashQuery {
    hash: String,
}

#[get("/exists")]
async fn check_nft_exists(
    query: web::Query<TransactionHashQuery>,
    data: web::Data<AppState>,
) -> Result<HttpResponse> {
    let tx_hash = TransactionHash::from_bytes(hex::decode(query.hash.clone())?)?;
    let exists = query_if_nft_minted(&data.pool, &tx_hash).await?;
    Ok(HttpResponse::Ok().json(json!({ "result": exists })))
}

#[derive(Deserialize)]
struct CreateNft {
    address: String,
    #[serde(flatten)]
    nft: WottleNftMetadata,
}

#[post("/create")]
async fn create_nft_transaction(
    create_nft: web::Json<CreateNft>,
    data: web::Data<AppState>,
) -> Result<HttpResponse> {
    let create_nft = create_nft.into_inner();
    let address = super::parse_address(&create_nft.address)?;
    let utxos = query_user_address_utxo(&data.pool, &address).await?;
    let slot = get_slot_number(&data.pool).await?;
    let params = get_protocol_params(&data.pool).await?;

    let nft_tx_builder = NftTransactionBuilder::new(create_nft.nft, slot, params)?;

    let tx = nft_tx_builder.create_transaction(&address, &data.tax_address, utxos)?;

    Ok(HttpResponse::Ok().json(json!({
        "transaction": hex::encode(tx.to_bytes()),
        "policy": {
            "id": nft_tx_builder.policy_id(),
            "json": nft_tx_builder.policy_json()
        }
    })))
}

#[derive(Deserialize)]
struct NftDetails {
    policy_id: String,
    asset_name: String,
}

#[get("/single/{policy_id}/{asset_name}")]
async fn get_single_nft(
    details: web::Path<NftDetails>,
    data: web::Data<AppState>,
) -> Result<HttpResponse> {
    let details = details.into_inner();
    let json = query_single_nft(&data.pool, &details.policy_id, &details.asset_name).await?;
    Ok(HttpResponse::Ok().json(json))
}

pub fn create_nft_service() -> Scope {
    web::scope("/nft")
        .service(create_nft_transaction)
        .service(check_nft_exists)
        .service(get_single_nft)
}

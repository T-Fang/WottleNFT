mod address;
mod marketplace;
mod nft;

use crate::coin::combine_witness_set;
use crate::marketplace::Marketplace;
use crate::{config::Config, transaction::Submitter, Error, Result};
use actix_cors::Cors;
use actix_web::{post, web, web::Data, App, HttpResponse, HttpServer};
use cardano_serialization_lib::address::Address;
use cardano_serialization_lib::{Transaction, TransactionWitnessSet};
use serde::Deserialize;
use serde_json::json;
use sqlx::postgres::PgPool;

struct AppState {
    pool: PgPool,
    submitter: Submitter,
    tax_address: Address,
    marketplace: Marketplace,
}

pub fn parse_address(address: &str) -> Result<Address> {
    match Address::from_bech32(address) {
        Ok(addr) => Ok(addr),
        Err(_) => {
            match hex::decode(address)
                .map_err(|_| ())
                .and_then(|hex_decoded| Address::from_bytes(hex_decoded).map_err(|_| ()))
            {
                Ok(addr) => Ok(addr),
                Err(_) => Err(Error::Message("Invalid address provided".to_string())),
            }
        }
    }
}

pub fn respond_with_transaction(tx: &Transaction) -> HttpResponse {
    HttpResponse::Ok().json(json!({
        "transaction": hex::encode(tx.to_bytes())
    }))
}

#[derive(Deserialize)]
struct Signature {
    signature: String,
    transaction: String,
}
#[post("/sign")]
async fn sign_transaction(
    signature: web::Json<Signature>,
    data: web::Data<AppState>,
) -> Result<HttpResponse> {
    let Signature {
        signature,
        transaction,
    } = signature.into_inner();

    let transaction = Transaction::from_bytes(hex::decode(transaction)?)?;
    let tx_witness_set = TransactionWitnessSet::from_bytes(hex::decode(signature)?)?;

    let tx = combine_witness_set(transaction, tx_witness_set)?;

    let tx_id = data.submitter.submit_tx(&tx).await?;
    Ok(HttpResponse::Ok().json(json!({ "tx_id": tx_id })))
}

pub async fn start_server(config: Config) -> Result<()> {
    let tax_address = Address::from_bech32(&config.nft_bech32_tax_address)?;
    let db_pool = PgPool::connect(&config.database_url).await?;
    let address = format!("0.0.0.0:{}", config.port);
    let marketplace = Marketplace::from_config(&config)?;
    println!("Starting server on {}", &address);
    Ok(HttpServer::new(move || {
        App::new()
            .wrap(
                Cors::default()
                    .allow_any_origin()
                    .allow_any_method()
                    .allow_any_header(),
            )
            .app_data(Data::new(AppState {
                pool: db_pool.clone(),
                submitter: Submitter::for_url(&config.submit_api_base_url),
                tax_address: tax_address.clone(),
                marketplace: marketplace.clone(),
            }))
            .service(address::create_address_service())
            .service(nft::create_nft_service())
            .service(marketplace::create_marketplace_service())
            .service(sign_transaction)
    })
    .bind(address)?
    .run()
    .await?)
}

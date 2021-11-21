#[macro_use]
extern crate lazy_static;

mod cardano_db_sync;
mod coin;
mod config;
mod error;
mod marketplace;
mod nft;
mod rest;
mod transaction;

use std::fs::File;

use cardano_serialization_lib::crypto::*;
use envconfig::Envconfig;
use error::Result;

use crate::error::Error;

#[actix_web::main]
async fn main() -> Result<()> {
    dotenv::dotenv().ok();
    let config = config::Config::init_from_env().unwrap();
    rest::start_server(config).await?;
    Ok(())
}

#[derive(serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
struct TextEnvelope {
    r#type: String,
    description: String,
    cbor_hex: String,
}

fn read_key(path: &str) -> Result<TextEnvelope> {
    let file = File::open(path)?;
    Ok(serde_json::from_reader(file)?)
}

fn decode_public_key(key_path: &str) -> Result<PublicKey> {
    let text_envelope = read_key(key_path)?;
    let hex_decode = hex::decode(text_envelope.cbor_hex.as_bytes())?;
    use cbor_event::de::*;
    use std::io::Cursor;
    let mut raw = Deserializer::from(Cursor::new(hex_decode));
    let bytes = raw.bytes()?;

    Ok(PublicKey::from_bytes(&bytes)?)
}

fn decode_private_key(key_path: &str) -> Result<PrivateKey> {
    let text_envelope = read_key(key_path)?;
    let hex_decode = hex::decode(text_envelope.cbor_hex.as_bytes())?;
    use cbor_event::de::*;
    use std::io::Cursor;
    let mut raw = Deserializer::from(Cursor::new(hex_decode));
    let bytes = raw.bytes()?;

    Ok(PrivateKey::from_normal_bytes(&bytes)?)
}

use cardano_serialization_lib::error::{DeserializeError, JsError};
use hex::FromHexError;

use crate::coin::CoinSelectionFailure;

use actix_web::http::header;
use actix_web::{HttpResponse, HttpResponseBuilder};
use serde_json::json;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("{}", .0)]
    Js(JsError),

    #[error("{}", .0)]
    Deserialize(DeserializeError),

    #[error("Failed to decode from hex: {}", .0)]
    HexDecode(#[from] FromHexError),

    #[error("{}", .0)]
    CborDeserialize(#[from] cbor_event::Error),

    #[error("IO Error: {}", .0)]
    Io(#[from] std::io::Error),

    #[error("{}", .0)]
    Message(String),

    #[error("{}", .0)]
    JsonDecode(#[from] serde_json::Error),

    #[error("Network Request Failed: {}", .0)]
    NetworkRequest(#[from] reqwest::Error),

    #[error("{}", .0)]
    Coin(#[from] CoinSelectionFailure),

    #[error("sqlx: {}", .0)]
    Sqlx(#[from] sqlx::Error),

    #[error("Unknown error occured")]
    Unknown,
}

impl From<JsError> for Error {
    fn from(e: JsError) -> Self {
        Self::Js(e)
    }
}

impl From<DeserializeError> for Error {
    fn from(e: DeserializeError) -> Self {
        Self::Deserialize(e)
    }
}

impl actix_web::error::ResponseError for Error {
    fn error_response(&self) -> HttpResponse {
        let response_body = json!({
            "error": self.to_string()
        })
        .to_string();
        HttpResponseBuilder::new(self.status_code())
            .insert_header((header::CONTENT_TYPE, "application/json"))
            .body(response_body)
    }
}

pub type Result<T> = std::result::Result<T, Error>;

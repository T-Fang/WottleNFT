use crate::Result;
use cardano_serialization_lib::{crypto::TransactionHash, Transaction};
use reqwest::{
    header::{HeaderMap, HeaderValue},
    Client, Url,
};

use crate::error::Error;

#[derive(Clone)]
pub struct Submitter {
    submit_url: Url,
    client: Client,
}

impl Submitter {
    pub fn for_url(base_url: &str) -> Self {
        // If a wrong URL was passed in we want it to panic and stop
        let submit_url = Url::parse(base_url)
            .and_then(|url| url.join("/api/submit/tx"))
            .unwrap();

        let mut headers = HeaderMap::new();
        headers.insert("Content-Type", HeaderValue::from_static("application/cbor"));

        let client = reqwest::Client::builder()
            .default_headers(headers)
            .build()
            .unwrap();

        Self { submit_url, client }
    }

    pub async fn submit_tx(&self, tx: &Transaction) -> Result<String> {
        let res = self
            .client
            .post(self.submit_url.as_ref())
            .body(tx.to_bytes())
            .send()
            .await?;

        let text = res.error_for_status()?.text().await?.replace("\"", "");

        TransactionHash::from_bytes(hex::decode(text.as_bytes())?).map_err(|_| {
            Error::Message("Unsuccessful transaction. Please try again".to_string())
        })?;

        Ok(text)
    }
}

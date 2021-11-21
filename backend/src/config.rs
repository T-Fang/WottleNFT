use envconfig::Envconfig;

#[derive(Envconfig, Debug, Clone)]
pub struct Config {
    #[envconfig(from = "IS_TESTNET")]
    pub is_testnet: bool,

    #[envconfig(from = "SUBMIT_API_BASE_URL")]
    pub submit_api_base_url: String,

    #[envconfig(from = "PORT")]
    pub port: u32,

    #[envconfig(from = "NFT_BECH32_TAXATION_ADDRESS")]
    pub nft_bech32_tax_address: String,

    #[envconfig(from = "DATABASE_URL")]
    pub database_url: String,

    #[envconfig(from = "MARKETPLACE_PRIVATE_KEY_FILE")]
    pub marketplace_private_key_file: String,

    #[envconfig(from = "MARKETPLACE_REVENUE_ADDRESS")]
    pub marketplace_revenue_address: String,

    #[envconfig(from = "CLIMATE_ACTION_ADDRESS")]
    pub climate_action_address: String,

    #[envconfig(from = "ZERO_HUNGER_ADDRESS")]
    pub zero_hunger_address: String,

    #[envconfig(from = "QUALITY_EDUCATION_ADDRESS")]
    pub quality_education_address: String,
}

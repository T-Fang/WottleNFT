use crate::{config::Config, Result};
use cardano_serialization_lib::address::{Address, BaseAddress, NetworkInfo};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub enum UnGoal {
    ClimateAction,
    ZeroHunger,
    QualityEducation,
}

#[derive(Clone)]
pub struct MarketplaceAddresses {
    revenue: Address,
    climate_action: Address,
    zero_hunger: Address,
    quality_education: Address,
}

impl MarketplaceAddresses {
    pub fn from_config(config: &Config) -> Result<Self> {
        let mut revenue = Address::from_bech32(&config.marketplace_revenue_address)?;
        let mut climate_action = Address::from_bech32(&config.climate_action_address)?;
        let mut zero_hunger = Address::from_bech32(&config.zero_hunger_address)?;
        let mut quality_education = Address::from_bech32(&config.quality_education_address)?;

        if config.is_testnet {
            revenue = Self::convert_to_testnet(revenue);
            climate_action = Self::convert_to_testnet(climate_action);
            zero_hunger = Self::convert_to_testnet(zero_hunger);
            quality_education = Self::convert_to_testnet(quality_education);
        }

        Ok(Self {
            revenue,
            climate_action,
            zero_hunger,
            quality_education,
        })
    }

    pub fn get_revenue_address(&self) -> &Address {
        &self.revenue
    }

    pub fn get_un_address(&self, goal: UnGoal) -> &Address {
        use UnGoal::*;
        match goal {
            ClimateAction => &self.climate_action,
            ZeroHunger => &self.zero_hunger,
            QualityEducation => &self.quality_education,
        }
    }

    fn convert_to_testnet(address: Address) -> Address {
        let base_addr = BaseAddress::from_address(&address).unwrap();
        return BaseAddress::new(
            NetworkInfo::testnet().network_id(),
            &base_addr.payment_cred(),
            &base_addr.stake_cred(),
        )
        .to_address();
    }
}

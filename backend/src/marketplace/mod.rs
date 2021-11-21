use crate::coin::TransactionWitnessSetParams;
use crate::config::Config;
use crate::marketplace::holder::{MarketplaceHolder, SellData, SellMetadata};
use crate::marketplace::un_goals::{MarketplaceAddresses, UnGoal};
use crate::{
    cardano_db_sync::{get_protocol_params, get_slot_number, query_user_address_utxo},
    coin::build_transaction_body,
    Error, Result,
};
use cardano_serialization_lib::address::Address;
use cardano_serialization_lib::crypto::Vkeywitnesses;
use cardano_serialization_lib::utils::{
    hash_transaction, to_bignum, TransactionUnspentOutput, Value,
};
use cardano_serialization_lib::{
    AssetName, Assets, MultiAsset, PolicyID, Transaction, TransactionOutput, TransactionWitnessSet,
};
use sqlx::PgPool;

pub mod holder;
pub mod un_goals;

const ONE_HOUR: u32 = 3600;

#[derive(Clone)]
pub struct Marketplace {
    pub(crate) holder: MarketplaceHolder,
    pub(crate) addresses: MarketplaceAddresses,
}

impl Marketplace {
    pub fn from_config(config: &Config) -> Result<Marketplace> {
        let holder = MarketplaceHolder::from_config(config)?;
        let addresses = MarketplaceAddresses::from_config(config)?;
        Ok(Self { holder, addresses })
    }

    pub async fn sell(
        &self,
        seller_address: Address,
        policy_id: PolicyID,
        asset_name: AssetName,
        un_goal: UnGoal,
        price: u64,
        pool: &PgPool,
    ) -> Result<Transaction> {
        let seller_utxos = query_user_address_utxo(pool, &seller_address).await?;
        let (nft_utxo, seller_utxos) = find_nft(seller_utxos, &policy_id, &asset_name)?;

        let slot = get_slot_number(pool).await?;
        let protocol_params = get_protocol_params(pool).await?;
        let tx_witness_params = TransactionWitnessSetParams {
            vkey_count: 1,
            ..Default::default()
        };
        let mut nft_value = create_value_with_single_nft(&policy_id, &asset_name);
        nft_value.set_coin(&to_bignum(2_000_000));
        let mut outputs = vec![TransactionOutput::new(&self.holder.address, &nft_value)];
        if nft_utxo.output().amount().multiasset().unwrap().len() > 1 {
            // More assets attached to the NFT UTxO, need to create an output to return these assets
            let mut value = nft_utxo.output().amount();
            let ma = value
                .multiasset()
                .unwrap()
                .sub(&nft_value.multiasset().unwrap());
            value.set_multiasset(&ma);
            outputs.push(TransactionOutput::new(&seller_address, &value));
        }
        let seller_metadata = SellMetadata {
            seller_address: seller_address.clone(),
            price,
            un_goal,
        };
        let auxiliary_data = Some(seller_metadata.create_sell_nft_metadata()?);
        let tx_body = build_transaction_body(
            seller_utxos,
            vec![nft_utxo.clone()],
            outputs,
            slot + ONE_HOUR,
            &protocol_params,
            None,
            None,
            &tx_witness_params,
            auxiliary_data.clone(),
        )?;

        Ok(Transaction::new(
            &tx_body,
            &TransactionWitnessSet::new(),
            auxiliary_data,
        ))
    }

    pub async fn buy(
        &self,
        buyer_address: Address,
        policy_id: PolicyID,
        asset_name: AssetName,
        pool: &PgPool,
    ) -> Result<Transaction> {
        let buyer_utxos = query_user_address_utxo(pool, &buyer_address).await?;
        let sell_details = self.get_sell_details(pool, &policy_id, &asset_name).await?;

        let holder_utxos = query_user_address_utxo(pool, &self.holder.address).await?;
        let (nft_utxo, _) = find_nft(holder_utxos, &policy_id, &asset_name)?;

        let (revenue_cut, goal_cut, seller_cut) = calculate_cuts(sell_details.metadata.price);

        let revenue_output = TransactionOutput::new(
            self.addresses.get_revenue_address(),
            &Value::new(&to_bignum(revenue_cut)),
        );

        let goal_output = TransactionOutput::new(
            self.addresses.get_un_address(sell_details.metadata.un_goal),
            &Value::new(&to_bignum(goal_cut)),
        );

        let seller_output = TransactionOutput::new(
            &sell_details.metadata.seller_address,
            &Value::new(&to_bignum(seller_cut)),
        );

        let nft_output = TransactionOutput::new(&buyer_address, &nft_utxo.output().amount());

        let outputs = vec![revenue_output, goal_output, seller_output, nft_output];
        let inputs = vec![nft_utxo];

        let tx_witness_params = TransactionWitnessSetParams {
            vkey_count: 2,
            ..Default::default()
        };
        let slot = get_slot_number(pool).await?;
        let protocol_params = get_protocol_params(pool).await?;

        let tx_body = build_transaction_body(
            buyer_utxos,
            inputs,
            outputs,
            slot + ONE_HOUR,
            &protocol_params,
            None,
            None,
            &tx_witness_params,
            None,
        )?;

        let tx_hash = hash_transaction(&tx_body);
        let vkey = self.holder.sign_transaction_hash(&tx_hash);
        let mut tx_witness_set = TransactionWitnessSet::new();
        let mut vkeys = Vkeywitnesses::new();
        vkeys.add(&vkey);
        tx_witness_set.set_vkeys(&vkeys);

        let tx = Transaction::new(&tx_body, &tx_witness_set, None);
        Ok(tx)
    }

    pub async fn cancel(
        &self,
        seller_address: Address,
        policy_id: PolicyID,
        asset_name: AssetName,
        pool: &PgPool,
    ) -> Result<Transaction> {
        let sell_details = self.get_sell_details(pool, &policy_id, &asset_name).await?;
        if sell_details
            .metadata
            .seller_address
            .to_bytes()
            .ne(&seller_address.to_bytes())
        {
            return Err(Error::Message(
                "Only the seller can cancel the listing".to_string(),
            ));
        }

        let seller_utxos = query_user_address_utxo(pool, &seller_address).await?;
        let holder_utxos = query_user_address_utxo(pool, &self.holder.address).await?;
        let (nft_utxo, _) = find_nft(holder_utxos, &policy_id, &asset_name)?;

        let nft_output = TransactionOutput::new(
            &sell_details.metadata.seller_address,
            &nft_utxo.output().amount(),
        );

        let cancellation_output = TransactionOutput::new(
            self.addresses.get_revenue_address(),
            &Value::new(&to_bignum(ONE_ADA)),
        );

        let outputs = vec![nft_output, cancellation_output];
        let inputs = vec![nft_utxo];

        let tx_witness_params = TransactionWitnessSetParams {
            vkey_count: 2,
            ..Default::default()
        };
        let slot = get_slot_number(pool).await?;
        let protocol_params = get_protocol_params(pool).await?;

        let tx_body = build_transaction_body(
            seller_utxos,
            inputs,
            outputs,
            slot + ONE_HOUR,
            &protocol_params,
            None,
            None,
            &tx_witness_params,
            None,
        )?;

        let tx_hash = hash_transaction(&tx_body);
        let vkey = self.holder.sign_transaction_hash(&tx_hash);
        let mut tx_witness_set = TransactionWitnessSet::new();
        let mut vkeys = Vkeywitnesses::new();
        vkeys.add(&vkey);
        tx_witness_set.set_vkeys(&vkeys);

        let tx = Transaction::new(&tx_body, &tx_witness_set, None);
        Ok(tx)
    }

    async fn get_sell_details(
        &self,
        pool: &PgPool,
        policy_id: &PolicyID,
        asset_name: &AssetName,
    ) -> Result<SellData> {
        self.holder
            .get_nft_details(pool, &policy_id, &asset_name)
            .await?
            .ok_or_else(|| Error::Message("No such NFT is for sale".to_string()))
    }
}

const ONE_ADA: u64 = 1_000_000;
fn calculate_cuts(price: u64) -> (u64, u64, u64) {
    let one_percent = price / 100;
    let revenue_cut = (one_percent * 2).max(ONE_ADA);
    let goal_cut = one_percent.max(ONE_ADA);
    // The seller put in 2 ADA as deposit
    let seller_cut = price - revenue_cut - goal_cut + (ONE_ADA * 2);
    (revenue_cut, goal_cut, seller_cut)
}

fn create_value_with_single_nft(policy_id: &PolicyID, asset_name: &AssetName) -> Value {
    let mut value = Value::new(&to_bignum(0));
    value.set_multiasset(&{
        let mut ma = MultiAsset::new();
        ma.insert(policy_id, &{
            let mut assets = Assets::new();
            assets.insert(asset_name, &to_bignum(1));
            assets
        });
        ma
    });
    value
}

pub fn find_nft(
    utxos: Vec<TransactionUnspentOutput>,
    policy_id: &PolicyID,
    asset_name: &AssetName,
) -> Result<(TransactionUnspentOutput, Vec<TransactionUnspentOutput>)> {
    let mut remaining_utxos = Vec::with_capacity(utxos.len());
    let mut nft_utxo = None;

    for utxo in utxos {
        if utxo
            .output()
            .amount()
            .multiasset()
            .and_then(|ma| ma.get(policy_id))
            .and_then(|assets| assets.get(asset_name))
            .is_some()
        {
            nft_utxo = Some(utxo);
        } else {
            remaining_utxos.push(utxo);
        }
    }

    nft_utxo
        .ok_or_else(|| Error::Message("No such NFT is for sale".to_string()))
        .map(|nft| (nft, remaining_utxos))
}

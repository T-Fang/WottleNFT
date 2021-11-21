import React, { useEffect, useState } from "react";

import DisplayMessage from "../Components/Nfts/DisplayMessage";
import MarketNftBigCard from "../Components/Nfts/MarketplaceNfts/MarketNftBigCard";
import MarketNftCard from "../Components/Nfts/MarketplaceNfts/MarketNftCard";
import { Status } from "../features/wallet/walletSlice";
import useWallet from "../hooks/useWallet";
import {
  buyNft,
  BuyNftRequest,
  cancelNft,
  CancelNftRequest,
  getAllNftsForSale,
  NftForSale,
} from "../lib/marketplaceApi";
import { signTransaction } from "../lib/transactionApi";
import { Main } from "../templates/Main";
import { NamiWallet } from "../wallet";

const Marketplace = () => {
  const wallet = useWallet();

  if (wallet.status !== Status.Enabled) {
    return (
      <Main>
        <DisplayMessage text="Loading..." />
      </Main>
    );
  }

  return (
    <Main>
      <MarketNftList
        address={wallet.state.address}
        url={wallet.state.backendApi}
        cardano={wallet.cardano}
      />
    </Main>
  );
};

export default Marketplace;

const MarketNftList = ({
  url,
  address,
  cardano,
}: {
  url: string;
  address: string;
  cardano: NamiWallet;
}) => {
  const [saleNfts, setSaleNfts] = useState<NftForSale[]>([]);

  useEffect(() => {
    const getSaleNfts = async () => {
      setSaleNfts(await getAllNftsForSale(url));
    };
    getSaleNfts();
  }, [url]);

  const buy = async (sellDetails: NftForSale) => {
    const request: BuyNftRequest = {
      buyerAddress: address,
      policyId: sellDetails.policyId,
      assetName: sellDetails.assetName,
    };

    const { transaction } = await buyNft(url, request);
    const signature = await cardano.signTx(transaction, true);
    const signResponse = await signTransaction(url, transaction, signature);
    console.log(signResponse);
  };

  const cancel = async (sellData: NftForSale) => {
    const request: CancelNftRequest = {
      sellerAddress: sellData.metadata.sellerAddress,
      policyId: sellData.policyId,
      assetName: sellData.assetName,
    };
    const { transaction } = await cancelNft(url, request);
    const signature = await cardano.signTx(transaction);
    const signResponse = await signTransaction(url, transaction, signature);
    console.log(signResponse);
  };

  return (
    <div className="px-4 md:px-12 2xl:px-52">
      {saleNfts[0] &&
        (saleNfts[0].metadata.namiAddress === address ? (
          <MarketNftBigCard
            nftForSale={saleNfts[0]}
            btnOnClick={() => cancel(saleNfts[0]!)}
            btnText="Unlist"
          />
        ) : (
          <MarketNftBigCard
            nftForSale={saleNfts[0]}
            btnOnClick={() => buy(saleNfts[0]!)}
            btnText="Buy"
          />
        ))}

      <div className="flex flex-col gap-3 px-4 md:px-10 pb-10">
        <div className="flex justify-between h-12 p-3">
          <span className="text-xl">Marketplace</span>
          {/* <IonRouterLink href="/marketplace/search" color="primary">
              Search All
            </IonRouterLink> */}
        </div>

        {saleNfts.length ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {saleNfts.map((nftForSale, idx) => {
              return (
                <div key={idx}>
                  {nftForSale.metadata.namiAddress === address ? (
                    <MarketNftCard
                      nftForSale={nftForSale}
                      btnOnClick={() => cancel(nftForSale)}
                      btnText="Unlist"
                    />
                  ) : (
                    <MarketNftCard
                      nftForSale={nftForSale}
                      btnOnClick={() => buy(nftForSale)}
                      btnText="Buy"
                    />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <DisplayMessage text="No Listed NFTs Right Now" />
        )}
      </div>
    </div>
  );
};

import React from "react";

import { IonButton, IonCardSubtitle, IonLabel } from "@ionic/react";
import Link from "next/link";

import useNftFromSaleNft from "../../../hooks/useNftFromSaleNft";
import { NftForSale } from "../../../lib/marketplaceApi";
import { getImgUrl } from "../../../utils/NftUtil";

type Props = {
  nftForSale: NftForSale;
  btnOnClick: React.MouseEventHandler<HTMLIonButtonElement> | undefined;
  btnText: string;
};

const MarketNftBigCard = ({ nftForSale, btnOnClick, btnText }: Props) => {
  const saleMetadata = nftForSale.metadata;
  const { price } = saleMetadata;

  const nft = useNftFromSaleNft(nftForSale);

  const { assetName, metadata } = nft;
  const { description, image } = metadata;

  const imageUrl = getImgUrl(image);

  return (
    <div className="mb-3 flex px-4 md:px-16 py-4 truncate items-center flex-col md:flex-row">
      <Link href={`/marketplace/listingId`} passHref>
        <a>
          <img
            className="rounded-3xl object-cover w-full p-2"
            alt="NFT Image"
            src={imageUrl}
          />
        </a>
      </Link>
      <div className="w-full flex flex-col h-full gap-4 lg:gap-8 px-4 md:px-12 justify-between text-left">
        <p className="text-3xl whitespace-normal truncate font-bold my-auto">
          {assetName}
        </p>
        <p className="text-xl whitespace-normal truncate line-clamp-3">
          {description}
        </p>
        <div className="flex items-end justify-between pr-4">
          <div className="flex flex-col items-start">
            <IonCardSubtitle className="text-base font-light">
              Price:
            </IonCardSubtitle>
            <IonLabel className="text-4xl text-primary-default">
              {`${price / 1000000} ₳`}
            </IonLabel>
          </div>
          <div className="w-16 mb-1">
            <IonButton shape="round" onClick={btnOnClick}>
              {btnText}
            </IonButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketNftBigCard;

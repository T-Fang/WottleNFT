import React from "react";

import { Nft } from "../../../types/Nft";
import { getImgUrl } from "../../../utils/NftUtil";

type Props = {
  nft: Nft;
};

const NftCard = ({ nft }: Props) => {
  const { assetName, metadata } = nft;
  const { description, image } = metadata;

  const imageUrl = getImgUrl(image);

  return (
    <div
      style={{ height: 500, width: 400 }}
      className="flex flex-col w-px h-px m-8 transition-all rounded-md bg-gray-50 drop-shadow-md hover:drop-shadow-2xl hover:scale-110"
    >
      <img
        className="object-contain p-2 h-4/5 rounded-xl"
        alt="Event"
        src={imageUrl}
      />
      <div className="p-2">
        <p className="text-2xl font-bold">{assetName}</p>
        <p className="text-gray-800">{description}</p>
      </div>
    </div>
  );
};

export default NftCard;

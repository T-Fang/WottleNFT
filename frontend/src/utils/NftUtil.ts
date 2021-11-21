import { Nft } from "../types/Nft";

export const responseToNft = (nftResponse: any): Nft => {
  const policyId = Object.keys(nftResponse)[0]!;
  const assetName = Object.keys(nftResponse[policyId])[0]!;
  const metadata = nftResponse[policyId][assetName];

  return {
    policyId,
    assetName,
    quantity: 1,
    metadata,
  };
};

export const getImgUrl = (image: string): string => {
  const imageHash = image.replace("ipfs://", "");
  return `https://ipfs.io/ipfs/${imageHash}`;
};

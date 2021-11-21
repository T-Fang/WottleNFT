import { useEffect, useState } from "react";

import { NftForSale } from "../lib/marketplaceApi";
import { Nft } from "../types/Nft";
import { testNft } from "../types/testData";
import { responseToNft } from "../utils/NftUtil";

const useNftFromSaleNft = (nftForSale: NftForSale): Nft => {
  const [nft, setNft] = useState<Nft>(testNft);
  useEffect(() => {
    const { policyId, assetName } = nftForSale;

    const fetchNftInfo = async () => {
      const url = `${process.env.ssrBackendApi}/nft/single/${policyId}/${assetName}`;
      const res = await fetch(url);
      setNft(responseToNft(await res.json()));
    };
    fetchNftInfo();
  }, [nftForSale]);

  return nft;
};

export default useNftFromSaleNft;

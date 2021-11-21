import { GetServerSideProps } from "next";

import DisplayMessage from "../../../../Components/Nfts/DisplayMessage";
import NftInfoCard from "../../../../Components/Nfts/NftInfoCard";
import { Status } from "../../../../features/wallet/walletSlice";
import useWallet from "../../../../hooks/useWallet";
import { Main } from "../../../../templates/Main";
import { Nft } from "../../../../types/Nft";
import { getImgUrl, responseToNft } from "../../../../utils/NftUtil";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { policyId, assetName } = context.params!;
  const id = policyId as string;
  const name = assetName as string;

  const res = await fetch(
    `${process.env.ssrBackendApi}/nft/single/${id}/${name}`
  );

  return {
    props: {
      nft: responseToNft(await res.json()),
    },
  };
};

type Props = {
  nft: Nft;
};

const NftDetails = (props: Props) => {
  const wallet = useWallet();
  if (wallet.status !== Status.Enabled) {
    return (
      <Main>
        <DisplayMessage text="Loading..." />
      </Main>
    );
  }

  const { metadata, assetName, policyId } = props.nft;
  const { description, image } = metadata;

  const imageUrl = getImgUrl(image);

  return (
    <Main
      openGraph={{
        type: "website",
        url: `https://wottlenft.io/nfts/${policyId}/${assetName}`,
        title: `WottleNFT | ${assetName}`,
        description,
        images: [
          {
            url: imageUrl,
            width: 600,
            height: 600,
            alt: "NFT Image",
            type: "image/png",
          },
        ],
      }}
    >
      <div className="flex flex-col items-center px-4 md:px-12 2xl:px-52">
        <img
          className="object-contain h-3/4 min-h-320 p-4 rounded-2xl"
          alt="NFT Image"
          src={imageUrl}
        />
        <div className="flex flex-col md:flex-row p-6 gap-6 self-stretch">
          <div className="w-full">
            <div className="flex flex-col text-left">
              <p className="w-full text-2xl whitespace-normal truncate font-bold">
                {assetName}
              </p>
              <span>
                Owned By{" "}
                <span className="text-primary-default">
                  @{"owner" in metadata ? metadata.owner : "Unknown"}
                </span>
              </span>
              <p className="mt-4 text-base whitespace-normal">{description}</p>
            </div>
          </div>
          <div className="w-full">
            <NftInfoCard nft={props.nft} />
          </div>
        </div>
      </div>
    </Main>
  );
};
export default NftDetails;

import React from "react";

import HowToMint from "../../Components/MintNfts/HowToMint";
import Minting from "../../Components/MintNfts/Minting";
import WalletSwitch from "../../Components/WalletSwitch";
import useWallet from "../../hooks/useWallet";
import { Main } from "../../templates/Main";

const MintNftPage = () => {
  const wallet = useWallet();

  return (
    <Main title="Mint-NFT" description="Mint an NFT on the Cardano Blockchain!">
      <div className="bg-primary-default">
        <div className="flex flex-col items-center justify-center min-h-full align-middle">
          <WalletSwitch
            wallet={wallet}
            enabled={(enabledWallet) => <Minting wallet={enabledWallet} />}
            fallback={<></>}
          />
          <HowToMint />
        </div>

        <div className="p-10" />
      </div>
    </Main>
  );
};
export default MintNftPage;

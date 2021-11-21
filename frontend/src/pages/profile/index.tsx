import React from "react";

import { IonButton, IonSpinner } from "@ionic/react";
import Link from "next/link";

import DisplayMessage from "../../Components/Nfts/DisplayMessage";
import NftList from "../../Components/Nfts/UserNfts/NftList";
import WalletSwitch from "../../Components/WalletSwitch";
import useAuth from "../../hooks/useAuth";
import useWallet from "../../hooks/useWallet";
import { Main } from "../../templates/Main";

const Profile = () => {
  const wallet = useWallet();
  const { isLoading, isLoggedIn, setLogout } = useAuth();

  return (
    <Main title="Profile">
      <div className="flex flex-col w-full min-h-full bg-primary-default">
        {isLoading && <IonSpinner name="crescent" className="self-center" />}
        {!isLoading && !isLoggedIn && (
          <p className="self-center text-3xl font-bold mt-52">
            <Link href="/login">
              <a className="hover:text-blue-600 hover:underline">Login</a>
            </Link>{" "}
            to view your profile
          </p>
        )}
        {!isLoading && isLoggedIn && (
          <>
            <IonButton
              onClick={() => setLogout()}
              color="secondary"
              size="default"
              className="self-end w-20"
            >
              Logout
            </IonButton>
            <WalletSwitch
              wallet={wallet}
              loading={<DisplayMessage text="Loading your wallet..." />}
              notEnabled={<DisplayMessage text="Please enable Nami Wallet" />}
              enabled={(enabledWallet) => (
                <NftList
                  address={enabledWallet.state.address}
                  baseUrl={enabledWallet.state.backendApi}
                />
              )}
              fallback={<DisplayMessage text="Please get Nami Wallet" />}
            />
          </>
        )}
      </div>
    </Main>
  );
};
export default Profile;

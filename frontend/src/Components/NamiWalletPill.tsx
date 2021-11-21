import React from "react";

import { IonRouterLink } from "@ionic/react";

const NamiWalletPill = () => {
  return (
    <IonRouterLink
      href="https://namiwallet.io/"
      target="_blank"
      className="flex items-center self-end justify-center h-10 px-1 m-5 rounded-full shadow-md w-36 bg-gradient-to-r from-green-300 to-red-400 hover:from-green-400 focus:to-red-500"
      rel="noreferrer"
    >
      <p className="font-bold text-white">Get Nami Wallet</p>
    </IonRouterLink>
  );
};

export default NamiWalletPill;

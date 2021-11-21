import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from ".";
import {
  Enabled,
  initializeWallet,
  Loading,
  NoExtension,
  NotEnabled,
  Status,
} from "../features/wallet/walletSlice";
import { NamiWallet } from "../wallet";

type HasExtension = {
  cardano: NamiWallet;
};

export type WottleEnabled = HasExtension & Enabled;
type Present = WottleEnabled | (HasExtension & NotEnabled);
type NotPresent = NoExtension | Loading;

export type WottleWalletState = Present | NotPresent;

const useWallet = (): WottleWalletState => {
  const wallet = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeWallet());
  }, [dispatch]);

  useEffect(() => {
    if (wallet.status === Status.Enabled) {
      window.cardano!.onAccountChange(() => {
        dispatch(initializeWallet());
      });
    }
  });

  if (wallet.status === Status.Loading)
    return {
      status: Status.Loading,
    };

  if (wallet.status === Status.NoExtension)
    return {
      status: Status.NoExtension,
    };

  return {
    cardano: window.cardano as NamiWallet,
    ...wallet,
  };
};

export default useWallet;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { HexCborString, Network } from "../../wallet";

export enum Status {
  NoExtension,
  Loading,
  NotEnabled,
  Enabled,
}

export type NoExtension = {
  status: Status.NoExtension;
};

export type Loading = {
  status: Status.Loading;
};

export type NotEnabled = {
  status: Status.NotEnabled;
};

export type Enabled = {
  status: Status.Enabled;
  state: WalletState;
};

export type WalletState = {
  address: string;
  balance: number;
  network: Network;
  backendApi: string;
};

export type WalletStatus = NoExtension | Loading | NotEnabled | Enabled;

export const MAINNET = 1;
export const TESTNET = 0;

const getBackendApi = (network: Network) => {
  return network === 1
    ? (process.env.mainnetApi as string)
    : (process.env.testnetApi as string);
};

const initialState: WalletStatus = {
  status: Status.Loading,
};

export const initializeWallet = createAsyncThunk(
  "wallet/init",
  async (): Promise<WalletStatus> => {
    const { cardano } = window;
    if (!cardano)
      return {
        status: Status.NoExtension,
      };

    if (!(await cardano.isEnabled())) {
      return {
        status: Status.NotEnabled,
      };
    }
    const network = await cardano.getNetworkId();
    const backendApi = getBackendApi(network);

    const address = await cardano.getChangeAddress();
    const res = await fetch(`${backendApi}/address/${address}/balance`);
    const balance = (await res.json()).total_value;

    return {
      status: Status.Enabled,
      state: {
        address,
        balance,
        network,
        backendApi,
      },
    };
  }
);

const reducers = {
  setLoading: (state: WalletStatus) => {
    state.status = Status.Loading;
  },
  setNoExtension: (state: WalletStatus) => {
    state.status = Status.NoExtension;
  },
  setNotEnabled: (state: WalletStatus) => {
    state.status = Status.NotEnabled;
  },
  setEnabled: (state: WalletStatus, action: PayloadAction<Enabled>) => {
    state.status = Status.Enabled;
    (state as Enabled).state = action.payload.state;
  },

  addressChange: (
    state: WalletStatus,
    action: PayloadAction<HexCborString>
  ) => {
    if (state.status === Status.Enabled) state.state.address = action.payload;
  },

  networkChange: (state: WalletStatus, action: PayloadAction<Network>) => {
    if (state.status === Status.Enabled) {
      state.state.network = action.payload;
      state.state.backendApi = getBackendApi(action.payload);
    }
  },

  balanceChange: (state: WalletStatus, action: PayloadAction<number>) => {
    if (state.status === Status.Enabled) state.state.balance = action.payload;
  },
};

export const walletSlice = createSlice<WalletStatus, typeof reducers, "Wallet">(
  {
    name: "Wallet",
    initialState,
    reducers,
    extraReducers: (builder) => {
      builder.addCase(initializeWallet.pending, (state, _) => {
        state.status = Status.Loading;
      });
      builder.addCase(initializeWallet.fulfilled, (_, action) => {
        return action.payload;
      });
    },
  }
);

export const {
  addressChange,
  balanceChange,
  networkChange,
  setLoading,
  setEnabled,
  setNoExtension,
  setNotEnabled,
} = walletSlice.actions;

export default walletSlice.reducer;

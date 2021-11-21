import { configureStore } from "@reduxjs/toolkit";

// eslint-disable-next-line import/no-named-as-default
import namiWalletReducer from "../features/wallet/walletSlice";
import { nftApi } from "./nft";

export const store = configureStore({
  reducer: {
    wallet: namiWalletReducer,
    [nftApi.reducerPath]: nftApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nftApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

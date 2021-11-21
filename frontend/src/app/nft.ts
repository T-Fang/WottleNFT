import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Nft } from "../types/Nft";

export const nftApi = createApi({
  reducerPath: "nftApi",
  baseQuery: fetchBaseQuery({}),
  endpoints: (builder) => ({
    getUserNfts: builder.query<Nft[], { url: string; address: string }>({
      query: ({ url, address }) => `${url}/address/${address}/nft`,
    }),
  }),
});

export const { useGetUserNftsQuery } = nftApi;

import axios, { AxiosResponse } from "axios";

import { TransactionResponse } from "../types/Transactions";

export enum UnGoal {
  ClimateAction = "ClimateAction",
  ZeroHunger = "ZeroHunger",
  QualityEducation = "QualityEducation",
}

export type SellNftRequest = {
  sellerAddress: string;
  policyId: string;
  assetName: string;
  unGoal: UnGoal;
  price: number;
};

export const sellNft = async (
  baseUrl: string,
  request: SellNftRequest
): Promise<TransactionResponse> => {
  const response = await axios.post<
    SellNftRequest,
    AxiosResponse<TransactionResponse>
  >(`${baseUrl}/marketplace/sell`, request);

  return response.data;
};

export type NftForSale = {
  policyId: string;
  assetName: string;
  metadata: SaleMetadata;
};

export type SaleMetadata = {
  sellerAddress: string;
  price: number;
  unGoal: UnGoal;
  namiAddress: string;
};

export const getAllNftsForSale = async (
  baseUrl: string
): Promise<NftForSale[]> => {
  const response = await axios.get<never, AxiosResponse<NftForSale[]>>(
    `${baseUrl}/marketplace`
  );
  return response.data;
};

export type BuyNftRequest = {
  buyerAddress: string;
  policyId: string;
  assetName: string;
};

export const buyNft = async (
  baseUrl: string,
  request: BuyNftRequest
): Promise<TransactionResponse> => {
  const response = await axios.post<
    BuyNftRequest,
    AxiosResponse<TransactionResponse>
  >(`${baseUrl}/marketplace/buy`, request);

  return response.data;
};

export type CancelNftRequest = {
  sellerAddress: string;
  policyId: string;
  assetName: string;
};

export const cancelNft = async (
  baseUrl: string,
  request: CancelNftRequest
): Promise<TransactionResponse> => {
  const response = await axios.post<
    CancelNftRequest,
    AxiosResponse<TransactionResponse>
  >(`${baseUrl}/marketplace/cancel`, request);

  return response.data;
};

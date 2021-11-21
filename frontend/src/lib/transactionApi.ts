import axios, { AxiosResponse } from "axios";

import {
  SignTransaction,
  SignTransactionResponse,
} from "../types/Transactions";
import { HexCborString } from "../wallet";

export const signTransaction = async (
  backendApi: string,
  transaction: HexCborString,
  signature: HexCborString
): Promise<SignTransactionResponse> => {
  const signResponse = await axios.post<
    SignTransaction,
    AxiosResponse<SignTransactionResponse>
  >(`${backendApi}/sign`, {
    signature,
    transaction,
  });
  return signResponse.data;
};

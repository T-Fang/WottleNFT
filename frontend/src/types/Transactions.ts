import { HexCborString } from "../wallet";

export type SignTransaction = {
  transaction: HexCborString;
  signature: HexCborString;
};

export type SignTransactionResponse = {
  tx_id: string;
};

export type TransactionResponse = {
  transaction: HexCborString;
};

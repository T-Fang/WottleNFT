import { Asset } from "./Asset";

export interface UTxO {
  tx_hash: string;
  tx_idx: number;
  lovelace: number;
  assets: Asset[];
}

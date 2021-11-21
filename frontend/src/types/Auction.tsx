import { Asset } from "./Asset";
import { Category } from "./Category";
import { Profile } from "./Profile";

export interface Auction {
  id: number;
  categories: Category[];
  endingTime: number;
  creater: Profile;
  nft: Asset;
}

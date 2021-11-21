import { Asset } from "./Asset";
import { Auction } from "./Auction";
import { Category } from "./Category";
import { Nft } from "./Nft";
import { Partner } from "./Partner";
import { Profile } from "./Profile";

export const testCategories: Category[] = [
  {
    id: 1,
    name: "Zero hunger",
  },
  {
    id: 2,
    name: "Quality education",
  },
  {
    id: 3,
    name: "Climate action",
  },
  {
    id: 4,
    name: "More UN goals",
  },
];

export const testNfts: Asset[] = [
  {
    policy_id: "6ecee816357c3d8210b77c5504b2aa2ba23f94194bc6c759cdf7af3f",
    asset_name: "The Bacon and Egg Human Sandwich (1/1)",
    qty: 1,
    imgUrl: "https://picsum.photos/800",
    description:
      "description for The Bacon and Egg Human Sandwich (1/1), this is a long description, this is a long description, this is a long description, this is a long description, this is a long description, this is a long description, this is a long description, this is a long description",
  },
  {
    policy_id: "92837459827",
    asset_name: "The Bacon and Egg Human Sandwich (1/1)",
    qty: 1,
    imgUrl: "https://picsum.photos/600",
    description:
      "this is a 64 character description of this story such as this lo",
  },
  {
    policy_id: "23049580398",
    asset_name: "Orange",
    qty: 1,
    imgUrl: "https://picsum.photos/300",
    description: "description for Orange",
  },
  {
    policy_id: "5769875302",
    asset_name: "Knife",
    qty: 1,
    imgUrl: "https://picsum.photos/500",
    description: "description for Knife",
  },
  {
    policy_id: "5769875302",
    asset_name: "Golf Ball",
    qty: 1,
    imgUrl: "https://picsum.photos/400",
    description: "description for Golf Ball",
  },
];

export const testProfiles: Profile[] = [
  {
    username: "BASKET",
    profileImgUrl: "https://picsum.photos/300",
  },
  {
    username: "PLAYER",
    profileImgUrl: "https://picsum.photos/400",
  },
  {
    username: "BEAST VERY LONG USERNAME",
    profileImgUrl: "https://picsum.photos/230",
  },
  {
    username: "HONEYBEE",
    profileImgUrl: "https://picsum.photos/200",
  },
];
export const testAuctions: Auction[] = [
  {
    id: 1,
    categories: [testCategories[1]!],
    endingTime: 1635724800,
    creater: testProfiles[1]!,
    nft: testNfts[1]!,
  },
  {
    id: 2,
    categories: [testCategories[2]!],
    endingTime: 1635724800,
    creater: testProfiles[3]!,
    nft: testNfts[3]!,
  },
  {
    id: 3,
    categories: [testCategories[0]!],
    endingTime: 1635724800,
    creater: testProfiles[2]!,
    nft: testNfts[4]!,
  },
  {
    id: 4,
    categories: [testCategories[1]!],
    endingTime: 1635724800,
    creater: testProfiles[1]!,
    nft: testNfts[2]!,
  },
  {
    id: 5,
    categories: [testCategories[3]!],
    creater: testProfiles[3]!,
    endingTime: 1635724800,
    nft: testNfts[3]!,
  },
  {
    id: 6,
    categories: [testCategories[1]!],
    endingTime: 1634129600,
    creater: testProfiles[2]!,
    nft: testNfts[2]!,
  },
];

const trcl: Partner = {
  name: "TRCL",
  websiteUrl: "https://www.therice.sg/",
  imgUrl:
    "https://user-images.githubusercontent.com/57287843/138369181-d1e1b3bc-7e7c-4b1f-b289-191c242e7f73.png",
};

const nus: Partner = {
  name: "NUS",
  websiteUrl: "https://www.nus.edu.sg",
  imgUrl:
    "https://user-images.githubusercontent.com/61874388/138596221-16e8ec88-d251-4e24-a42a-162b7c28e259.png",
};

// const testPartner: Partner = {
//   name: "Partner",
//   websiteUrl: "https://wottlenft.io/",
//   imgUrl: "https://picsum.photos/200",
// };

export const testPartners: Partner[] = [nus];
export const testSocialEnterprises: Partner[] = [trcl];

export const testNft: Nft = {
  policyId: "9bb72d35809e1c8a93c9c7404c7aa3480483105343c38e9eb7c7b143",
  assetName: "oct20",
  quantity: 1,
  metadata: {
    description: "oct20 description",
    image: "https://picsum.photos/200",
    name: "oct20 name",
    author: "WottleNFT",
    owner: "WottleNFT",
  },
};

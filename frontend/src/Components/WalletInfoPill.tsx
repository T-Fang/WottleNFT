import Link from "next/link";

import { WalletState } from "../features/wallet/walletSlice";

const WalletInfoPill: React.FC<WalletState> = (props) => {
  return (
    <Link href="/profile" passHref>
      <div className="flex items-center self-end justify-end px-1 m-5 bg-black rounded-full shadow-md cursor-pointer w-36">
        <p className="w-full text-center text-white truncate">{`${
          !props.network ? "t" : ""
        }₳ ${props.balance / 1000000}`}</p>
        <img
          src="/logo.png"
          alt="profile pic"
          className="object-contain m-2 bg-white border-2 border-gray-500 rounded-full h-7 w-7"
        />
      </div>
    </Link>
  );
};
export default WalletInfoPill;

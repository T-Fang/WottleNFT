import { Status } from "../features/wallet/walletSlice";
import { WottleEnabled, WottleWalletState } from "../hooks/useWallet";

type Props = {
  wallet: WottleWalletState;
  loading?: JSX.Element;
  notEnabled?: JSX.Element;
  noExtension?: JSX.Element;
  enabled?: (wallet: WottleEnabled) => JSX.Element;
  fallback: JSX.Element;
};

const WalletSwitch = ({
  wallet,
  loading,
  noExtension,
  notEnabled,
  enabled,
  fallback,
}: Props) => {
  if (wallet.status === Status.Enabled && enabled) return enabled(wallet);
  if (wallet.status === Status.Loading && loading) return loading;
  if (wallet.status === Status.NotEnabled && notEnabled) return notEnabled;
  if (wallet.status === Status.NoExtension && noExtension) return noExtension;

  return fallback;
};

export default WalletSwitch;

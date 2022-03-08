import { FC, createContext } from "react";
import { DeeplinkableWallet, GenericExtensionWallet } from "@signumjs/wallets";
import { Config } from "../config";
import {isClientSide} from '@app/isClientSide';


export interface AppContextType {
  DAppName: string;
  IsClientSide: boolean;
  Wallet: {
    Extension: GenericExtensionWallet;
    Deeplink: DeeplinkableWallet;
  };
  Ledger: {
    IsTestnet: boolean;
    Network: string;
    Explorer: string;
  };
}

const config: AppContextType = {
  DAppName: Config.DAppName,
  IsClientSide: isClientSide(),
  Wallet: {
    Extension: new GenericExtensionWallet(),
    Deeplink: new DeeplinkableWallet({ openInBrowser: true }),
  },
  Ledger: {
    IsTestnet: Config.Ledger.IsTestnet,
    Network: Config.Ledger.Network,
    Explorer: Config.Ledger.Explorer,
  },
};

export const AppContext = createContext<AppContextType>(config);

export const AppContextProvider: FC = ({ children }) => {
  return <AppContext.Provider value={config}>{children}</AppContext.Provider>;
};

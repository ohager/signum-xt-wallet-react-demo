const toBoolean = (v: string): boolean => v.toLowerCase() === "true";

const withoutTrailingSlash = (url: string) => url.endsWith('/') ? url.substring(0, url.length -1) : url

export const Config = {
  DAppName: process.env.NEXT_PUBLIC_DAPP_NAME || "MyDApp",
  Ledger: {
    IsTestnet: toBoolean(process.env.NEXT_PUBLIC_SIGNUM_IS_TESTNET || "false"),
    Network: process.env.NEXT_PUBLIC_SIGNUM_NETWORK || "Signum-TESTNET",
    Explorer: withoutTrailingSlash(process.env.NEXT_PUBLIC_SIGNUM_EXPLORER || "https://t-chain.signum.network/"),
  },
};

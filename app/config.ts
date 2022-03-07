const toBoolean = (v: string): boolean => v.toLowerCase() === "true";

export const Config = {
  DAppName: process.env.NEXT_PUBLIC_DAPP_NAME || "MyDApp",
  Ledger: {
    IsTestnet: toBoolean(process.env.NEXT_PUBLIC_SIGNUM_IS_TESTNET || "false"),
    Network: process.env.NEXT_PUBLIC_SIGNUM_NETWORK || "Signum-TESTNET",
  },
};

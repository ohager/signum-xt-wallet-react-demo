import { useEffect } from "react";
import {
  ExtensionWalletError,
  GenericExtensionWallet,
  WalletConnection,
} from "@signumjs/wallets";
import { useAppContext } from "@app/hooks/useAppContext";
import { requestWalletConnection } from "@app/requestWalletConnection";
import { actions, selectIsWalletConnected } from "@app/states/walletState";
import { useAppDispatch } from "@app/hooks/useAppDispatch";
import { useAppSelector } from "@app/hooks/useAppSelector";

export const WalletInitializer = () => {
  const dispatch = useAppDispatch();
  const { Ledger, Wallet, DAppName } = useAppContext();
  const isWalletConnected = useAppSelector(selectIsWalletConnected);

  function onWalletConnected(connection: WalletConnection) {
    dispatch(actions.setIsWalletConnected(true));
    dispatch(actions.setWalletNodeHost(connection.currentNodeHost));
    dispatch(actions.setWatchOnly(connection.watchOnly));
    dispatch(actions.setWalletPublicKey(connection.publicKey || ""));
  }

  useEffect(() => {
    let listener: any = null;

    function handleDisconnectWallet() {
      listener && listener.unlisten();
      dispatch(actions.setIsWalletConnected(false));
      dispatch(actions.setWatchOnly(false));
      dispatch(actions.setWalletNodeHost(""));
      dispatch(actions.setWalletPublicKey(""));
      Wallet.Extension = new GenericExtensionWallet();
    }

    function onNetworkChange(args: any) {
      dispatch(actions.setWalletNodeHost(args.networkHost));
      if (args.networkName === Ledger.Network) {
        if (!isWalletConnected) {
          requestWalletConnection();
        }
      } else {
        alert("Wallet changed to another network");
      }
    }

    function onAccountChange(args: any) {
      dispatch(actions.setWalletPublicKey(args.accountPublicKey));
      dispatch(actions.setWatchOnly(args.watchOnly));
    }

    function onPermissionOrAccountRemoval() {
      alert("Wallet removed this DApps permission");
      handleDisconnectWallet();
    }

    function handleExtensionErrors(e: ExtensionWalletError) {
      alert(e.message);
      actions.setWalletError(e);
    }

    async function handleConnectWallet() {
      if (isWalletConnected) return;

      try {
        const connection = await Wallet.Extension.connect({
          appName: DAppName,
          networkName: Ledger.Network,
        });

        onWalletConnected(connection);

        listener = connection.listen({
          onNetworkChanged: onNetworkChange,
          onAccountChanged: onAccountChange,
          onPermissionRemoved: onPermissionOrAccountRemoval,
          onAccountRemoved: onPermissionOrAccountRemoval,
        });
      } catch (e: any) {
        handleExtensionErrors(e);
      }
    }

    window.addEventListener("connect-wallet", handleConnectWallet);
    window.addEventListener("disconnect-wallet", handleDisconnectWallet);

    return () => {
      listener && listener.unlisten();
      window.removeEventListener("connect-wallet", handleConnectWallet);
      window.removeEventListener("disconnect-wallet", handleDisconnectWallet);
    };
  }, [isWalletConnected, Wallet.Extension]);

  useEffect(() => {
    if (isWalletConnected) return;
    requestWalletConnection();
  }, [isWalletConnected]);

  return null;
};

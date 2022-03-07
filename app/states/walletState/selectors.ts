import { RootState } from "@app/states/store";
import {WalletState} from '@app/states/walletState/slice';

export const selectWalletState = (state: RootState): WalletState => state.wallet;

export const selectIsWalletConnected = (state: RootState): boolean =>
  state.wallet.isWalletConnected;

export const selectWalletNodeHost = (state: RootState): string =>
  state.wallet.walletNodeHost;

export const selectWalletPublicKey = (state: RootState): string =>
  state.wallet.walletPublicKey;

export const selectWalletError = (state: RootState): string =>
  state.wallet.walletPublicKey;

import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import { walletSlice } from "@app/states/walletState";


const rootReducer = combineReducers({
  wallet: walletSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

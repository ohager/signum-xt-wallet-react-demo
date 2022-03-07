import {useDispatch} from "react-redux";
import type {AppDispatch} from "@app/states/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

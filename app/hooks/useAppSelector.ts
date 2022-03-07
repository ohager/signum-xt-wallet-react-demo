import type {RootState} from "@app/states/store";
import {TypedUseSelectorHook, useSelector} from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

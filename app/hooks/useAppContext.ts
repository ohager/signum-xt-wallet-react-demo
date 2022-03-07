import { useContext } from "react";
import { AppContext, AppContextType } from "@app/contexts/AppContext";

export const useAppContext = (): AppContextType => {
    return useContext(AppContext);
};

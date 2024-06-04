import { createContext, useContext } from "react";
import { IAuthContextData } from "../contexts/AuthContext";

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}
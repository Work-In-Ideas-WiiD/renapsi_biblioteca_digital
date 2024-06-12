import { useContext } from "react";
import { PreviousRouteContext } from "../contexts/PreviousRouteContext";

export const usePreviousRoute = () => {
    const context = useContext(PreviousRouteContext);

    return context;
};
import { createContext, useRef, useEffect, ReactNode, useState } from 'react';
import { Location, useLocation } from 'react-router-dom';

interface ContextPorps {
    children: ReactNode
}

export interface PreviousRouteContextData {
    getPreviousLocation: () => string
}

export const PreviousRouteContext = createContext<PreviousRouteContextData>({} as PreviousRouteContextData);

export const PreviousRouteProvider = ({ children }: ContextPorps) => {
    const location = useLocation();
    const [previosRoute, setPreviousRoute] = useState<string[]>([]);

    function getPreviousLocation() {
        if (previosRoute.length == 0) {
            return "";
        }
        if (previosRoute.length == 1) {
            return previosRoute[1];
        }
        return previosRoute[previosRoute.length - 2];
    }

    useEffect(() => {
        _pushPreviousRoute();
    }, [location]);

    function _pushPreviousRoute() {
        const pathName = location.pathname;
        const newArray = previosRoute;
        newArray.push(pathName);
        setPreviousRoute(newArray);
    }

    return (
        <PreviousRouteContext.Provider value={{
            getPreviousLocation
        }}>
            {children}
        </PreviousRouteContext.Provider>
    );
};
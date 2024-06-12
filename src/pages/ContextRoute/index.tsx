import { Outlet } from "react-router-dom";
import { AuthContextData } from "../../contexts/AuthContext";
import { PreviousRouteProvider } from "../../contexts/PreviousRouteContext";

export function ContextRoute() {
    return (
        <AuthContextData>
            <PreviousRouteProvider>
                <Outlet />
            </PreviousRouteProvider>
        </AuthContextData>

    )
}
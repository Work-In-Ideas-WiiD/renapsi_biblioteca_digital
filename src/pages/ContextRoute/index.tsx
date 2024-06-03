import { Outlet } from "react-router-dom";
import { AuthContext, AuthContextData } from "../../hooks/useAuth";

export function ContextRoute() {
    return (
        <AuthContextData>
            <Outlet />
        </AuthContextData>

    )
}
import { Outlet } from "react-router-dom";
import { AuthContextData } from "../../contexts/AuthContext";

export function ContextRoute() {
    return (
        <AuthContextData>
            <Outlet />
        </AuthContextData>

    )
}
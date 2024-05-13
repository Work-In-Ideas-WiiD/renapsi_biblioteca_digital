import { createBrowserRouter } from "react-router-dom";
import { Login } from "../../pages/Login";

const router = createBrowserRouter([
    {
        //  element: <ContextRoute />,
        children: [
            {
                path: "/",
                element: <Login />
            },
        ]
    },
]);

export default router;
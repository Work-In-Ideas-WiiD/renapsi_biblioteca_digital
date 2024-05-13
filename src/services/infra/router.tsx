import { createBrowserRouter } from "react-router-dom";
import { Login } from "../../pages/Login";
import { AppPage } from "../../pages/App";
import { Home } from "../../pages/App/Home";

const router = createBrowserRouter([
    {
        //  element: <ContextRoute />,
        children: [
            {
                path: "/",
                element: <Login />
            },
            {
                path: "/app",
                element: <AppPage />,
                children: [
                    {
                        path: "",
                        element: <Home />
                    },
                    {
                        path: "home",
                        element: <Home />
                    }
                ]
            }
        ]
    },
]);

export default router;
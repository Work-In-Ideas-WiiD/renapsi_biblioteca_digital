import { createBrowserRouter } from "react-router-dom";
import { Login } from "../../pages/Login";
import { AppPage } from "../../pages/App";
import { Home } from "../../pages/App/Home";
import { ModuleList } from "../../pages/App/ModuleList";
import { SearchPage } from "../../pages/App/SearchPage";
import { ConfigPage } from "../../pages/App/Config";
import { SupportPage } from "../../pages/App/Config/SupportPage";
import { ContextRoute } from "../../pages/ContextRoute";
import { PdfPage } from "../../pages/App/PdfPage";
import { ErrorPage } from "../../pages/ErrorPage";

const router = createBrowserRouter([
    {
        errorElement: <ErrorPage />,
        element: <ContextRoute />,
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
                    },
                    {
                        path: "modulo/:id",
                        element: <ModuleList />
                    },
                    {
                        path: "pesquisa",
                        element: <SearchPage />
                    },
                    {
                        path: "config",
                        element: <ConfigPage />
                    },
                    {
                        path: "config/suporte",
                        element: <SupportPage />
                    },
                    {
                        path: "pdf/:id",
                        element: <PdfPage />
                    },
                ]
            }
        ]
    },
]);

export default router;
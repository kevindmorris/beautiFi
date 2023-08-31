import { createBrowserRouter, createHashRouter } from "react-router-dom";

import HomePage from "../../pages/home/HomePage";
import AppFrame from "../AppFrame";
import AnnuitiesPage from "../../pages/annuities/AnnuitiesPage";

const routes = [
  {
    path: "*",
    element: <AppFrame />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "annuities", element: <AnnuitiesPage /> },
    ],
  },
];

const router = createHashRouter(routes);

export default router;

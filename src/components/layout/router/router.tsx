import { createHashRouter } from "react-router-dom";

import HomePage from "../../pages/home/HomePage";
import AppFrame from "../AppFrame";
import AnnuityPage from "../../pages/annuity/AnnuityPage";

const routes = [
  {
    path: "*",
    element: <AppFrame />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "annuity", element: <AnnuityPage /> },
    ],
  },
];

const router = createHashRouter(routes);

export default router;

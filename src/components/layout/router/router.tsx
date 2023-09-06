import { createHashRouter } from "react-router-dom";

import AppFrame from "../AppFrame";
import HomePage from "../../pages/home/HomePage";
import AnnuityForecasterPage from "../../pages/annuityForecaster/AnnuityForecasterPage";
import AnnuityPVPage from "../../pages/annuityPV/AnnuityPVPage";
import AnnuityFVPage from "../../pages/annuityFV/AnnuityFVPage";

const routes = [
  {
    path: "*",
    element: <AppFrame />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "annuity-forecaster", element: <AnnuityForecasterPage /> },
      { path: "annuity-present-value", element: <AnnuityPVPage /> },
      { path: "annuity-future-value", element: <AnnuityFVPage /> },
    ],
  },
];

const router = createHashRouter(routes);

export default router;

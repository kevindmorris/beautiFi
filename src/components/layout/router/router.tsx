import { createHashRouter } from "react-router-dom";

import HomePage from "../../pages/home/HomePage";
import AppFrame from "../AppFrame";
import AnnuityForecastPage from "../../pages/annuity/AnnuityForecastPage";
import AnnuityValuesPage from "../../pages/annuityValues/AnnuityValuesPage";

const routes = [
  {
    path: "*",
    element: <AppFrame />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "annuity-forecast", element: <AnnuityForecastPage /> },
      { path: "annuity-values", element: <AnnuityValuesPage /> },
    ],
  },
];

const router = createHashRouter(routes);

export default router;

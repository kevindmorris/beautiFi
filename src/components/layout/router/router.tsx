import { createHashRouter } from "react-router-dom";

import AppFrame from "../AppFrame";
import HomePage from "../../pages/home/HomePage";
import AnnuityForecasterPage from "../../pages/annuityForecaster/AnnuityForecasterPage";
import AnnuityPVPage from "../../pages/annuityPV/AnnuityPVPage";
import AnnuityFVPage from "../../pages/annuityFV/AnnuityFVPage";
import LoanForecasterPage from "../../pages/loanForecaster/LoanForecasterPage";
import LoanMonthlyPaymentPage from "../../pages/loanMonthlyPayment/LoanMonthlyPaymentPage";
import LoanTermPage from "../../pages/loanTerm/LoanTermPage";

const routes = [
  {
    path: "*",
    element: <AppFrame />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "annuity-forecaster", element: <AnnuityForecasterPage /> },
      { path: "annuity-present-value", element: <AnnuityPVPage /> },
      { path: "annuity-future-value", element: <AnnuityFVPage /> },
      { path: "loan-forecaster", element: <LoanForecasterPage /> },
      { path: "loan-monthly-payment", element: <LoanMonthlyPaymentPage /> },
      { path: "loan-term", element: <LoanTermPage /> },
    ],
  },
];

const router = createHashRouter(routes);

export default router;

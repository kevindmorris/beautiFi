import { createBrowserRouter } from "react-router-dom";

import HomePage from "../../pages/home/HomePage";
import AppFrame from "../AppFrame";

const routes = [
  {
    path: "*",
    element: <AppFrame />,
    children: [{ path: "*", element: <HomePage /> }],
  },
];

const router = createBrowserRouter(routes);

export default router;

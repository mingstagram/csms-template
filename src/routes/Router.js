import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../pages/Dashboard.js"));
const About = lazy(() => import("../pages/About.js"));
const Alerts = lazy(() => import("../pages/ui/Alerts.js"));
const Badges = lazy(() => import("../pages/ui/Badges.js"));
const Buttons = lazy(() => import("../pages/ui/Buttons.js"));
const Cards = lazy(() => import("../pages/ui/Cards.js"));
const Grid = lazy(() => import("../pages/ui/Grid.js"));
const Tables = lazy(() => import("../pages/ui/Tables.js"));
const Forms = lazy(() => import("../pages/ui/Forms.js"));
const Breadcrumbs = lazy(() => import("../pages/ui/Breadcrumbs.js"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],
  },
];

export default ThemeRoutes;

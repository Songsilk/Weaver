import { createBrowserRouter } from "react-router-dom";
import Login from "./login.jsx";
import Home from "./Home.jsx";
import NotReady from "./Not_ready_page.jsx";
import Register from "./register.jsx";
import Profiles from "./profiles.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Not_ready",
    element: <NotReady />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profiles",
    element: <Profiles />,
  },
  {
  path: "/profiles",
  element: <Profiles />
  },
]);
import { createBrowserRouter } from "react-router-dom";
import Login from "./BasePages/login.jsx";
import Home from "./BasePages/Home.jsx";
import NotReady from "./BasePages/Not_ready_page.jsx";
import Register from "./BasePages/register.jsx";
import Profiles from "./UserPages/PersonalPage.jsx";

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
    path: "/personalPage",
    element: <Profiles />,
  },
]);
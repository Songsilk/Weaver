import { createBrowserRouter } from "react-router-dom";
import Login from "./login.jsx";
import Home from "./Home.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
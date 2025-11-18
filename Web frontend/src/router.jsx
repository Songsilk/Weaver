import { createBrowserRouter } from "react-router-dom";
import Login from "./login.jsx";
import App from "./App.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
import { createBrowserRouter } from "react-router-dom";
import Login from "./login.jsx";
import App from "./App.jsx";
import Register from "./register.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",     // <-- Nueva ruta
    element: <Register />, // <-- Página que quieres mostrar
  },
]);
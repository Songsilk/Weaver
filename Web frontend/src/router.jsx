import { createBrowserRouter } from "react-router-dom";
import Login from "./login.jsx";
<<<<<<< Updated upstream
import App from "./App.jsx";
import Register from "./register.jsx";
import Profiles from "./profiles";
=======
import Home from "./Home.jsx";
import NotReady from "./Not_ready_page.jsx";
import Register from "./Register.jsx";
import Profiles from "./profiles.jsx";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    path: "/register",     // <-- Nueva ruta
    element: <Register />, // <-- Página que quieres mostrar
=======
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
>>>>>>> Stashed changes
  },
  {
  path: "/profiles",
  element: <Profiles />
  },
]);
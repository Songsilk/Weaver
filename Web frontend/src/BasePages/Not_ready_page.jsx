import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Not_ready_page.css";
import hornetConstruction from "./assets/hornet-construction.png";

/**
 * Module-level flag: persiste mientras el módulo esté cargado.
 * Si la app usa HMR en desarrollo, este valor puede resetearse dependiendo de la configuración de HMR.
 */
let __NotReady_mounted = false;

function NotReady() {
  const navigate = useNavigate();

  useEffect(() => {
    // Si ya hay una instancia montada, redirigimos (o devolvemos null)
    if (__NotReady_mounted) {
      // opcional: redirige a home en vez de renderizar
      navigate("/");
      return;
    }

    // marcar como montado
    __NotReady_mounted = true;

    // al desmontar, limpiar la bandera
    return () => {
      __NotReady_mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ejecutar solo on mount

  // Si por alguna razón la bandera está a true al entrar, podemos devolver null
  if (__NotReady_mounted) {
    return null;
  }

  const handleGoHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="not-ready-page min-h-screen text-slate-50">
      <div className="not-ready-overlay">
        <div className="not-ready-card">
          <div className="not-ready-content">
            <h1 className="not-ready-title">
              This part is not finished yet,
              <br />
              <span className="not-ready-highlight">
                thank you for your understanding &lt;3
              </span>
            </h1>

            <button
              className="not-ready-button"
              onClick={handleGoHome}
            >
              ⟵ Volver a Home
            </button>
          </div>

          <div className="not-ready-image-wrapper">
            <img
              src={hornetConstruction}
              alt="Hornet under construction"
              className="not-ready-image"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotReady;

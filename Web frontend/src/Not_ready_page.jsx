import React from "react";
import { useNavigate } from "react-router-dom";
import "./Not_ready_page.css";
import hornetConstruction from "./assets/hornet-construction.png";

function NotReady() {
  const navigate = useNavigate();

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

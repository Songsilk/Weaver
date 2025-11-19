import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import logoWeaver from "./assets/WEAVER_logo.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page min-h-screen text-slate-50">
      {/* NAVBAR */}
      <header className="home-navbar">
        <div className="home-navbar-inner">
          <div className="home-navbar-left">
            <button
              className="home-logo-button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img
                src={logoWeaver}
                alt="Weaver logo"
                className="home-logo-icon"
                draggable="false"
              />
              <span className="home-logo-text">Weaver</span>
            </button>
          </div>

          <nav className="home-nav-links">
            <button
              className="home-nav-link"
              onClick={() =>
                document
                  .getElementById("about-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              About us
            </button>
            <button
              className="home-nav-link"
              onClick={() =>
                document
                  .getElementById("learn-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn
            </button>
            <button
              className="home-nav-link"
              onClick={() =>
                document
                  .getElementById("content-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              My content
            </button>

            <div className="home-search-wrapper">
              <input
                type="text"
                placeholder="Search threads..."
                className="home-search-input"
              />
              <button className="home-search-button">search</button>
            </div>
          </nav>

          <div className="home-nav-right">
            <button
              className="home-auth-button"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
            <button className="home-auth-button home-auth-secondary">
              SIGN UP
            </button>
          </div>
        </div>
      </header>

      <main className="home-main">
        {/* HERO / BIENVENIDA */}
        <section className="home-section hero-section" id="hero-section">
          <div className="home-hero-inner">
            <div className="home-hero-text">
              <h1 className="home-hero-title">
                Welcome to <span className="home-hero-highlight">Weaver</span>
              </h1>
              <p className="home-hero-subtitle">
                Una red donde tus ideas, proyectos y contactos se entrelazan
                como hilos en un telar vivo.
              </p>
              <div className="home-hero-actions">
                <button
                  className="home-primary-button"
                  onClick={() => navigate("/login")}
                >
                  Entrar al telar
                </button>
                <button
                  className="home-secondary-button"
                  onClick={() =>
                    document
                      .getElementById("about-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Ver cómo funciona
                </button>
              </div>
            </div>

            <div className="home-hero-visual">
              <div className="home-hero-orbit">
                <div className="home-hero-circle">
                  <img
                    src={logoWeaver}
                    alt="Weaver logo"
                    className="home-hero-logo"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 2 – ¿QUÉ ES WEAVER? */}
        <section
          className="home-section about-section"
          id="about-section"
        >
          <div className="home-section-header">
            <h2 className="home-section-title">Weaver</h2>
            <p className="home-section-subtitle">
              Un espacio para mostrar y conectar tus proyectos digitales como si
              fueran hilos de una misma tela.
            </p>
          </div>

          <div className="home-about-grid">
            <div className="home-about-image-card glass-card">
              <p className="home-about-image-caption">
                Tu universo creativo, en una sola página.
              </p>
            </div>

            <div className="home-about-cards">
              <article className="home-info-card glass-card">
                <h3 className="home-info-title">Project description</h3>
                <p className="home-info-text">
                  Weaver organiza tus proyectos, logros y contenidos en una
                  interfaz visual que se siente como un telar interactivo,
                  donde cada hilo es una historia que quieres compartir.
                </p>
              </article>

              <article className="home-info-card glass-card" id="learn-section">
                <h3 className="home-info-title">
                  How does the project work?
                </h3>
                <p className="home-info-text">
                  Cada usuario teje su propia &quot;web&quot; de contenido:
                  tarjetas, enlaces, recursos y referencias que otros pueden
                  explorar, seguir y apoyar.
                </p>
              </article>

              <article
                className="home-info-card glass-card"
                id="content-section"
              >
                <h3 className="home-info-title">Examples of pages</h3>
                <p className="home-info-text">
                  Portafolios, rutas de estudio, colecciones de recursos,
                  proyectos de investigación, emprendimientos y cualquier idea
                  que merezca su propio hilo dentro del telar.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* SECCIÓN 3 – ÚNETE / APOYA + FOOTER */}
        <section className="home-section join-section" id="join-section">
          <div className="home-join-grid">
            <div className="glass-card home-join-card">
              <h3 className="home-join-title">
                Be part of Weaver and / or support us
              </h3>
              <p className="home-join-text">
                Ayúdanos a construir un espacio donde las personas puedan
                mostrar lo que crean, aprender de otros y tejer conexiones
                significativas. Weaver está pensado para estudiantes,
                creadores, developers y cualquier persona con algo que contar.
              </p>
              <div className="home-join-actions">
                <button className="home-primary-button home-join-button">
                  Comenzar a tejer
                </button>
                <button className="home-secondary-button home-join-button">
                  Ver cómo puedes apoyar
                </button>
              </div>
            </div>

            <div className="home-join-image glass-card">
              <p className="home-join-image-placeholder">
                Aquí puedes colocar una ilustración (ej. Hornet / arte del
                proyecto).
              </p>
            </div>
          </div>

          <footer className="home-footer">
            <div className="home-footer-inner">
              <div className="home-footer-left">
                <img
                  src={logoWeaver}
                  alt="Weaver logo small"
                  className="home-footer-logo"
                  draggable="false"
                />
                <span className="home-footer-brand">Weaver</span>
              </div>
              <p className="home-footer-text">
                Contact section, creators and social networks · Tejido con
                cuidado para reunir tus hilos digitales.
              </p>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default Home;

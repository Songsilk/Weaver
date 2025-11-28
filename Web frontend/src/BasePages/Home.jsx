import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import logoWeaver from "./assets/WEAVER_logo.png";
import sitingHornet from "./assets/siting-hornet.gif";
import cinemaHornet from "./assets/hornet-cinema.png";
import payasoKnight from "./assets/payaso-knight.png";
import shaw from "./assets/shaw-hornet.png";
import cilantroHornet from "./assets/cilantro-hornet.png";
import { useAuth } from "./AuthContext";

function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const slides = [
    {
      id: 1,
      title: "Portfolio de desarrollador",
      description:
        "Un telar que muestra proyectos, repositorios y logros técnicos de forma visual.",
      image: cinemaHornet,
    },
    {
      id: 2,
      title: "Ruta de estudio",
      description:
        "Colección de recursos, cursos y notas organizadas como hilos de aprendizaje.",
      image: shaw,
    },
    {
      id: 3,
      title: "Proyecto colaborativo",
      description:
        "Una página que conecta a varios creadores alrededor de un mismo proyecto.",
      image: cilantroHornet,
    },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Altura del navbar sticky (ajusta si cambia)
    const NAVBAR_OFFSET = 55;

    const y = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide cada 8 segundos
  useEffect(() => {
    const id = setInterval(next, 8000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = slides[index];

  return (
    <div className="home-page min-h-screen text-slate-50">
      {/* NAVBAR */}
      <header className="home-navbar">
        <div className="home-navbar-inner">
          <div className="home-navbar-left">
            <button
              className="home-logo-button"
              onClick={() =>
                document
                  .getElementById("hero-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
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
              onClick={() => scrollToSection("about-section")}
            >
              About us
            </button>
            <button
              className="home-nav-link"
              onClick={() => scrollToSection("examples-section")}
            >
              Examples
            </button>
            <button
              className="home-nav-link"
              onClick={() => scrollToSection("join-section")}
            >
              Contact
            </button>

            <button
              className="home-nav-link home-nav-link-MyContent"
              onClick={() =>
                user ? navigate("/personalPage") : navigate("/login")
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
              <button
                className="home-search-button"
                onClick={() => navigate("/Not_ready")}
              >
                search
              </button>
            </div>
          </nav>

          <div className="home-nav-right">
            {user ? (
              <div className="home-user-pill"
                onClick={(logout)}
              >
                <img
                  src={user.avatar_url || logoWeaver}
                  alt="User avatar"
                  className="home-user-avatar"
                  draggable="false"
                />
                <div className="home-user-text">
                  <span className="home-user-name">
                    {user.username || "Weaver"}
                  </span>
                  <span className="home-user-email">
                    {user.email || ""}
                  </span>
                </div>
              </div>
            ) : (
              <>
                <button
                  className="home-auth-button"
                  onClick={() => navigate("/login")}
                >
                  LOGIN
                </button>
                <button
                  className="home-auth-button home-auth-secondary"
                  onClick={() => navigate("/Register")}
                >
                  SIGN UP
                </button>
              </>
            )}
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
                A network where your ideas, projects and contacts intertwine like threads on a living loom.
              </p>
              <div className="home-hero-actions">
                <button
                  className="home-primary-button"
                  onClick={() =>
                    user ? navigate("/personalPage") : navigate("/login")
                  }
                >
                  Enter to Weaver
                </button>
                <button
                  className="home-secondary-button"
                  onClick={() => scrollToSection("about-section")}
                >
                  See how it works
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
              A network where your ideas, projects and contacts intertwine like threads on a living loom.
            </p>
          </div>

          <div className="home-about-grid">
            <div className="home-about-image-card glass-card">
              <img
                src={sitingHornet}
                alt="Siting Hornet illustration"
                className="home-about-image-card-icon"
                draggable="false"
              />
            </div>

            <div className="home-about-cards">
              <article className="home-info-card glass-card">
                <h3 className="home-info-title">Project description</h3>
                <p className="home-info-text">
                  Weaver organizes your projects, achievements, and content in a visual interface that resembles an interactive loom, where each thread is a story you want to share.
                  <br></br><br></br>
                  Here you'll find a comfortable and agile space to connect with your contacts or give a professional personal presentation, all customizable to your liking, letting your imagination run wild, and tailored to your preferences.
                </p>
              </article>

              <article className="home-info-card glass-card" id="learn-section">
                <h3 className="home-info-title">
                  How does the project work?
                </h3>
                <p className="home-info-text">
                  Each user weaves their own content &quot;web&quot; cards, links, resources, and references that others can explore, follow, and support, with multiple quick and easy-to-use customization tools.
                  <br></br><br></br>
                  You can always count on having the necessary spaces to connect with others in any way you want, whether for friends, the office, studies, or wherever your imagination takes you.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* SECCIÓN 3 – CARRUSEL EJEMPLOS DE PAGINAS */}
        <section className="home-section examples-section" id="examples-section">
          <div className="home-examples-grid">
            <div className="glass-card home-examples-card">
              <h3 className="home-examples-title">
                {current.title}
              </h3>
              <p className="home-examples-text">
                {current.description}
              </p>
            </div>

            <div className="home-examples-image glass-card">
              <img
                src={current.image}
                alt={current.title}
                className="home-examples-image-placeholder"
                draggable="false"
              />
            </div>
            {/* Controles izquierda/derecha */}
            <button
              type="button"
              className="home-carousel-arrow home-carousel-arrow-left"
              onClick={prev}
            >
              ‹
            </button>
            <button
              type="button"
              className="home-carousel-arrow home-carousel-arrow-right"
              onClick={next}
            >
              ›
            </button>
          </div>
        </section>

        {/* SECCIÓN 4 – ÚNETE / APOYA + FOOTER */}
        <section className="home-section join-section" id="join-section">
          <div className="home-join-grid">
            <div className="home-join-image glass-card">
              <img
                src={payasoKnight}
                alt="payaso hollow knight illustration"
                className="home-join-image-placeholder"
                draggable="false"
              />
            </div>

            <div className="glass-card home-join-card">
              <h3 className="home-join-title">
                Be part of Weaver and / or support us
              </h3>
              <p className="home-join-text">
                Help us build a vibrant space where people can showcase their creations and forge meaningful connections. Weaver is designed for anyone with a story to tell and desire to find friends.
                <br></br><br></br>
                With your support, we want to turn Weaver into a living ecosystem: a place where people meet, rediscover friendships, collaborate whit each other, and share themselves.
                <br></br><br></br>
                By backing this project, you’re not just supporting a platform — you’re helping create a home for people and comunities. If you believe that more people deserve a space to share their work and connect through what they create, we’d love to have you with us on this journey.
              </p>
              <div className="home-join-actions">
                <button
                  className="home-primary-button home-join-button"
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "instant", // o "smooth" si quieres animación
                    });
                    user ? navigate("/personalPage") : navigate("/Register");
                  }}
                >
                  Start knitting
                </button>
                <button
                  className="home-secondary-button home-join-button"
                  onClick={() => navigate("/Not_ready")}
                >
                  See how you can support us
                </button>
              </div>
            </div>
          </div>

          <footer className="home-footer">
            <div className="home-footer-inner-top">
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
                Woven with care to bring people together.
              </p>
            </div>
            <div className="home-footer-inner-bottom">
              <p className="home-footer-text">
                Camilo Londono Moreno  -  calondonom@unal.edu.co
                <br></br>
                Camilo Trujillo Garzon  -  catrujillog@unal.edu.co
                <br></br>
                Cristian Camilo Garcia Palacios  -  crgarciapa@unal.edu.co
                <br></br>
                Juan Esteban Ruiz Guasca  -  jruizgu@unal.edu.co
                <br></br>
                Manuel Felipe Espinosa Espanol  -  mespinosae@unal.edu.co
              </p>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default Home;

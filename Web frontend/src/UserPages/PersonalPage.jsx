import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { useNavigate } from "react-router-dom";

import "./PersonalPage.css";
import Logo from "./assets/WEAVER_logo.png";

const PROFILE_PLACEHOLDER = "https://via.placeholder.com/64";

const FIELD_TYPES = {
  TEXT: "Text field",
  IMAGE: "Image field",
  LINK: "Link field",
  PHONE: "Phone number",
};

export default function ProfileEditor() {
  const [fields, setFields] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  const navigate = useNavigate();

  function addField(type) {
    const id = Date.now();
    const newField = {
      id,
      type,
      x: 40 + (fields.length * 16) % 200,
      y: 40 + (fields.length * 16) % 200,
      width: 260,
      height: 90,
      content:
        type === FIELD_TYPES.TEXT
          ? "Edit me"
          : type === FIELD_TYPES.IMAGE
            ? PROFILE_PLACEHOLDER
            : type === FIELD_TYPES.LINK
              ? "https://example.com"
              : "+57 300 000 0000",
    };
    setFields((prev) => [...prev, newField]);
    setSelectedId(id);
  }

  function updateField(id, patch) {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  }

  function removeField(id) {
    setFields((prev) => prev.filter((f) => f.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function moveFieldUp(id) {
    setFields((prev) => {
      const idx = prev.findIndex((f) => f.id === id);
      if (idx <= 0) return prev;
      const copy = [...prev];
      [copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
      return copy;
    });
  }

  function saveToFile() {
    const dataStr = JSON.stringify(fields, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "profiles.json";
    link.click();

    URL.revokeObjectURL(url);
  }


  function moveFieldDown(id) {
    setFields((prev) => {
      const idx = prev.findIndex((f) => f.id === id);
      if (idx === -1 || idx >= prev.length - 1) return prev;
      const copy = [...prev];
      [copy[idx + 1], copy[idx]] = [copy[idx], copy[idx + 1]];
      return copy;
    });
  }

  return (
    <div className="profiles-page min-h-screen text-slate-50">
      {/* NAVBAR SUPERIOR – igual que Home, adaptada a profiles */}
      <header className="home-navbar profiles-navbar">
        <div className="home-navbar-inner">
          {/* IZQUIERDA: logo + nombre compañía */}
          <div className="home-navbar-left">
            <button
              type="button"
              className="home-logo-button"
              onClick={() => {
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img
                src={Logo}
                alt="Weaver logo"
                className="home-logo-icon"
                draggable="false"
              />
              <span className="home-logo-text">Weaver</span>
            </button>
          </div>

          {/* CENTRO: barra de búsqueda (mismos estilos que Home) */}
          <div className="profiles-navbar-center">
            <div className="home-search-wrapper profiles-search-wrapper">
              <input
                type="text"
                placeholder="Search..."
                className="home-search-input"
              />
              <button className="home-search-button">search</button>
            </div>
          </div>

          {/* DERECHA: avatar + nombre de perfil */}
          <div className="profiles-navbar-right">
            <div className="profiles-profile-info">
              <img
                src={PROFILE_PLACEHOLDER}
                alt="Profile avatar"
                className="profiles-profile-avatar"
                draggable="false"
              />
              <div className="profiles-profile-text">
                <span className="profiles-profile-name">Profile name</span>
                <span className="profiles-profile-tag">@username</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="profiles-main">
        {/* Panel izquierdo */}
        <aside className="profiles-panel profiles-sidebar">
          <button
            type="button"
            onClick={() => setShowTemplateMenu((v) => !v)}
            className="profiles-panel-button profiles-panel-button-primary"
          >
            Use a template
          </button>

          {showTemplateMenu && (
            <div className="profiles-template-box">
              <p className="text-xs text-slate-500">
                Template menu (coming soon). Here you&apos;ll be able to pick
                predefined layouts.
              </p>
            </div>
          )}

          <div className="mt-4">
            <h4 className="profiles-section-title">Add fields</h4>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => addField(FIELD_TYPES.TEXT)}
                className="profiles-panel-button"
              >
                Text field
              </button>
              <button
                type="button"
                onClick={() => addField(FIELD_TYPES.IMAGE)}
                className="profiles-panel-button"
              >
                Image field
              </button>
              <button
                type="button"
                onClick={() => addField(FIELD_TYPES.LINK)}
                className="profiles-panel-button"
              >
                Link field
              </button>
              <button
                type="button"
                onClick={() => addField(FIELD_TYPES.PHONE)}
                className="profiles-panel-button"
              >
                Phone number
              </button>
            </div>
          </div>

          <div className="mt-auto pt-6">
            <button
              type="button"
              className="profiles-panel-button profiles-panel-button-ghost w-full"
            >
              Change background
            </button>
          </div>
        </aside>

        {/* Zona central de edición */}
        <section className="profiles-shell">
          <div className="profiles-shell-inner">
            <header className="profiles-shell-header">
              <h2 className="profiles-shell-title">Page editor</h2>
              <p className="profiles-shell-subtitle">
                Drag, resize and edit fields inside the canvas. This represents
                how your public page will look.
              </p>
            </header>

            <div className="profiles-canvas-wrapper">
              <div className="profiles-canvas" id="profiles-canvas">
                <p className="profiles-editor-hint">
                  Editor area — drag and resize items. Fields are constrained to
                  this box.
                </p>

                {fields.map((field) => (
                  <Rnd
                    key={field.id}
                    size={{ width: field.width, height: field.height }}
                    position={{ x: field.x, y: field.y }}
                    bounds="parent"
                    onDragStop={(e, d) =>
                      updateField(field.id, { x: d.x, y: d.y })
                    }
                    onResizeStop={(e, direction, ref, delta, position) => {
                      updateField(field.id, {
                        width: parseInt(ref.style.width, 10),
                        height: parseInt(ref.style.height, 10),
                        x: position.x,
                        y: position.y,
                      });
                    }}
                    onMouseDown={() => setSelectedId(field.id)}
                    className={`profiles-field ${selectedId === field.id
                      ? "profiles-field-selected"
                      : ""
                      }`}
                    style={{
                      zIndex: selectedId === field.id ? 40 : 10,
                    }}
                  >
                    <div className="profiles-field-inner">
                      <div className="profiles-field-header">
                        <span className="profiles-field-type">
                          {field.type}
                        </span>
                        <div className="profiles-field-actions">
                          <button
                            type="button"
                            onClick={() => moveFieldUp(field.id)}
                            title="Move up"
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() => moveFieldDown(field.id)}
                            title="Move down"
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            onClick={() => removeField(field.id)}
                            title="Remove"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      <div className="profiles-field-body">
                        {field.type === FIELD_TYPES.TEXT && (
                          <textarea
                            className="profiles-field-input profiles-field-textarea"
                            value={field.content}
                            onChange={(e) =>
                              updateField(field.id, {
                                content: e.target.value,
                              })
                            }
                          />
                        )}

                        {field.type === FIELD_TYPES.IMAGE && (
                          <img
                            src={field.content}
                            alt="field"
                            className="profiles-field-image"
                          />
                        )}

                        {field.type === FIELD_TYPES.LINK && (
                          <input
                            className="profiles-field-input"
                            value={field.content}
                            onChange={(e) =>
                              updateField(field.id, {
                                content: e.target.value,
                              })
                            }
                          />
                        )}

                        {field.type === FIELD_TYPES.PHONE && (
                          <input
                            className="profiles-field-input"
                            value={field.content}
                            onChange={(e) =>
                              updateField(field.id, {
                                content: e.target.value,
                              })
                            }
                          />
                        )}
                      </div>
                    </div>
                  </Rnd>
                ))}

                {fields.length === 0 && (
                  <div className="profiles-empty">
                    No fields yet — use the left menu to add Text, Image, Link
                    or Phone fields.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Panel derecho / Help */}
        <aside className="profiles-panel profiles-help">
          <div>
            <h3 className="profiles-section-title mb-1">Help</h3>
            <p className="profiles-help-text">
              Need guidance? Use this editor to design how your profile web
              looks. Drag elements, edit their content and experiment with
              layouts.
            </p>

            <ul className="profiles-help-list">
              <li>Drag fields to reorder visually.</li>
              <li>Resize text boxes to fit longer descriptions.</li>
              <li>Use image fields for avatars, logos or banners.</li>
            </ul>
          </div>

          <div className="profiles-help-actions">
            <button
              type="button"
              onClick={saveToFile}
              className="profiles-save-button"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => console.log("publishing...", fields)}
              className="profiles-publish-button"
            >
              Publish
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}

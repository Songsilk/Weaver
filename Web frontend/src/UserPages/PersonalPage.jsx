// src/UserPages/PersonalPage.jsx
import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import { useNavigate } from "react-router-dom";

import "./PersonalPage.css"; // debe existir junto a este archivo
import Logo from "../assets/WEAVER_logo.png";

import getFieldComponent, { getFieldComponent as namedGet } from "./PageComponents/index.jsx";
import FieldEditorModal from "./PageComponents/ModalField.jsx";

const PROFILE_PLACEHOLDER = "https://via.placeholder.com/64";

const FIELD_TYPES = {
  TEXT: "Text field",
  IMAGE: "Image field",
  LINK: "Link field",
  PHONE: "Phone number",
};

export default function PersonalPage() {
  const navigate = useNavigate();

  const [fields, setFields] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState(null);

  // editor modal state
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(null);

  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(900);

  useEffect(() => {
    function updateWidth() {
      if (canvasRef.current) setCanvasWidth(canvasRef.current.clientWidth);
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  function updateField(id, patch) {
    setFields((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              ...patch,
              style: { ...(f.style || {}), ...(patch.style || {}) },
            }
          : f
      )
    );
  }

  function addField(type) {
    const id = Date.now();
    const padding = 32;
    const width = Math.max(300, (canvasWidth ? canvasWidth - padding : 600));
    const height = 90;
    const newField = {
      id,
      type,
      x: 0,
      y: 20 + fields.length * (height + 16),
      width,
      height,
      content:
        type === FIELD_TYPES.TEXT
          ? "Edit me"
          : type === FIELD_TYPES.IMAGE
            ? PROFILE_PLACEHOLDER
            : type === FIELD_TYPES.LINK
              ? "https://example.com"
              : "+57 300 000 0000",
      style: { bold: false, italic: false, size: 16 },
    };
    setFields((prev) => [...prev, newField]);
    setSelectedId(id);
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

  function moveFieldDown(id) {
    setFields((prev) => {
      const idx = prev.findIndex((f) => f.id === id);
      if (idx === -1 || idx >= prev.length - 1) return prev;
      const copy = [...prev];
      [copy[idx + 1], copy[idx]] = [copy[idx], copy[idx + 1]];
      return copy;
    });
  }

  function saveToDatabase() {
    const userId = 1; // Aquí debes obtener el ID real del usuario (por ejemplo, desde el estado o el contexto de autenticación)
    const API_BASE_URL = "http://localhost:8000"; // URL de tu API de FastAPI

    console.log("Guardando perfil...");

    // Agregar el timeout de 30 segundos (30000 milisegundos)
    const timeout = 30000;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    fetch(`${API_BASE_URL}/save-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        fields: fields, // Aquí pasas el estado de los campos (el diseño de la página)
      }),
      signal: controller.signal,  // Agregar el signal para abortar la solicitud si se excede el tiempo
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al guardar el perfil");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Profile saved successfully:", data);
        // Aquí puedes agregar lógica adicional si necesitas hacer algo con la respuesta
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.error("Error de conexión: Tiempo de espera agotado.");
          alert("Error de conexión: El servidor no respondió en el tiempo esperado.");
        } else {
          console.error("Error saving profile:", error);
          alert("Hubo un error al guardar el perfil. Por favor, intenta nuevamente.");
        }
      })
      .finally(() => {
        clearTimeout(timeoutId);  // Limpiar el timeout cuando la solicitud termina
      });
  }

  function openEditorForField(field) {
    setSelectedField(field);
    setEditorOpen(true);
  }

  function applyEditorSave(patch) {
    if (!selectedField) return;
    updateField(selectedField.id, { content: patch.content, style: patch.style });
    setEditorOpen(false);
    setSelectedField(null);
  }

  function onChangeBackground(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setBackgroundUrl(url);
  }
  const bgInputRef = useRef(null);

  return (
    <div className="profiles-page min-h-screen text-slate-50">
      <header className="home-navbar profiles-navbar">
        <div className="home-navbar-inner">
          <div className="home-navbar-left">
            <button
              type="button"
              className="home-logo-button"
              onClick={() => {
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img src={Logo} alt="Weaver logo" className="home-logo-icon" draggable="false" />
              <span className="home-logo-text">Weaver</span>
            </button>
          </div>

          <div className="profiles-navbar-center">
            <div className="home-search-wrapper profiles-search-wrapper">
              <input type="text" placeholder="Search..." className="home-search-input" />
              <button className="home-search-button">search</button>
            </div>
          </div>

          <div className="profiles-navbar-right">
            <div className="profiles-profile-info">
              <img src={PROFILE_PLACEHOLDER} alt="Profile avatar" className="profiles-profile-avatar" draggable="false" />
              <div className="profiles-profile-text">
                <span className="profiles-profile-name">Profile name</span>
                <span className="profiles-profile-tag">@username</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="profiles-main">
        <aside className="profiles-panel profiles-sidebar">
          <button type="button" onClick={() => setShowTemplateMenu((v) => !v)} className="profiles-panel-button profiles-panel-button-primary">
            Use a template
          </button>

          {showTemplateMenu && (
            <div className="profiles-template-box">
              <p className="text-xs text-slate-500">Template menu (coming soon).</p>
            </div>
          )}

          <div className="mt-4">
            <h4 className="profiles-section-title">Add fields</h4>
            <div className="flex flex-col gap-2">
              <button type="button" onClick={() => addField(FIELD_TYPES.TEXT)} className="profiles-panel-button">Text field</button>
              <button type="button" onClick={() => addField(FIELD_TYPES.IMAGE)} className="profiles-panel-button">Image field</button>
              <button type="button" onClick={() => addField(FIELD_TYPES.LINK)} className="profiles-panel-button">Link field</button>
              <button type="button" onClick={() => addField(FIELD_TYPES.PHONE)} className="profiles-panel-button">Phone number</button>
            </div>
          </div>

          <div className="mt-auto pt-6">
            <button type="button" className="profiles-panel-button profiles-panel-button-ghost w-full" onClick={() => bgInputRef.current?.click()}>Change background</button>
            <input ref={bgInputRef} type="file" accept="image/*" className="hidden" onChange={onChangeBackground} />
            <button type="button" className="profiles-panel-button profiles-panel-button-ghost w-full mt-2" onClick={() => setBackgroundUrl(null)}>Reset background</button>
          </div>
        </aside>

        <section className="profiles-shell">
          <div className="profiles-shell-inner">
            <header className="profiles-shell-header">
              <h2 className="profiles-shell-title">Page editor</h2>
              <p className="profiles-shell-subtitle">Drag, resize and edit fields inside the canvas.</p>
            </header>

            <div className="profiles-canvas-wrapper">
              <div className="profiles-canvas" ref={canvasRef} style={{ backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined }}>
                <p className="profiles-editor-hint">Editor area — drag and resize items. Double-click a field to edit.</p>

                {fields.length === 0 && <div className="profiles-empty">No fields yet — add fields from the left panel.</div>}

                {fields.map((field) => {
                  const FieldComponent = getFieldComponent(field.type);

                  return (
                    <Rnd
                      key={field.id}
                      size={{ width: field.width, height: field.height }}
                      position={{ x: field.x, y: field.y }}
                      bounds="parent"
                      onDragStop={(e, d) => updateField(field.id, { x: 0, y: d.y })}
                      enableResizing={{ top: true, bottom: true, left: false, right: false, topLeft: false, topRight: false, bottomLeft: false, bottomRight: false }}
                      minHeight={40}
                      maxHeight={800}
                      onResizeStop={(e, dir, ref, pos) => updateField(field.id, { width: parseInt(ref.style.width, 10), height: parseInt(ref.style.height, 10), x: 0, y: pos.y })}
                      onMouseDown={() => setSelectedId(field.id)}
                      onDoubleClick={() => openEditorForField(field)}
                      className={`profiles-field ${selectedId === field.id ? "profiles-field-selected" : ""}`}
                      style={{ zIndex: selectedId === field.id ? 40 : 10 }}
                    >
                      <div className="profiles-field-inner">
                        <div className="profiles-field-header">
                          <span className="profiles-field-type">{field.type}</span>
                          <div className="profiles-field-actions">
                            <button type="button" onClick={() => moveFieldUp(field.id)} title="Move up">↑</button>
                            <button type="button" onClick={() => moveFieldDown(field.id)} title="Move down">↓</button>
                            <button type="button" onClick={() => removeField(field.id)} title="Remove">✕</button>
                          </div>
                        </div>

                        <div className="profiles-field-body">
                          {FieldComponent ? (
                            <FieldComponent
                              field={field}
                              onEdit={() => openEditorForField(field)}
                              onChange={(patch) => updateField(field.id, { ...field, ...patch })}
                              className="w-full h-full"
                            />
                          ) : (
                            <div style={{ padding: 12, background: "#fff7e6", color: "#7a4b00" }}>
                              Componente no implementado: <strong>{field.type}</strong>
                            </div>
                          )}
                        </div>
                      </div>
                    </Rnd>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <aside className="profiles-panel profiles-help">
          <div>
            <h3 className="profiles-section-title mb-1">Help</h3>
            <p className="profiles-help-text">Double click a field to open the editor popup.</p>
          </div>

          <div className="profiles-help-actions">
            <button type="button" onClick={saveToDatabase} className="profiles-save-button">Save</button>
            <button type="button" onClick={() => console.log("publishing...", fields)} className="profiles-publish-button">Publish</button>
          </div>
        </aside>
      </main>

      <FieldEditorModal
        open={editorOpen}
        field={selectedField}
        onClose={() => { setEditorOpen(false); setSelectedField(null); }}
        onSave={(patch) => applyEditorSave(patch)}
      />
    </div>
  );
}

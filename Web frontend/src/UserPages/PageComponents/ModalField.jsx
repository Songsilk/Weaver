// src/UserPages/PageComponents/ModalField.jsx
import React, { useState, useEffect } from "react";
import "./ModalField.css";

export default function FieldEditorModal({ open, field, onSave, onClose }) {
  const [content, setContent] = useState("");
  const [label, setLabel] = useState(""); // para link label
  const [alt, setAlt] = useState(""); // para image alt
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [size, setSize] = useState(16);

  useEffect(() => {
    if (field) {
      setContent(field.content ?? "");
      setLabel(field.label ?? "");
      setAlt(field.alt ?? "");
      setBold(field.style?.bold ?? false);
      setItalic(field.style?.italic ?? false);
      setSize(field.style?.size ?? 16);
    } else {
      setContent("");
      setLabel("");
      setAlt("");
      setBold(false);
      setItalic(false);
      setSize(16);
    }
  }, [field]);

  if (!open) return null;

  const type = field?.type || "";

  const handleSave = () => {
    // generamos patch según tipo
    const patch = {};
    if (type === "Text field") {
      patch.content = content;
      patch.style = { bold, italic, size };
    } else if (type === "Image field") {
      patch.content = content; // URL
      patch.alt = alt;
    } else if (type === "Link field") {
      patch.content = content; // URL
      patch.label = label;
    } else if (type === "Phone number") {
      patch.content = content; // tel
    } else if (type === "Email") {
      patch.content = content;
    } else {
      patch.content = content;
    }
    onSave(patch);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box" role="dialog" aria-modal="true">
        <button className="modal-close" aria-label="Close" onClick={onClose}>✕</button>

        <h3 style={{ marginTop: 0 }}>
          {type === "Text field" ? "Edit text" :
           type === "Image field" ? "Edit image" :
           type === "Link field" ? "Edit link" :
           type === "Phone number" ? "Edit phone" :
           type === "Email" ? "Edit email" : "Edit field"}
        </h3>

        {type === "Text field" && (
          <>
            <textarea className="modal-textarea" value={content} onChange={(e) => setContent(e.target.value)} />
            <div className="modal-controls">
              <button type="button" className={bold ? "active" : ""} onClick={() => setBold((v) => !v)}>B</button>
              <button type="button" className={italic ? "active" : ""} onClick={() => setItalic((v) => !v)}>I</button>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                Size
                <select value={size} onChange={(e) => setSize(Number(e.target.value))}>
                  {[12, 14, 16, 18, 20, 24, 28, 32].map((s) => (
                    <option value={s} key={s}>{s}px</option>
                  ))}
                </select>
              </label>
            </div>
          </>
        )}

        {type === "Image field" && (
          <>
            <label>Image URL</label>
            <input className="modal-textarea" value={content} onChange={(e) => setContent(e.target.value)} placeholder="https://..." />
            <label>Alt text</label>
            <input className="modal-textarea" value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Image description" />
          </>
        )}

        {type === "Link field" && (
          <>
            <label>URL</label>
            <input className="modal-textarea" value={content} onChange={(e) => setContent(e.target.value)} placeholder="https://..." />
            <label>Label (text to display)</label>
            <input className="modal-textarea" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="My website" />
          </>
        )}

        {(type === "Phone number" || type === "Email") && (
          <>
            <label>{type === "Phone number" ? "Phone" : "Email"}</label>
            <input className="modal-textarea" value={content} onChange={(e) => setContent(e.target.value)} placeholder={type === "Phone number" ? "+57 300 000 0000" : "name@example.com"} />
          </>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
          <button className="modal-cancel" onClick={onClose}>Cancel</button>
          <button className="modal-save" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

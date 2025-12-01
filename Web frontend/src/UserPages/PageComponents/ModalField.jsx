// src/UserPages/PageComponents/ModalField.jsx
import React, { useState, useEffect } from "react";
import "./ModalField.css";

/**
 * ModalField: editor modal for a single field (text).
 * Props:
 *  - open: boolean
 *  - field: object (the field to edit)
 *  - onSave: function({ content, style })
 *  - onClose: function()
 */
export default function FieldEditorModal({ open, field, onSave, onClose }) {
  const [content, setContent] = useState("");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [size, setSize] = useState(16);

  useEffect(() => {
    if (field) {
      setContent(field.content ?? "");
      setBold(field.style?.bold ?? false);
      setItalic(field.style?.italic ?? false);
      setSize(field.style?.size ?? 16);
    } else {
      setContent("");
      setBold(false);
      setItalic(false);
      setSize(16);
    }
  }, [field]);

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box" role="dialog" aria-modal="true">
        <button className="modal-close" aria-label="Close" onClick={onClose}>✕</button>

        <h3 style={{ marginTop: 0 }}>Edit text</h3>

        <textarea
          className="modal-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="modal-controls">
          <button
            type="button"
            className={bold ? "active" : ""}
            onClick={() => setBold((v) => !v)}
            aria-pressed={bold}
            title="Bold"
          >
            B
          </button>

          <button
            type="button"
            className={italic ? "active" : ""}
            onClick={() => setItalic((v) => !v)}
            aria-pressed={italic}
            title="Italic"
          >
            I
          </button>

          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            Size
            <select value={size} onChange={(e) => setSize(Number(e.target.value))}>
              {[12, 14, 16, 18, 20, 24, 28, 32].map((s) => (
                <option value={s} key={s}>{s}px</option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button className="modal-cancel" onClick={onClose}>Cancel</button>
          <button
            className="modal-save"
            onClick={() => onSave({ content, style: { bold, italic, size } })}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

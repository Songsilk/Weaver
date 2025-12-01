// src/UserPages/PageComponents/TextField.jsx
import React from "react";

/**
 * Presentational text field.
 * - only displays the field content according to field.style
 * - doesn't contain edit controls (those live in the modal)
 * Props:
 *  - field: { content, style: { bold, italic, size } }
 *  - className, style, onEdit (optional)
 */
export default function FieldText({ field = {}, className = "", style = {}, onEdit }) {
  const content = field.content ?? "";

  const computedStyle = {
    padding: "6px 8px",
    width: "100%",
    height: "100%",
    whiteSpace: "pre-wrap",
    color: "#111", // dark text so it is visible on light backgrounds
    background: "transparent",
    fontWeight: field.style?.bold ? "700" : "400",
    fontStyle: field.style?.italic ? "italic" : "normal",
    fontSize: (field.style?.size || 16) + "px",
    boxSizing: "border-box",
    ...style,
  };

  return (
    <div
      role={onEdit ? "button" : undefined}
      tabIndex={onEdit ? 0 : -1}
      onDoubleClick={() => onEdit?.()}
      onKeyDown={(e) => { if (e.key === "Enter" && onEdit) onEdit(); }}
      className={className}
      style={computedStyle}
    >
      {content}
    </div>
  );
}

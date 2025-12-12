import React from "react";

export default function FieldLink({ field = {}, className = "", style = {} }) {
  const url = field.content || "https://example.com";
  const label = field.label || url;
  return (
    <div className={className} style={{ padding: 6, ...style }}>
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", textDecoration: "underline" }}>
        {label}
      </a>
    </div>
  );
}

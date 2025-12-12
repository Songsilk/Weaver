import React from "react";

export default function FieldImage({ field = {}, className = "", style = {} }) {
  const src = field.content || "https://via.placeholder.com/600x200?text=Image";
  return (
    <div className={className} style={{ width: "100%", height: "100%", ...style }}>
      <img
        src={src}
        alt={field.alt || "field-image"}
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
      />
    </div>
  );
}

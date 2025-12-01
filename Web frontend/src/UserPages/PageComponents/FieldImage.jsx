import React from "react";
export default function FieldImage({ field = {} }) {
  const src = field.content || "https://via.placeholder.com/300x120?text=Image";
  return <img src={src} alt="field" style={{ width: "100%", height: "100%", objectFit: "contain" }} />;
}

import React from "react";

export default function FieldPhone({ field = {}, className = "", style = {} }) {
  const phone = field.content || "+57 300 000 0000";
  return (
    <div className={className} style={{ padding: 6, ...style }}>
      <a href={`tel:${phone}`} style={{ color: "#111", textDecoration: "none" }}>
        {phone}
      </a>
    </div>
  );
}

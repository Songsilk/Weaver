import React from "react";

export default function FieldEmail({ field = {}, className = "", style = {} }) {
  const email = field.content || "name@example.com";
  return (
    <div className={className} style={{ padding: 6, ...style }}>
      <a href={`mailto:${email}`} style={{ color: "#111", textDecoration: "none" }}>
        {email}
      </a>
    </div>
  );
}

import React from "react";
export default function FieldLink({ field = {} }) {
  const url = field.content || "https://example.com";
  return <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>;
}

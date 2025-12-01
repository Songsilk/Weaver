import React from "react";
export default function FieldPhone({ field = {} }) {
  return <div>{field.content || "+57 300 000 0000"}</div>;
}

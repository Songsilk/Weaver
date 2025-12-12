// src/UserPages/PageComponents/index.jsx
import FieldText from "./TextField.jsx";
import FieldImage from "./FieldImage.jsx";
import FieldLink from "./FieldLink.jsx";
import FieldPhone from "./FieldPhone.jsx";
import FieldEmail from "./FieldEmail.jsx"; // opcional, si pegaste el archivo

const COMPONENT_MAP = {
  "Text field": FieldText,
  "Image field": FieldImage,
  "Link field": FieldLink,
  "Phone number": FieldPhone,
  "Email": FieldEmail, // opcional - name exacta si la usas
  // tolerancia
  TEXT: FieldText,
  IMAGE: FieldImage,
  LINK: FieldLink,
  PHONE: FieldPhone,
  EMAIL: FieldEmail,
};

export function getFieldComponent(type) {
  if (!type && type !== 0) return null;
  const t = String(type);
  return COMPONENT_MAP[t] || COMPONENT_MAP[t.trim()] || null;
}

export { FieldText, FieldImage, FieldLink, FieldPhone, FieldEmail };
export default getFieldComponent;

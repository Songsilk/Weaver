// src/UserPages/PageComponents/index.jsx
import FieldText from "./TextField.jsx";
// stubs (si luego implementas, descomenta e importa)
import FieldImage from "./FieldImage.jsx";
import FieldLink from "./FieldLink.jsx";
import FieldPhone from "./FieldPhone.jsx";

/**
 * Simple mapping. Keys must match exactly the strings used in PersonalPage FIELD_TYPES.
 * If unimplemented, map value is null and PersonalPage will show a placeholder.
 */
const COMPONENT_MAP = {
  "Text field": FieldText,
  "Image field": null,
  "Link field": null,
  "Phone number": null,

  // alternative keys (tolerance)
  TEXT: FieldText,
  IMAGE: null,
  LINK: null,
  PHONE: null,
};

export function getFieldComponent(type) {
  if (!type && type !== 0) return null;
  const t = String(type);
  return COMPONENT_MAP[t] || COMPONENT_MAP[t.trim()] || null;
}

export { FieldText };
export default getFieldComponent;

// Turns the form values for each QR type into the string that gets encoded.
const escapeWifi = (s = "") => s.replace(/([\\;,:"])/g, "\\$1");

export function buildPayload(type, v) {
  switch (type) {
    case "text":
      return (v.text || "").trim();
    case "wifi": {
      if (!v.ssid) return "";
      const pass = v.encryption === "nopass" ? "" : `P:${escapeWifi(v.password)};`;
      return `WIFI:T:${v.encryption};S:${escapeWifi(v.ssid)};${pass};`;
    }
    case "email": {
      if (!v.to?.trim()) return "";
      const q = [];
      if (v.subject) q.push(`subject=${encodeURIComponent(v.subject)}`);
      if (v.body) q.push(`body=${encodeURIComponent(v.body)}`);
      return `mailto:${v.to.trim()}${q.length ? "?" + q.join("&") : ""}`;
    }
    case "phone": {
      const p = (v.phone || "").replace(/[^\d+]/g, "");
      return p ? `tel:${p}` : "";
    }
    default:
      return "";
  }
}

export const QR_TYPES = [
  { id: "text", label: "Text / URL" },
  { id: "wifi", label: "Wi-Fi" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
];
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { QR_TYPES } from "../utils/buildPayload";

export default function TypeTabs({ active, onChange }) {
  return (
    <ToggleButtonGroup
      exclusive
      fullWidth
      size="small"
      color="primary"
      value={active}
      onChange={(e, value) => value && onChange(value)}
      aria-label="QR code type"
    >
      {QR_TYPES.map((t) => (
        <ToggleButton key={t.id} value={t.id} sx={{ px: 1 }}>
          {t.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
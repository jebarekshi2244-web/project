import { Box, MenuItem, Slider, TextField, Typography } from "@mui/material";

const colorSx = { "& input": { height: 28, p: 0.75, cursor: "pointer" } };

export default function OptionsPanel({ options, onChange }) {
  const set = (name) => (e) => onChange({ ...options, [name]: e.target.value });

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
      <TextField
        label="Color"
        type="color"
        value={options.fg}
        onChange={set("fg")}
        slotProps={{ inputLabel: { shrink: true } }}
        sx={colorSx}
      />
      <TextField
        label="Background"
        type="color"
        value={options.bg}
        onChange={set("bg")}
        slotProps={{ inputLabel: { shrink: true } }}
        sx={colorSx}
      />
      <Box sx={{ px: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Size: {options.size}px
        </Typography>
        <Slider
          min={128}
          max={512}
          step={16}
          value={options.size}
          onChange={(e, v) => onChange({ ...options, size: v })}
          valueLabelDisplay="auto"
          aria-label="QR code size"
        />
      </Box>
      <TextField select label="Error correction" value={options.level} onChange={set("level")}>
        <MenuItem value="L">Low</MenuItem>
        <MenuItem value="M">Medium</MenuItem>
        <MenuItem value="Q">Quartile</MenuItem>
        <MenuItem value="H">High</MenuItem>
      </TextField>
    </Box>
  );
}
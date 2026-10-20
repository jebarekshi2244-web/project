import { Paper, Typography } from "@mui/material";

// Shared white card used by every page.
export default function PageCard({ title, subtitle, children }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 4 },
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 14px 40px rgba(133, 22, 126, 0.16)",
      }}
    >
      <Typography variant="h5" fontWeight={800} gutterBottom={!subtitle}>
        {title}
      </Typography>
      {subtitle && (
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {subtitle}
        </Typography>
      )}
      {children}
    </Paper>
  );
}
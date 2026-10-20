import { Box, Link, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <Box
      component="footer"
      sx={{ mt: 4, py: 2.5, px: 3, bgcolor: (t) => alpha(t.palette.background.paper, 0.7), backdropFilter: "blur(8px)", borderTop: "1px solid", borderColor: "divider" }}
    >
      <Box sx={{ maxWidth: 1100, mx: "auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          © {year} QR Code Generator. Codes are created in your browser and never uploaded.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Built with{" "}
          <Link href="https://react.dev" target="_blank" rel="noreferrer" underline="hover">React</Link>,{" "}
          <Link href="https://mui.com" target="_blank" rel="noreferrer" underline="hover">MUI</Link> and{" "}
          <Link href="https://github.com/zpao/qrcode.react" target="_blank" rel="noreferrer" underline="hover">qrcode.react</Link>
        </Typography>
      </Box>
    </Box>
  );
}
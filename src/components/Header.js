import { Link as RouterLink, NavLink } from "react-router-dom";
import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { brandGradient } from "../Theme";

const navSx = {
  color: "rgba(255,255,255,0.92)",
  fontWeight: 700,
  minWidth: 0,
  px: { xs: 1, sm: 2 },
  "&:hover": { bgcolor: "rgba(255,255,255,0.18)" },
  "&.active": { bgcolor: "#ffffff", color: "#85167E", "&:hover": { bgcolor: "#ffffff" } },
};

export default function Header({ user, mode, onToggleTheme }) {
  const dark = mode === "dark";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ backgroundColor: "#85167E", backgroundImage: brandGradient, boxShadow: "0 6px 24px rgba(133, 22, 126, 0.30)" }}
    >
      <Toolbar sx={{ px: { xs: 1.5, sm: 3 } }}>
        {/* logo on the left */}
        <Box component={RouterLink} to="/" sx={{ display: "flex", alignItems: "center", gap: 1, color: "#fff", textDecoration: "none" }}>
          <QrCode2Icon fontSize="large" />
          <Typography variant="h6" fontWeight={800} sx={{ display: { xs: "none", sm: "block" } }}>
            QR Code Generator
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* menu in the right corner */}
        <Box component="nav" aria-label="Main" sx={{ display: "flex", alignItems: "center", gap: { xs: 0.25, sm: 1 } }}>
          <Button component={NavLink} to="/" end sx={navSx}>Generator</Button>
          <Button component={NavLink} to="/qr" sx={navSx}>QR Code</Button>
          <Button component={NavLink} to="/history" sx={navSx}>History</Button>

          {/* theme changer */}
          <Tooltip title={dark ? "Switch to light theme" : "Switch to dark theme"}>
            <IconButton onClick={onToggleTheme} aria-label="Toggle light and dark theme" sx={{ color: "#fff" }}>
              {dark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title={user ? user.email : "Login"}>
            <IconButton component={NavLink} to="/login" aria-label={user ? `Account: ${user.email}` : "Login"} sx={{ color: "#fff" }}>
              {user ? (
                <Avatar sx={{ width: 34, height: 34, bgcolor: "#fff", color: "#85167E", fontWeight: 800 }}>
                  {user.email[0].toUpperCase()}
                </Avatar>
              ) : (
                <AccountCircleIcon sx={{ fontSize: 34 }} />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
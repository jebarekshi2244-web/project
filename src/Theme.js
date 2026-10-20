import { createTheme } from "@mui/material/styles";

export const brandGradient = "linear-gradient(to right, #85167E, #D56ACD)";
const brandGradientHover = "linear-gradient(to right, #6d1167, #c258ba)";

export function buildTheme(mode = "light") {
  const dark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: { main: dark ? "#D56ACD" : "#85167E", light: "#D56ACD", dark: "#6d1167", contrastText: "#ffffff" },
      secondary: { main: "#D56ACD" },
      background: dark ? { default: "#150a18", paper: "#211226" } : { default: "#fbeefa", paper: "#ffffff" },
      text: dark ? { primary: "#f7eaf6", secondary: "#c6aac4" } : { primary: "#2b1530", secondary: "#6f5a73" },
      divider: dark ? "#3a2340" : "#ecd3ea",
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      button: { textTransform: "none", fontWeight: 700 },
    },
    components: {
      // Page background
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            minHeight: "100vh",
            background: dark
              ? "linear-gradient(135deg, #150a18 0%, #22102a 50%, #2d1235 100%)"
              : "linear-gradient(135deg, #fdf3fc 0%, #f6dff4 45%, #eccbe9 100%)",
            backgroundAttachment: "fixed",
          },
        },
      },
      MuiTextField: { defaultProps: { fullWidth: true } },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 999 },
          containedPrimary: {
            color: "#ffffff",
            backgroundImage: brandGradient,
            boxShadow: "0 8px 20px rgba(133, 22, 126, 0.30)",
            "&:hover": { backgroundImage: brandGradientHover, boxShadow: "0 12px 26px rgba(133, 22, 126, 0.38)" },
            "&.Mui-disabled": { backgroundImage: "none", boxShadow: "none" },
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            "&.Mui-selected, &.Mui-selected:hover": { backgroundImage: brandGradient, color: "#ffffff" },
          },
        },
      },
    },
  });
}
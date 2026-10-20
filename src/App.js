import { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Box, Container, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { buildTheme } from "./Theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import InputPage from "./pages/InputPage";
import OutputPage from "./pages/OutputPage";
import HistoryPage from "./pages/HistoryPage";
import LoginPage from "./pages/LoginPage";
import useLocalStorage from "./hooks/useLocalStorage";
import { buildPayload } from "./utils/buildPayload";

const INITIAL_VALUES = {
  text: "https://example.com",
  ssid: "", password: "", encryption: "WPA",
  to: "", subject: "", body: "",
  phone: "",
};

// Page frame: header, centered content, footer. The login page gets a wider container.
function Shell({ user, mode, onToggleTheme, children }) {
  const { pathname } = useLocation();
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header user={user} mode={mode} onToggleTheme={onToggleTheme} />
      <Container
        component="main"
        maxWidth={pathname === "/login" ? "md" : "sm"}
        sx={{ flex: 1, py: { xs: 3, sm: 5 } }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
}

export default function App() {
  // State lives here so every page shares it.
  const [type, setType] = useState("text");
  const [values, setValues] = useState(INITIAL_VALUES);
  // QR colours stay black on white by default.
  const [options, setOptions] = useState({ size: 256, fg: "#000000", bg: "#ffffff", level: "H" });
  const [history, setHistory] = useLocalStorage("qr-history", []);
  const [user, setUser] = useLocalStorage("qr-user", null); // only the email is stored, never the password

  // Theme changer: starts from the system setting, then remembers the choice.
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)", { noSsr: true });
  const [mode, setMode] = useLocalStorage("qr-theme", prefersDark ? "dark" : "light");
  const theme = useMemo(() => buildTheme(mode), [mode]);
  const toggleTheme = () => setMode((m) => (m === "dark" ? "light" : "dark"));

  const payload = useMemo(() => buildPayload(type, values), [type, values]);

  const addToHistory = (value) =>
    setHistory((h) => [value, ...h.filter((x) => x !== value)].slice(0, 8));

  const loadFromHistory = (value) => {
    setType("text");
    setValues((v) => ({ ...v, text: value }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Shell user={user} mode={mode} onToggleTheme={toggleTheme}>
          <Routes>
            <Route
              path="/"
              element={
                <InputPage
                  type={type} setType={setType}
                  values={values} setValues={setValues}
                  options={options} setOptions={setOptions}
                  payload={payload}
                />
              }
            />
            <Route path="/qr" element={<OutputPage payload={payload} options={options} onSave={addToHistory} />} />
            <Route
              path="/history"
              element={<HistoryPage items={history} onSelect={loadFromHistory} onClear={() => setHistory([])} />}
            />
            <Route
              path="/login"
              element={<LoginPage user={user} onLogin={setUser} onLogout={() => setUser(null)} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Shell>
      </BrowserRouter>
    </ThemeProvider>
  );
}
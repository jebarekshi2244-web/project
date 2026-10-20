import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert, Box, Button, Divider, IconButton, InputAdornment, Link, Paper, Stack, TextField, Typography,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SendIcon from "@mui/icons-material/Send";
import GoogleIcon from "@mui/icons-material/Google";
import PageCard from "../components/PageCard";
import LoginBrandPanel from "../components/LoginBrandPanel";
import { loginRequest, signupRequest } from "../utils/auth";

const dots = {
  position: "absolute",
  width: 70,
  height: 70,
  opacity: 0.7,
  backgroundImage: "radial-gradient(circle, #D56ACD 2px, transparent 2.5px)",
  backgroundSize: "14px 14px",
  pointerEvents: "none",
};

export default function LoginPage({ user, onLogin, onLogout }) {
  const navigate = useNavigate();
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    if (signup && password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const result = signup
        ? await signupRequest(email.trim(), password)
        : await loginRequest(email.trim(), password);
      onLogin({ email: result.email });
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setSignup((s) => !s);
    setError("");
    setInfo("");
  };

  if (user) {
    return (
      <Box sx={{ maxWidth: 560, mx: "auto" }}>
        <PageCard title="You're signed in" subtitle={`Signed in as ${user.email}`}>
          <Stack direction="row" spacing={1.5}>
            <Button variant="contained" onClick={() => navigate("/")}>Go to generator</Button>
            <Button variant="outlined" onClick={onLogout}>Log out</Button>
          </Stack>
        </PageCard>
      </Box>
    );
  }

  const startAdornment = (icon) => (
    <InputAdornment position="start">{icon}</InputAdornment>
  );

  return (
    <Box sx={{ position: "relative" }}>
      {/* decorative dots */}
      <Box sx={{ ...dots, top: -24, left: -24 }} />
      <Box sx={{ ...dots, bottom: -24, right: -24 }} />

      <Paper
        elevation={0}
        sx={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 24px 60px rgba(133, 22, 126, 0.25)",
        }}
      >
        <LoginBrandPanel />

        <Box sx={{ p: { xs: 3, sm: 5 }, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="h4" fontWeight={800}>{signup ? "Sign Up" : "Login"}</Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {signup ? "Create your QR code generator account" : "Access your QR code generator account"}
          </Typography>

          <form onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                slotProps={{
                  input: { startAdornment: startAdornment(<EmailOutlinedIcon fontSize="small" color="primary" />) },
                  htmlInput: { "aria-label": "Email address" },
                }}
              />
              <TextField
                type={show ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={signup ? "new-password" : "current-password"}
                slotProps={{
                  input: {
                    startAdornment: startAdornment(<LockOutlinedIcon fontSize="small" color="primary" />),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={show ? "Hide password" : "Show password"}
                          onClick={() => setShow((s) => !s)}
                          edge="end"
                          size="small"
                        >
                          {show ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                  htmlInput: { "aria-label": "Password" },
                }}
              />
              {signup && (
                <TextField
                  type={show ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                  slotProps={{
                    input: { startAdornment: startAdornment(<LockOutlinedIcon fontSize="small" color="primary" />) },
                    htmlInput: { "aria-label": "Confirm password" },
                  }}
                />
              )}

              {!signup && (
                <Box sx={{ textAlign: "right" }}>
                  <Link
                    component="button"
                    type="button"
                    variant="body2"
                    underline="hover"
                    fontWeight={600}
                    onClick={() => { setError(""); setInfo("Password reset isn't connected yet."); }}
                  >
                    Forgot Password?
                  </Link>
                </Box>
              )}

              {error && <Alert severity="error">{error}</Alert>}
              {info && <Alert severity="info">{info}</Alert>}

              <Button
                type="submit"
                variant="contained"
                size="large"
                endIcon={<SendIcon />}
                disabled={loading || !email || !password || (signup && !confirm)}
              >
                {loading ? "Please wait…" : signup ? "Create account" : "Login"}
              </Button>

              <Divider sx={{ color: "text.secondary", fontSize: 13 }}>OR</Divider>

              <Button
                type="button"
                variant="outlined"
                size="large"
                startIcon={<GoogleIcon />}
                onClick={() => { setError(""); setInfo("Google sign-in isn't connected yet."); }}
                sx={{ color: "text.primary", borderColor: "divider" }}
              >
                Continue with Google
              </Button>

              <Typography variant="body2" color="text.secondary" textAlign="center">
                {signup ? "Already have an account? " : "Don't have an account? "}
                <Link component="button" type="button" underline="hover" fontWeight={700} onClick={switchMode} sx={{ verticalAlign: "baseline" }}>
                  {signup ? "Login" : "Sign Up"}
                </Link>
              </Typography>
            </Stack>
          </form>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, textAlign: "center" }}>
            Demo login: checked in the browser only. Connect it to your backend in utils/auth.js.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
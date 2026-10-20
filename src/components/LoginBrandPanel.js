import { Box, Typography } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import BoltIcon from "@mui/icons-material/Bolt";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import SmartphoneIcon from "@mui/icons-material/Smartphone";

const features = [
  { icon: <BoltIcon />, title: "Quick & Easy", text: "Generate QR codes in seconds" },
  { icon: <ShieldOutlinedIcon />, title: "100% Free", text: "No registration required" },
  { icon: <SmartphoneIcon />, title: "Multiple Formats", text: "Text, URL, Wi-Fi, email and phone" },
];

export default function LoginBrandPanel() {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        p: 4,
        color: "#fff",
        background: "linear-gradient(160deg, #3d0749 0%, #85167E 55%, #b03aa8 100%)",
      }}
    >
      {/* soft decorative circles */}
      <Box sx={{ position: "absolute", top: -70, right: -70, width: 220, height: 220, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.08)" }} />
      <Box sx={{ position: "absolute", bottom: -90, left: -60, width: 260, height: 260, borderRadius: "50%", bgcolor: "rgba(213,106,205,0.25)" }} />

      <Box sx={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
        {/* brand */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ width: 46, height: 46, borderRadius: 2.5, display: "grid", placeItems: "center", bgcolor: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.3)" }}>
            <QrCode2Icon />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={800} lineHeight={1.1}>QRGen</Typography>
            <Typography variant="caption" sx={{ opacity: 0.85 }}>Create · Scan · Share</Typography>
          </Box>
        </Box>

        {/* headline */}
        <Typography variant="h4" fontWeight={800} sx={{ mt: 4, lineHeight: 1.2 }}>
          Turn Your Text
          <br />
          Into a{" "}
          <Box component="span" sx={{ color: "#f4b3ef" }}>QR Code</Box>
        </Typography>
        <Typography variant="body2" sx={{ mt: 1.5, opacity: 0.9 }}>
          Fast, simple and free QR code generator for your links, text and more.
        </Typography>

        {/* features */}
        <Box sx={{ mt: 3, display: "grid", gap: 1.75 }}>
          {features.map((f) => (
            <Box key={f.title} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{ width: 38, height: 38, flexShrink: 0, borderRadius: "50%", display: "grid", placeItems: "center", bgcolor: "rgba(255,255,255,0.16)" }}>
                {f.icon}
              </Box>
              <Box>
                <Typography variant="subtitle2" fontWeight={700} lineHeight={1.2}>{f.title}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.85 }}>{f.text}</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* phone illustration */}
        <Box sx={{ position: "relative", mt: "auto", pt: 3, display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: 210,
              height: 44,
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(244,179,239,0.95) 0%, rgba(213,106,205,0.2) 70%, transparent 75%)",
            }}
          />
          <Box
            sx={{
              position: "relative",
              mb: 2.5,
              width: 108,
              height: 178,
              borderRadius: "22px",
              border: "4px solid #1b0720",
              bgcolor: "#2a0c31",
              display: "grid",
              placeItems: "center",
              transform: "rotate(-4deg)",
              boxShadow: "0 0 34px rgba(213,106,205,0.65)",
            }}
          >
            <Box sx={{ bgcolor: "#fff", p: 1, borderRadius: 2, lineHeight: 0 }}>
              <QRCodeSVG value="https://example.com" size={68} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
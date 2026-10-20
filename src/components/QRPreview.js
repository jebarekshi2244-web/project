import { useRef, useState } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { Button, Paper, Snackbar, Stack, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function save(href, name) {
  const a = document.createElement("a");
  a.href = href;
  a.download = name;
  a.click();
}

export default function QRPreview({ value, options, onSave }) {
  const ref = useRef(null);
  const [toast, setToast] = useState("");
  const { size, fg, bg, level } = options;

  if (!value)
    return <Typography color="text.secondary">Enter something on the generator page first.</Typography>;

  const downloadPNG = () => {
    save(ref.current.querySelector("canvas").toDataURL("image/png"), "qrcode.png");
    onSave?.(value);
  };

  const downloadSVG = () => {
    const svg = ref.current.querySelector("svg").outerHTML;
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    save(url, "qrcode.svg");
    URL.revokeObjectURL(url);
    onSave?.(value);
  };

  const copyImage = () => {
    ref.current.querySelector("canvas").toBlob(async (blob) => {
      try {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        setToast("Image copied to clipboard");
      } catch {
        setToast("Copying isn't supported here. Use Download PNG instead.");
      }
    });
  };

  return (
    <Stack alignItems="center" spacing={3} sx={{ maxWidth: "100%" }}>
      {/* The QR code keeps its own colours (black on white by default) */}
      <Paper
        ref={ref}
        elevation={8}
        sx={{
          p: 2,
          bgcolor: "#ffffff",
          borderRadius: 3,
          maxWidth: "100%",
          overflow: "auto",
          "& canvas": { display: "block", maxWidth: "100%", height: "auto !important" },
        }}
      >
        <QRCodeCanvas value={value} size={size} fgColor={fg} bgColor={bg} level={level} marginSize={4} />
        {/* hidden SVG version used only for SVG download */}
        <div hidden>
          <QRCodeSVG value={value} size={size} fgColor={fg} bgColor={bg} level={level} marginSize={4} />
        </div>
      </Paper>

      <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap" justifyContent="center">
        <Button variant="contained" startIcon={<DownloadIcon />} onClick={downloadPNG}>
          Download PNG
        </Button>
        <Button variant="outlined" startIcon={<DownloadIcon />} onClick={downloadSVG}>
          Download SVG
        </Button>
        <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={copyImage}>
          Copy image
        </Button>
      </Stack>

      <Snackbar open={!!toast} autoHideDuration={2500} onClose={() => setToast("")} message={toast} />
    </Stack>
  );
}
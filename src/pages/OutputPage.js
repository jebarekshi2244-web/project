import { Navigate, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PageCard from "../components/PageCard";
import QRPreview from "../components/QRPreview";

export default function OutputPage({ payload, options, onSave }) {
  const navigate = useNavigate();

  // Nothing to show (for example after a page refresh) -> back to the form.
  if (!payload) return <Navigate to="/" replace />;

  return (
    <PageCard title="Your QR code" subtitle="Scan it with your phone camera, or save it below.">
      <Stack alignItems="center" spacing={3}>
        <QRPreview value={payload} options={options} onSave={onSave} />
        <Button variant="text" startIcon={<ArrowBackIcon />} onClick={() => navigate("/")}>
          Edit details
        </Button>
      </Stack>
    </PageCard>
  );
}
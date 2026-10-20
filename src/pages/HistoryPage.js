import { useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import PageCard from "../components/PageCard";
import HistoryList from "../components/HistoryList";

export default function HistoryPage({ items, onSelect, onClear }) {
  const navigate = useNavigate();

  // Picking an entry loads it and opens its QR code.
  const open = (value) => {
    onSelect(value);
    navigate("/qr");
  };

  return (
    <PageCard title="History" subtitle="Codes you have downloaded. Click one to open its QR code.">
      {items.length === 0 ? (
        <Stack spacing={2} alignItems="flex-start">
          <Typography color="text.secondary">
            No codes yet. Download a QR code and it will show up here.
          </Typography>
          <Button variant="contained" onClick={() => navigate("/")}>Go to generator</Button>
        </Stack>
      ) : (
        <HistoryList items={items} onSelect={open} onClear={onClear} />
      )}
    </PageCard>
  );
}
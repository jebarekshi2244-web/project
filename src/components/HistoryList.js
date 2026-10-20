import { Box, Button, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import DeleteIcon from "@mui/icons-material/Delete";

export default function HistoryList({ items, onSelect, onClear }) {
  if (!items.length) return null;
  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="subtitle1" fontWeight={700}>Recent codes</Typography>
        <Button size="small" startIcon={<DeleteIcon />} onClick={onClear}>
          Clear history
        </Button>
      </Box>
      <List disablePadding>
        {items.map((item) => (
          <ListItemButton key={item} onClick={() => onSelect(item)} sx={{ borderRadius: 2 }}>
            <ListItemIcon sx={{ minWidth: 36, color: "primary.main" }}>
              <QrCode2Icon />
            </ListItemIcon>
            <ListItemText primary={item} slotProps={{ primary: { noWrap: true } }} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
}
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import PageCard from "../components/PageCard";
import TypeTabs from "../components/TypeTabs";
import InputPanel from "../components/InputPanel";
import OptionsPanel from "../components/OptionsPanel";

export default function InputPage({ type, setType, values, setValues, options, setOptions, payload }) {
  const navigate = useNavigate();

  return (
    <PageCard title="Create a QR code" subtitle="Choose a type, fill in the details, then generate.">
      <Stack spacing={3}>
        <TypeTabs active={type} onChange={setType} />
        <InputPanel type={type} values={values} onChange={setValues} />
        <OptionsPanel options={options} onChange={setOptions} />
        <Button
          variant="contained"
          size="large"
          startIcon={<QrCode2Icon />}
          disabled={!payload}
          onClick={() => navigate("/qr")}
        >
          Generate QR code
        </Button>
      </Stack>
    </PageCard>
  );
}
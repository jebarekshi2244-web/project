import { MenuItem, Stack, TextField } from "@mui/material";

export default function InputPanel({ type, values, onChange }) {
  const set = (name) => (e) => onChange({ ...values, [name]: e.target.value });

  if (type === "text")
    return (
      <TextField
        label="Text or URL"
        multiline
        minRows={3}
        value={values.text}
        onChange={set("text")}
        placeholder="https://example.com"
      />
    );

  if (type === "wifi")
    return (
      <Stack spacing={2}>
        <TextField label="Network name (SSID)" value={values.ssid} onChange={set("ssid")} />
        <TextField label="Password" type="password" value={values.password} onChange={set("password")} />
        <TextField select label="Security" value={values.encryption} onChange={set("encryption")}>
          <MenuItem value="WPA">WPA/WPA2/WPA3</MenuItem>
          <MenuItem value="WEP">WEP</MenuItem>
          <MenuItem value="nopass">None</MenuItem>
        </TextField>
      </Stack>
    );

  if (type === "email")
    return (
      <Stack spacing={2}>
        <TextField label="To" value={values.to} onChange={set("to")} placeholder="name@example.com" />
        <TextField label="Subject" value={values.subject} onChange={set("subject")} />
        <TextField label="Message" multiline minRows={3} value={values.body} onChange={set("body")} />
      </Stack>
    );

  return (
    <TextField label="Phone number" value={values.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
  );
}
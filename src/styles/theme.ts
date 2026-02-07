import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#7c4dff" },
        background: { default: "#0b0f19", paper: "#111827" },
    },
    shape: { borderRadius: 12 },
});

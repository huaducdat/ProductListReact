import { createTheme } from "@mui/material/styles";

const makeTheme = (mode = "light") =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: "#4CAF50",
                light: "#80E27E",
                dark: "#087F23",
                contrastText: "#fff",
            },
            secondary: {
                main: "#3A86FF",
                light: "#82B1FF",
                dark: "#0F5BD6",
                contrastText: "#fff",
            },
            background: {
                default: mode === "light" ? "#F7F8FA" : "#0E1116",
                paper: mode === "light" ? "#FFFFFF" : "#131821",
            },
            text: {
                primary: mode === "light" ? "#111827" : "#F3F4F6",
                secondary: mode === "light" ? "#6B7280" : "#A1A1AA",
            },
            divider: mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)",
        },
        shape: { borderRadius: 12 },
        typography: {
            fontFamily:
                '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            button: { textTransform: "none", fontWeight: 600 },
            h5: { fontWeight: 700 },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: { borderRadius: 10 },
                    containedPrimary: {
                        "&:hover": { filter: "brightness(0.95)" },
                        "&:active": { transform: "translateY(1px)" },
                    },
                },
            },
        },
    });

export default makeTheme; 
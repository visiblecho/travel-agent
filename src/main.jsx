import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import travelTheme from "./theme/travelTheme.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider theme={travelTheme}>
        <CssBaseline />
        <App />
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);

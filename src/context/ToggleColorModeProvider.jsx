/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useMemo, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ColorModeProvider } from "./colorModeContext";

const ToggleColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");

  const toggleColorMode = () => {
    setMode(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const theme = useMemo(() => createTheme({
    palette: {
      mode, 
    }
  }), [mode])

  return (
    <ColorModeProvider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeProvider>
  );
};

export default ToggleColorModeProvider;

import { createTheme, PaletteMode } from "@mui/material";
import React from "react";
import { getDesignTokens } from "./theme";

export const useColorTheme = () => {
  const storedMode = localStorage.getItem("theme-mode") as PaletteMode;
  const initialMode = storedMode ? storedMode : "dark";

  const [mode, setMode] = React.useState<PaletteMode>(initialMode);

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("theme-mode", newMode);
      return newMode;
    });
  };

  React.useEffect(() => {
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  const modifiedTheme = React.useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};

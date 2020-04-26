// General
import React, { createContext, useState } from "react";
import { ThemeProvider } from "react-native-elements";

// Constants and lib functions
import lightTheme from "../themes/light";
import darkTheme from "../themes/dark";

export const ThemeModeContext = createContext();

export const ThemeContextProvider = (props) => {
  const [themeState, setThemeState] = useState({ currentTheme: "light" });
  const theme = themeState.currentTheme === "light" ? lightTheme : darkTheme;

  const themeStore = {
    themeState: [themeState, setThemeState],
  };

  return (
    <ThemeModeContext.Provider value={themeStore}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeContextProvider;

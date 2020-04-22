import React, { createContext, useState, useEffect } from "react";
import { AsyncStorage } from "react-native";

import { ThemeProvider } from "react-native-elements";
import lightTheme from "../themes/light";
import darkTheme from "../themes/dark";

export const ThemeModeContext = createContext();

export const ThemeContextProvider = (props) => {
  const [themeState, setThemeState] = useState({ currentTheme: "light" });

  // const saveThemeState = async () => {
  //   if (lightThemeState) {
  //     await AsyncStorage.removeItem("lightThemeState");
  //   } else {
  //     await AsyncStorage.setItem(
  //       "lightThemeState",
  //       JSON.stringify(lightThemeState)
  //     );
  //   }
  // };

  // const getThemeState = async () => {
  //   currentMode = await AsyncStorage.getItem("lightThemeState");

  //   if (currentMode) {
  //     setLightThemeState(JSON.parse(currentMode));
  //   }
  // };

  // useEffect(() => {
  //   saveThemeState();
  // }, [lightThemeState]);

  // useEffect(() => {
  //   getThemeState();
  // }, []);

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

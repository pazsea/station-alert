import React, { createContext, useState, useEffect } from "react";
import { AsyncStorage } from "react-native";

import { ThemeProvider } from "react-native-elements";
import lightTheme from "../themes/light";
import darkTheme from "../themes/dark";

export const ThemeModeContext = createContext();

export const ThemeContextProvider = (props) => {
  const [lightThemeState, setLightThemeState] = useState(false);

  const saveThemeState = async () => {
    if (lightThemeState) {
      await AsyncStorage.removeItem("lightThemeState");
    } else {
      await AsyncStorage.setItem(
        "lightThemeState",
        JSON.stringify(lightThemeState)
      );
    }
  };

  const getThemeState = async () => {
    currentMode = await AsyncStorage.getItem("lightThemeState");

    if (currentMode) {
      setLightThemeState(JSON.parse(currentMode));
    }
  };

  useEffect(() => {
    saveThemeState();
  }, [lightThemeState]);

  useEffect(() => {
    getThemeState();
  }, []);

  return (
    <ThemeModeContext.Provider value={[lightThemeState, setLightThemeState]}>
      <ThemeProvider theme={lightThemeState ? darkTheme : darkTheme}>
        {props.children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeContextProvider;

import React, { createContext, useState, useEffect } from "react";
import { AsyncStorage } from "react-native";

import { ThemeProvider } from "styled-components";
import lightTheme from "../themes/light";
import darkTheme from "../themes/dark";

export const ThemeContext = createContext();

export const ThemeContextProvider = props => {
  const [lightThemeState, setLightThemeState] = useState(true);

  const saveThemeState = async () => {
    if (lightThemeState) {
      await AsyncStorage.removeItem("lightThemeState");
    } else {
      await AsyncStorage.setItem(
        "lightThemeState",
        JSON.stringify(lightThemeState)
      );
    }
  }

  const getThemeState = async () => {
    currentMode = await AsyncStorage.getItem("lightThemeState");

    if (currentMode) {
      setLightThemeState(JSON.parse(currentMode));
    }
  }

  useEffect(() => {
    saveThemeState();
  }, [lightThemeState]);

  useEffect(() => {
    getThemeState();
  }, []);

  return (
    <ThemeContext.Provider value={[lightTheme, setLightThemeState]}>
      <ThemeProvider theme={lightThemeState ? lightTheme : darkTheme}>
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

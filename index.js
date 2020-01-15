import React from "react";
import { AppRegistry } from "react-native";
// import App from "./App";
import { ThemeProvider } from "react-native-elements";
// import theme from './your-theme';

import FindDestinationScreen from "./src/screens/FindDestinationScreen";

import { name as appName } from "./app.json";

const ProvidedApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <FindDestinationScreen></FindDestinationScreen>
    </ThemeProvider>
  );
};

AppRegistry.registerComponent(appName, () => ProvidedApp);

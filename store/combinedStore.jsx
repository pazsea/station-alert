import React from "react";
import ThemeContextProvider from "./themeStore";
import JourneyContextProvider from "./journeyStore";

export const CombinedStoreProvider = props => {
  return (
    <ThemeContextProvider>
      <JourneyContextProvider>{props.children}</JourneyContextProvider>
    </ThemeContextProvider>
  );
};

export default CombinedStoreProvider;

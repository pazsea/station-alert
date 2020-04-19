import React from "react";
import ThemeContextProvider from "./themeStore";
import JourneyContextProvider from "./journeyStore";

export const CombinedStoreProvider = (props) => {
  return (
    <JourneyContextProvider>
      <ThemeContextProvider>{props.children}</ThemeContextProvider>
    </JourneyContextProvider>
  );
};

export default CombinedStoreProvider;

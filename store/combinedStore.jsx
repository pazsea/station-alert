import React from "react";
import ThemeContextProvider from "./themeStore";
import JourneyContextProvider from "./journeyStore";
import UserDetailsProvider from "./userDetails";

export const CombinedStoreProvider = (props) => {
  return (
    <JourneyContextProvider>
      <UserDetailsProvider>
        <ThemeContextProvider>{props.children}</ThemeContextProvider>
      </UserDetailsProvider>
    </JourneyContextProvider>
  );
};

export default CombinedStoreProvider;

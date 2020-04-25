import React from "react";
import ThemeContextProvider from "./themeStore";
import JourneyContextProvider from "./journeyStore";
import UserDetailsProvider from "./userDetails";
import PermissionsProvider from "./permissionsStore";

export const CombinedStoreProvider = (props) => {
  return (
    <JourneyContextProvider>
      <UserDetailsProvider>
        <PermissionsProvider>
          <ThemeContextProvider>{props.children}</ThemeContextProvider>
        </PermissionsProvider>
      </UserDetailsProvider>
    </JourneyContextProvider>
  );
};

export default CombinedStoreProvider;

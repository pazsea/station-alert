// General
import React, { useContext, useEffect, useState } from "react";

// Context & Stores
import { ThemeModeContext } from "../../../store/themeStore";
import { UserDetailsContext } from "../../../store/userDetails";

// Styles
import { LayoutView, ContainerView } from "../../components/styles";

// Components
import { View, Text } from "react-native";
import { Card, ListItem, ThemeContext } from "react-native-elements";
import defaultPic from "../../../images/defaultAvatar.png";
import CustomButton from "../../components/CustomButton";

// Constants and lib functions
import dark from "../../../themes/dark";
import light from "../../../themes/light";
import { getFirstName } from "../../constant";

// Backend

const MoreModal = (props) => {
  // ** ---------States --------- **
  const [welcomeMessage, setWelcomeMessage] = useState(false);

  // ** ---------Contexts --------- **
  const {
    themeState: [{ currentTheme }, setThemeState],
  } = useContext(ThemeModeContext);

  const {
    userInfo: [{ name, img }],
    authState: [{ signedIn, authLoading }],
    logOut,
  } = useContext(UserDetailsContext);

  // ** ---------Themes --------- **
  const { theme, updateTheme } = useContext(ThemeContext);

  // ** ---------Variables --------- **
  const { navigate } = props.navigation;

  // ** ---------Use Effect (lifecycles) --------- **
  useEffect(() => {
    setWelcomeMessage(true);

    setTimeout(() => {
      setWelcomeMessage(false);
    }, 2000);
  }, []);

  // ** ---------Functions --------- **

  const toggleTheme = (value) => {
    setThemeState({
      currentTheme: value ? "light" : "dark",
    });
    updateTheme(value ? light : dark);
  };

  const picTitle =
    welcomeMessage && name
      ? `Welcome ${getFirstName(name)}`
      : welcomeMessage
      ? "Welcome"
      : "";

  return (
    <LayoutView centered primaryColor={theme.colors.background}>
      <ContainerView>
        <View style={{ alignItems: "center", paddingBottom: 20 }}></View>
        <Card
          title={name ? `${getFirstName(name)} settings` : "Guest settings"}
          containerStyle={{ borderRadius: 5 }}
          image={
            img
              ? {
                  uri: `${img}`,
                }
              : defaultPic
          }
          // featuredTitle="Välkommen Patrick"
          imageProps={{
            resizeMode: "contain",
            onMagicTap: () => console.log("tryck på bild"),
            PlaceholderContent: (
              <Text
                style={{
                  color: theme.colors.onSecondary,
                }}
              >
                Loading...
              </Text>
            ),
          }}
          featuredTitle={picTitle}
          featuredTitleStyle={{
            color: theme.colors.onSecondary,
            fontWeight: "100",
          }}
        >
          <ListItem
            title="Light mode"
            switch={{
              value: currentTheme === "light",
              onValueChange: (value) => toggleTheme(value),
              trackColor: { true: theme.colors.accent },
              thumbColor:
                currentTheme === "light" ? theme.colors.accent : "#212",
            }}
            bottomDivider
          />
          {signedIn ? (
            <>
              <ListItem
                title="Personal settings"
                onPress={() => navigate("PersonalSettings")}
                chevron
              />
              <ListItem
                title="Recommend station"
                onPress={() => navigate("RecommendStation")}
                chevron
              />
              <CustomButton
                isSecondary
                containerStyle={{
                  paddingBottom: 10,
                  paddingTop: 10,
                }}
                addIcon={{
                  name: "ios-person-add",
                  size: 20,
                }}
                iconRight
                onPress={() => navigate("Register")}
                title={"Create an account"}
              />
              <CustomButton
                hasError
                onPress={logOut}
                addIcon={{
                  name: "sign-out",
                  type: "octicon",
                  size: 20,
                }}
                title={"Log out"}
                authLoading={authLoading}
                iconRight
              />
            </>
          ) : (
            <>
              <ListItem
                title="Recommend station"
                onPress={() => navigate("RecommendStation")}
                chevron
              />
              <CustomButton
                addIcon={{
                  name: "sign-in",
                  type: "octicon",
                  size: 20,
                }}
                iconRight
                authLoading={authLoading}
                onPress={() => navigate("SignIn")}
                title={"Sign in"}
              />
            </>
          )}
        </Card>
      </ContainerView>
    </LayoutView>
  );
};

export default MoreModal;

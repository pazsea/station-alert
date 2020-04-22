import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { LayoutView, ContainerView } from "../../components/styles";
import { ThemeModeContext } from "../../../store/themeStore";
import defaultPic from "../../../images/avatar.png";

import {
  Card,
  ListItem,
  Avatar,
  ThemeContext,
  Icon,
} from "react-native-elements";
import PersonalSettings from "../PersonalSettings";
import CustomButton from "../../components/CustomButton";
import dark from "../../../themes/dark";
import light from "../../../themes/light";
import { UserDetailsContext } from "../../../store/userDetails";
import { getFirstName } from "../../constant";
import firebase from "../../../store/Firebase";

// TO DO: Detta borde vara en store som har användarens inloggningsuppgifter. Gör en sån senare.
const INITIAL_PERSONAL_INFO_STATE = {
  name: "",
  username: "",
  profileImage: "",
  favoriteDestinations: [],
};

const MoreModal = (props) => {
  // const [personalInfo, setPersonalInfo] = useState(INITIAL_PERSONAL_INFO_STATE);

  const {
    themeState: [{ currentTheme }, setThemeState],
  } = useContext(ThemeModeContext);

  const {
    userInfo: [{ name, userSignedIn, avatar }, setUserDetails],
    clearUserDetails,
  } = useContext(UserDetailsContext);

  const [welcomeMessage, setWelcomeMessage] = useState(false);

  const { theme, updateTheme } = useContext(ThemeContext);

  const { navigate } = props.navigation;

  useEffect(() => {
    setWelcomeMessage(true);

    setTimeout(() => {
      setWelcomeMessage(false);
    }, 5000);
  }, []);

  const toggleTheme = (value) => {
    setThemeState({
      currentTheme: value ? "light" : "dark",
    });
    updateTheme(value ? light : dark);
  };

  const completeLogOut = () => {
    firebase.logout();
    clearUserDetails();
  };

  return (
    <LayoutView centered primaryColor={theme.colors.background}>
      <ContainerView>
        <View style={{ alignItems: "center", paddingBottom: 20 }}></View>
        <Card
          title={name ? `${getFirstName(name)} settings` : "Guest settings"}
          containerStyle={{ borderRadius: 5 }}
          image={avatar || defaultPic}
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
          featuredTitle={
            welcomeMessage && name
              ? `Welcome ${getFirstName(name)}`
              : welcomeMessage && "Welcome guest"
          }
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
          {userSignedIn ? (
            <CustomButton
              hasError
              onPress={completeLogOut}
              addIcon={{
                name: "sign-out",
                type: "octicon",
                size: 20,
              }}
              title={"Log out"}
              iconRight
            />
          ) : (
            <CustomButton
              addIcon={{
                name: "sign-in",
                type: "octicon",
                size: 20,
              }}
              iconRight
              onPress={() => navigate("SignIn")}
              title={"Sign in"}
            />
          )}
        </Card>
      </ContainerView>
    </LayoutView>
  );
};

export default MoreModal;

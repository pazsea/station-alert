import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { LayoutView, ContainerView } from "../../components/styles";
import { ThemeModeContext } from "../../../store/themeStore";
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

// TO DO: Detta borde vara en store som har användarens inloggningsuppgifter. Gör en sån senare.
const INITIAL_PERSONAL_INFO_STATE = {
  name: "",
  username: "",
  profileImage: "",
  favoriteDestinations: [],
};

const MoreModal = (props) => {
  const [personalInfo, setPersonalInfo] = useState(INITIAL_PERSONAL_INFO_STATE);

  const {
    themeState: [{ currentTheme }, setThemeState],
  } = useContext(ThemeModeContext);

  const { theme, updateTheme } = useContext(ThemeContext);

  const { navigate } = props.navigation;

  const updateProfileImage = () => {
    //TO DO: Write function to update profile image when you are connected to firebase.
    setPersonalInfo((prevState) => ({
      ...prevState,
      profileImage:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    }));
  };

  const toggleTheme = (value) => {
    setThemeState({
      currentTheme: value ? "light" : "dark",
    });
    updateTheme(value ? light : dark);
  };

  return (
    <LayoutView centered primaryColor={theme.colors.background}>
      <ContainerView>
        <View style={{ alignItems: "center", paddingBottom: 20 }}>
          <Avatar
            size={"large"}
            source={
              personalInfo.profileImage
                ? {
                    uri: personalInfo.profileImage,
                  }
                : null
            }
            rounded
            title={"HD"}
            showEditButton
            onEditPress={updateProfileImage}
          />
        </View>
        <Card title={"Settings"} containerStyle={{ borderRadius: 5 }}>
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
            onPress={() => navigate("Register")}
            title={"Create an account"}
          />
          <CustomButton
            addIcon={{
              name: "sign-in",
              type: "octicon",
              size: 20,
            }}
            onPress={() => navigate("Register")}
            title={"Sign in"}
          />
        </Card>
      </ContainerView>
    </LayoutView>
  );
};

export default MoreModal;

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
    themeState: [lightThemeState, setLightThemeState],
    currentTheme,
  } = useContext(ThemeModeContext);

  const { theme } = useContext(ThemeContext);

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
    setLightThemeState(value);
    props.screenProps.setLightThemeNav(value);
  };

  return (
    <LayoutView primaryColor={theme.colors.background}>
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
              value: lightThemeState,
              onValueChange: (value) => toggleTheme(value),
              trackColor: { true: theme.colors.accent },
              thumbColor: lightThemeState ? theme.colors.accent : "#212",
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
        </Card>
      </ContainerView>
      <CustomButton
        addIcon={{
          name: "sign-in",
          type: "octicon",
          size: 20,
        }}
        title={"Sign in"}
      ></CustomButton>
    </LayoutView>
  );
};

export default MoreModal;

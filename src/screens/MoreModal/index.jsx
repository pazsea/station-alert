import React, { useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { LayoutView, ContainerView } from "../../components/styles";
import { ThemeModeContext } from "../../../store/themeStore";
import { Card, ListItem, Avatar, ThemeContext } from "react-native-elements";
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

  const [lightThemeState, setLightThemeState] = useContext(ThemeModeContext);
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

  return (
    <LayoutView primaryColor={theme.colors.background}>
      <ContainerView>
        <View style={{ alignItems: "center", paddingBottom: 30 }}>
          <Avatar
            size={"xlarge"}
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
        <Card
          title={"Settings"}
          containerStyle={{ margin: 0, borderRadius: 5 }}
        >
          <ListItem
            title="Light mode"
            switch={{
              value: lightThemeState,
              onValueChange: (value) => setLightThemeState(value),
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
      <CustomButton title={"login"}></CustomButton>
    </LayoutView>
  );
};

export default MoreModal;

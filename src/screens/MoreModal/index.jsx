import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { LayoutView, ButtonText } from "../../components/styles";
import { ThemeContext } from "../../../store/themeStore";
import { Button } from "react-native-elements";

const MoreModal = () => {
  const [lightThemeState, setLightThemeState] = useContext(ThemeContext);
  return (
    <LayoutView centered>
      <Button
        title={"Toggle mode"}
        onPress={() => setLightThemeState(!lightThemeState)}
      ></Button>
    </LayoutView>
  );
};

export default MoreModal;

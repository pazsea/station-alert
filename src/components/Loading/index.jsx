import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { LayoutView } from "../../components/styles";
import { ThemeContext } from "react-native-elements";
import ImageContainer from "../ImageContainer";

const Loading = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      <ImageContainer showSplash />
    </View>
  );
};

export default Loading;

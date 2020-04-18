import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { LayoutView } from "../../components/styles";
import { ThemeContext } from "react-native-elements";

const FavouritesScreen = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <LayoutView primaryColor={theme.colors.primary} centered>
      <Text style={{ color: "white" }}>Fav</Text>
    </LayoutView>
  );
};

export default FavouritesScreen;

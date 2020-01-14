import React from "react";
import { StyleSheet, View, Text } from "react-native";


const FavouritesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>FavouritesScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#456990"
    }
  });

export default FavouritesScreen;
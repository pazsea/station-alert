import React from "react";
import { StyleSheet, View, Text } from "react-native";


const FindDestinationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>FindDestinationScreen</Text>
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

export default FindDestinationScreen;

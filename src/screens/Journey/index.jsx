import React from "react";
import { StyleSheet, View, Text } from "react-native";


const JourneyScreen = () => {
  return (
    <View style={styles.container}>
      <Text>JourneyScreen</Text>
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

export default JourneyScreen;

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { LayoutView } from "../../components/styles";
import UIDestinationsView from "../../components/UIDestinationsView";

const JourneyScreen = () => {
  // const {
  //   journeyStore: [{ destinations }, setJourneyState],
  // } = useContext(JourneyContext);
  return (
    <LayoutView centered>
      <UIDestinationsView showPadding={false}></UIDestinationsView>
    </LayoutView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: "30%",
    alignSelf: "center",
    backgroundColor: "#456990",
  },
});

export default JourneyScreen;

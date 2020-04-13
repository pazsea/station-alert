import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card, Button } from "react-native-elements";
import {
  LayoutView,
  InactiveButton,
  ButtonText,
  ContainerView,
  PrimaryButton,
} from "../../components/styles";
import { JourneyContext } from "../../../store/journeyStore";

import UIDestinationsView from "../../components/UIDestinationsView";

const JourneyScreen = (props) => {
  const {
    journeyStore: [{ destinations, startedTrip }, setJourneyState],
    setInitialStore,
  } = useContext(JourneyContext);

  const { navigate } = props.navigation;

  const cancelTrip = () => {
    setInitialStore();
  };

  const hasDestinations = destinations.length;

  return (
    <LayoutView>
      {hasDestinations && startedTrip ? (
        <>
          <UIDestinationsView />
          <InactiveButton onPress={cancelTrip}>
            <ButtonText>Cancel journey</ButtonText>
          </InactiveButton>
        </>
      ) : (
        <>
          <Card
            title="You have no ongoing yourney."
            containerStyle={{ borderRadius: 5, width: "100%" }}
          >
            <Text style={{ marginBottom: 10 }}>
              Please press the button to enter your destination or route.
            </Text>
          </Card>
          <PrimaryButton>
            <ButtonText>Search for you destination</ButtonText>
          </PrimaryButton>
        </>
      )}
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

import React, { useContext, useEffect, useState } from "react";
import { JourneyContext } from "../../../store/journeyStore";
import * as Permissions from "expo-permissions";

import trainlogo from "../../../images/trainlogo.png";

import {
  PrimaryText,
  PrimaryButton,
  ButtonText,
  LayoutView,
  TrainImage,
  ContainerView,
  InactiveButton,
} from "../../components/styles";

import UISearchDestination from "../../components/UISearchDestination";
import UIDestinationsView from "../../components/UIDestinationsView";
import { View } from "react-native";
import { Card, Text } from "react-native-elements";

const FindDestinationScreen = (props) => {
  const {
    journeyStore: [journeyState, setJourneyState],
    permission: [locationAllowed, setLocationAllowed],
    setInitialStore,
  } = useContext(JourneyContext);

  const { navigate } = props.navigation;

  const [startedSearching, setStartedSearching] = useState(false);

  const hasDestinations = journeyState.destinations.length;

  const askPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      setLocationAllowed(true);
    } else {
      console.log(status);
    }
  };

  useEffect(() => {
    if (!locationAllowed) {
      askPermission();
    }
  }, [locationAllowed]);

  const confirmDestinations = () => {
    setStartedSearching(false);
    setJourneyState((prevState) => ({ ...prevState, startedTrip: true }));
    navigate("JourneyScreen");
  };

  const cancelTrip = () => {
    setInitialStore();
    setStartedSearching(false);
  };

  const startedTripView = (
    <LayoutView>
      <ContainerView>
        <TrainImage source={trainlogo} />
        <Card
          title="Cancel journey first"
          containerStyle={{ borderRadius: 5, margin: 0 }}
        >
          <PrimaryText>
            You have an ongoing journey. You need to cancel it before starting a
            new one.
          </PrimaryText>
        </Card>
      </ContainerView>
      <InactiveButton onPress={cancelTrip}>
        <ButtonText>Cancel journey</ButtonText>
      </InactiveButton>
    </LayoutView>
  );

  const noAccessView = (
    <LayoutView>
      <ContainerView>
        <TrainImage source={trainlogo} />
        <Card
          title="Allow access to location"
          containerStyle={{ borderRadius: 5, margin: 0 }}
        >
          <PrimaryText>
            You have to allow this app to access your location.
          </PrimaryText>
        </Card>
      </ContainerView>
      <InactiveButton onPress={cancelTrip}>
        <ButtonText>Allow location access</ButtonText>
      </InactiveButton>
    </LayoutView>
  );

  const searchDestinationView = (
    <LayoutView>
      <ContainerView>
        {startedSearching || hasDestinations ? null : (
          <View style={{ marginBottom: "5%" }}>
            <TrainImage source={trainlogo} />
          </View>
        )}
        <UISearchDestination
          setStartedSearching={setStartedSearching}
          startedSearching={startedSearching}
        />
        {hasDestinations ? <UIDestinationsView /> : null}
      </ContainerView>
      {hasDestinations ? (
        <PrimaryButton onPress={confirmDestinations}>
          <ButtonText>Confirm destination</ButtonText>
        </PrimaryButton>
      ) : null}
    </LayoutView>
  );

  return (
    <>
      {locationAllowed && !journeyState.startedTrip
        ? searchDestinationView
        : journeyState.startedTrip
        ? startedTripView
        : noAccessView}
    </>
  );
};

export default FindDestinationScreen;

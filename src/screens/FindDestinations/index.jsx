import React, { useContext, useState } from "react";
import { JourneyContext } from "../../../store/journeyStore";

import trainlogo from "../../../images/trainlogo.png";

import {
  PrimaryText,
  PrimaryButton,
  ButtonText,
  LayoutView,
  Image,
  ContainerView,
  InactiveButton,
} from "../../components/styles";

import UISearchDestination from "../../components/UISearchDestination";
import UIDestinationsView from "../../components/UIDestinationsView";
import { View } from "react-native";

const FindDestinationScreen = (props) => {
  const {
    journeyStore: [journeyState, setJourneyState],
    setInitialStore,
  } = useContext(JourneyContext);
  const { navigate } = props.navigation;

  const [startedSearching, setStartedSearching] = useState(false);

  const hasDestinations = journeyState.destinations.length > 0;

  const confirmDestinations = () => {
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
        <Image source={trainlogo} />
        <PrimaryText>
          You have an ongoing journey. You need to cancel it before starting a
          new one.
        </PrimaryText>
      </ContainerView>
      <InactiveButton onPress={cancelTrip}>
        <ButtonText>Cancel journey</ButtonText>
      </InactiveButton>
    </LayoutView>
  );

  const noAccessView = (
    <LayoutView>
      <ContainerView>
        <Image source={trainlogo} />
        <PrimaryText>
          You have to allow this app to access your location.
        </PrimaryText>
      </ContainerView>
    </LayoutView>
  );

  const searchDestinationView = (
    <LayoutView>
      <ContainerView>
        {startedSearching || hasDestinations ? null : (
          <View style={{ marginBottom: "5%" }}>
            <Image source={trainlogo} />
          </View>
        )}
        <>
          <UISearchDestination
            setStartedSearching={setStartedSearching}
            startedSearching={startedSearching}
          ></UISearchDestination>
          <UIDestinationsView />
        </>
      </ContainerView>
      {startedSearching && hasDestinations ? (
        <PrimaryButton onPress={confirmDestinations}>
          <ButtonText>Confirm destination</ButtonText>
        </PrimaryButton>
      ) : null}
    </LayoutView>
  );

  return (
    <>
      {journeyState.startedTrip
        ? startedTripView
        : journeyState.accessToLocation
        ? searchDestinationView
        : noAccessView}
    </>
  );
};

export default FindDestinationScreen;

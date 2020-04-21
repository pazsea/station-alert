import React, { useContext, useEffect, useState } from "react";
import { JourneyContext } from "../../../store/journeyStore";
import * as Permissions from "expo-permissions";

import { LayoutView, ContainerView } from "../../components/styles";

import UISearchDestination from "../../components/UISearchDestination";
import UIDestinationsView from "../../components/UIDestinationsView";
import { View, Image } from "react-native";
import { Card, Text } from "react-native-elements";
import CustomButton from "../../components/CustomButton";
import { ThemeContext } from "react-native-elements";
import ImageContainer from "../../components/ImageContainer";

//TO DO Fixa så att allow acces to location funkar smidigare. Kanske tillsammans med ett loading status?

const FindDestinationScreen = (props) => {
  const {
    journeyStore: [journeyState, setJourneyState],
    permission: [locationAllowed, setLocationAllowed],
    resetJourneyStore,
  } = useContext(JourneyContext);

  const { theme } = useContext(ThemeContext);
  const { navigate } = props.navigation;

  const [startedSearching, setStartedSearching] = useState(false);

  const hasDestinations = journeyState.destinations.length;

  const askPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      setLocationAllowed(true);
    } else {
      setLocationAllowed(false);
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
    resetJourneyStore();
    setStartedSearching(false);
  };

  const startedTripView = (
    <>
      <ContainerView>
        <ImageContainer />
        <Card title="Cancel journey first">
          <Text>
            You have an ongoing journey. You need to cancel it before starting a
            new one.
          </Text>
          <CustomButton
            hasError={true}
            title={"Cancel journey"}
            onPress={cancelTrip}
            containerStyle={{
              marginTop: 25,
            }}
            addIcon={{
              name: "close",
              type: "font-awesome",
              size: 20,
            }}
          />
        </Card>
      </ContainerView>
    </>
  );

  const noAccessView = (
    <>
      <ContainerView>
        <ImageContainer />
        <Card title="Allow access to location">
          <Text>You have to allow this app to access your location.</Text>
          <CustomButton
            hasError={true}
            title={"Allow location access"}
            containerStyle={{
              marginTop: 25,
            }}
            //TO DO: Här ska vi sätta på användarens user position
            onPress={cancelTrip}
          />
        </Card>
      </ContainerView>
    </>
  );

  const searchDestinationView = (
    <>
      <ContainerView>
        {startedSearching || hasDestinations ? null : <ImageContainer />}
        <UISearchDestination
          setStartedSearching={setStartedSearching}
          startedSearching={startedSearching}
        />
        {hasDestinations ? (
          <UIDestinationsView
            buttonTitle={"Confirm destination"}
            buttonOnPress={confirmDestinations}
          />
        ) : null}
      </ContainerView>
    </>
  );

  return (
    <LayoutView
      centered={!startedSearching}
      primaryColor={theme.colors.background}
    >
      {locationAllowed && !journeyState.startedTrip
        ? searchDestinationView
        : journeyState.startedTrip
        ? startedTripView
        : noAccessView}
    </LayoutView>
  );
};

export default FindDestinationScreen;

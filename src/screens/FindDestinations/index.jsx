import React, { useContext, useEffect, useState } from "react";
import { JourneyContext } from "../../../store/journeyStore";

import { LayoutView, ContainerView } from "../../components/styles";

import UISearchDestination from "../../components/UISearchDestination";
import UIDestinationsView from "../../components/UIDestinationsView";
import { Card, Text } from "react-native-elements";
import CustomButton from "../../components/CustomButton";
import { ThemeContext } from "react-native-elements";
import ImageContainer from "../../components/ImageContainer";
import firebase from "../../../store/Firebase";
import { PermissionsContext } from "../../../store/permissionsStore";

//TO DO Fixa så att allow acces to location funkar smidigare. Kanske tillsammans med ett loading status?

const FindDestinationScreen = (props) => {
  const {
    journeyStore: [journeyState, setJourneyState],
    stationStatus: [arrivedAllStations, setArrivedAllStations],
    resetJourneyStore,
  } = useContext(JourneyContext);

  const {
    permissionsInfo: [permissions, setPermissions],
    registerLocationAccess,
  } = useContext(PermissionsContext);

  const { theme } = useContext(ThemeContext);
  const { navigate } = props.navigation;

  const [startedSearching, setStartedSearching] = useState(false);

  const hasDestinations = journeyState.destinations.length;

  const confirmDestinations = () => {
    setStartedSearching(false);
    setJourneyState((prevState) => ({ ...prevState, startedTrip: true }));
    navigate("JourneyScreen");
  };

  const cancelTrip = () => {
    resetJourneyStore();
    setStartedSearching(false);
  };

  const statusMessage = arrivedAllStations
    ? "Reset journey?"
    : "Cancel journey";

  const startedTripView = (
    <>
      <ContainerView>
        <ImageContainer />
        <Card title={statusMessage}>
          <Text>
            You have an ongoing journey. You need to cancel it before starting a
            new one.
          </Text>
          <CustomButton
            hasError={true}
            title={statusMessage}
            onPress={cancelTrip}
            containerStyle={{
              marginTop: 25,
            }}
            addIcon={{
              name: "close",
              type: "font-awesome",
              size: 20,
            }}
            iconRight
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
            onPress={registerLocationAccess}
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
      {permissions.location && !journeyState.startedTrip
        ? searchDestinationView
        : journeyState.startedTrip
        ? startedTripView
        : noAccessView}
    </LayoutView>
  );
};

export default FindDestinationScreen;

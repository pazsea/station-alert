// General
import React, { useContext, useState } from "react";

// Context & Stores
import { ThemeContext } from "react-native-elements";
import { JourneyContext } from "../../../store/journeyStore";
import { PermissionsContext } from "../../../store/permissionsStore";

// Styles
import { LayoutView, ContainerView } from "../../components/styles";

// Components
import { Card, Text } from "react-native-elements";
import CustomButton from "../../components/CustomButton";
import ImageContainer from "../../components/ImageContainer";

import UISearchDestination from "../../components/UISearchDestination";
import UIDestinationsView from "../../components/UIDestinationsView";

// Constants and lib functions

// Backend

const FindDestinationScreen = (props) => {
  // ** ---------States --------- **
  const [startedSearching, setStartedSearching] = useState(false);

  // ** ---------Contexts --------- **
  const {
    journeyStore: [journeyState, setJourneyState],
    resetJourneyStore,
  } = useContext(JourneyContext);

  const {
    permissionsInfo: [permissions],
    registerLocationAccess,
  } = useContext(PermissionsContext);

  // ** ---------Themes --------- **
  const { theme } = useContext(ThemeContext);

  // ** ---------Variables --------- **
  const { navigate } = props.navigation;
  const hasDestinations = journeyState?.destinations.length;

  // ** ---------Use Effect (lifecycles) --------- **
  // ** ---------Functions --------- **

  const confirmDestinations = () => {
    setStartedSearching(false);
    setJourneyState((prevState) => ({ ...prevState, startedTrip: true }));
    navigate("JourneyScreen");
  };

  const cancelTrip = () => {
    resetJourneyStore();
    setStartedSearching(false);
  };

  const statusMessage = journeyState.endedTrip
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

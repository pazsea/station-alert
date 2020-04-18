import React, { useContext, useEffect, useState } from "react";
import { JourneyContext } from "../../../store/journeyStore";
import * as Permissions from "expo-permissions";

import trainlogo from "../../../images/trainlogo.png";

import { LayoutView, TrainImage, ContainerView } from "../../components/styles";

import UISearchDestination from "../../components/UISearchDestination";
import UIDestinationsView from "../../components/UIDestinationsView";
import { View } from "react-native";
import { Card, Text } from "react-native-elements";
import CustomButton from "../../components/CustomButton";
import { ThemeContext } from "react-native-elements";

const FindDestinationScreen = (props) => {
  const {
    journeyStore: [journeyState, setJourneyState],
    permission: [locationAllowed, setLocationAllowed],
    setInitialStore,
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
    <>
      <ContainerView>
        <TrainImage source={trainlogo} />
        <Card title="Cancel journey first">
          <Text>
            You have an ongoing journey. You need to cancel it before starting a
            new one.
          </Text>
        </Card>
      </ContainerView>
      <CustomButton
        isInactive={true}
        title={"Cancel journey"}
        onPress={cancelTrip}
      />
    </>
  );

  const noAccessView = (
    <>
      <ContainerView>
        <TrainImage source={trainlogo} />
        <Card title="Allow access to location">
          <Text>You have to allow this app to access your location.</Text>
        </Card>
      </ContainerView>

      <CustomButton
        isActive={true}
        title={"Allow location access"}
        //TO DO: Här ska vi sätta på användarens user position
        onPress={cancelTrip}
      />
    </>
  );

  const searchDestinationView = (
    <>
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
        <CustomButton
          title={"Confirm destination"}
          onPress={confirmDestinations}
        />
      ) : null}
    </>
  );

  return (
    <LayoutView  primaryColor={theme.colors.primary} >
      {locationAllowed && !journeyState.startedTrip
        ? searchDestinationView
        : journeyState.startedTrip
        ? startedTripView
        : noAccessView}
    </LayoutView>
  );
};

export default FindDestinationScreen;

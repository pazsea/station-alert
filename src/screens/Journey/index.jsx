import React, { useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card, Button, ListItem } from "react-native-elements";
import {
  LayoutView,
  InactiveButton,
  ButtonText,
  PrimaryButton,
  PrimaryText,
  ContainerView,
} from "../../components/styles";
import { JourneyContext } from "../../../store/journeyStore";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import UIDestinationsView from "../../components/UIDestinationsView";
import MapView, { Marker } from "react-native-maps";

const JourneyScreen = (props) => {
  const {
    journeyStore: [{ destinations, startedTrip }, setJourneyState],
    setInitialStore,
  } = useContext(JourneyContext);

  const [showMap, setShowMap] = useState(false);
  const [showDestinations, setShowDestinations] = useState(true);

  const { navigate } = props.navigation;

  const cancelTrip = () => {
    setInitialStore();
  };

  return (
    <LayoutView>
      {destinations.length > 0 && startedTrip ? (
        <>
          <ContainerView>
            <ListItem
              onPress={() => setShowMap(!showMap)}
              badge={{
                value: destinations.length,
              }}
              title={"Map"}
              leftIcon={
                <FontAwesome5
                  style={{ alignSelf: "center" }}
                  size={20}
                  name={"map"}
                />
              }
              bottomDivider
              chevron
            />
            {showMap ? (
              <MapView
                style={{
                  width: "100%",
                  height: 250,
                }}
                region={{
                  latitude: destinations[0]?.lat,
                  longitude: destinations[0]?.long,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                {destinations
                  ? destinations.map((station, index) => (
                      <Marker
                        key={index + station.name + station.long}
                        coordinate={{
                          latitude: station.lat,
                          longitude: station.long,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}
                      >
                        <View
                          style={{
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              backgroundColor: "#fff",
                              padding: 1,
                              marginBottom: 2,
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            {station.name}
                          </Text>
                          <FontAwesome5
                            style={{ alignSelf: "center" }}
                            size={20}
                            name={"train"}
                          />
                        </View>
                      </Marker>
                    ))
                  : null}
              </MapView>
            ) : null}

            <ListItem
              onPress={() => setShowDestinations(!showDestinations)}
              title={"Destinations"}
              leftIcon={
                <FontAwesome5
                  style={{ alignSelf: "center" }}
                  size={20}
                  name={"train"}
                />
              }
              chevron
            />
            {showDestinations ? (
              <UIDestinationsView hideTitle roundedBottomCorners />
            ) : null}
          </ContainerView>
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
            <PrimaryText style={{ marginBottom: 10 }}>
              Please press the button to enter your destination or route.
            </PrimaryText>
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

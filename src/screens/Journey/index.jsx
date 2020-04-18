import React, { useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card, Button, ListItem, ThemeContext } from "react-native-elements";
import { LayoutView, ContainerView } from "../../components/styles";
import { JourneyContext } from "../../../store/journeyStore";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import UIDestinationsView from "../../components/UIDestinationsView";
import MapView, { Marker } from "react-native-maps";
import CustomButton from "../../components/CustomButton";

const JourneyScreen = (props) => {
  const {
    journeyStore: [{ destinations, startedTrip }, setJourneyState],
    setInitialStore,
  } = useContext(JourneyContext);
  const { theme } = useContext(ThemeContext);

  const [showMap, setShowMap] = useState(false);
  const [showDestinations, setShowDestinations] = useState(true);

  const { navigate } = props.navigation;

  const cancelTrip = () => {
    setInitialStore();
  };

  return (
    <LayoutView primaryColor={theme.colors.primary} >
      {destinations && startedTrip ? (
        <>
          <ContainerView>
            <ListItem
              onPress={() => setShowMap(!showMap)}
              badge={{
                value: destinations.length,
                badgeStyle: {
                  backgroundColor: theme.colors.pending,
                  color: theme.colors.primary,
                },
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
                            {index + 1 + ". " + station.name}
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
          <CustomButton
            isInactive={true}
            title={"Cancel journey"}
            onPress={cancelTrip}
          />
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

          <CustomButton
            onPress={() => navigate("FindDestinationScreen")}
            title={"Find your destination"}
          ></CustomButton>
        </>
      )}
    </LayoutView>
  );
};

export default JourneyScreen;

import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Card,
  Button,
  ListItem,
  ThemeContext,
  Text,
  Icon,
} from "react-native-elements";
import { LayoutView, ContainerView } from "../../components/styles";
import { JourneyContext } from "../../../store/journeyStore";

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
    <LayoutView primaryColor={theme.colors.background}>
      {destinations && startedTrip ? (
        <>
          <ContainerView>
            <ListItem
              onPress={() => setShowMap(!showMap)}
              badge={{
                value: destinations.length,
                textStyle: {
                  color: theme.colors.primary,
                },
                badgeStyle: {
                  backgroundColor: theme.colors.accent,
                  borderColor: "transparent",
                },
              }}
              title={"Map"}
              leftIcon={<Icon name={"ios-map"} type="ionicon" />}
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
                          <Icon name={"train"} type="font-awesome" />
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
                <Icon
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
            addIcon={{
              name: "close",
              type: "font-awesome",
              size: 20,
            }}
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
            addIcon={{
              name: "ios-train",
            }}
            title={"Find your destination"}
          ></CustomButton>
        </>
      )}
    </LayoutView>
  );
};

export default JourneyScreen;

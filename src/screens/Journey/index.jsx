// General
import React, { useContext, useState } from "react";

// Context & Stores
import { JourneyContext } from "../../../store/journeyStore";

// Styles
import { LayoutView, ContainerView } from "../../components/styles";

// Components
import { View } from "react-native";
import {
  Card,
  ListItem,
  ThemeContext,
  Text,
  Icon,
} from "react-native-elements";
import CustomButton from "../../components/CustomButton";
import ImageContainer from "../../components/ImageContainer";

import UIDestinationsView from "../../components/UIDestinationsView";
import MapView, { Marker } from "react-native-maps";

// Constants and lib functions

// Backend

const JourneyScreen = (props) => {
  // ** ---------States --------- **
  const [showMap, setShowMap] = useState(false);
  const [showDestinations, setShowDestinations] = useState(true);

  // ** ---------Contexts --------- **
  const {
    journeyStore: [{ destinations, startedTrip, endedTrip }],
    resetJourneyStore,
  } = useContext(JourneyContext);

  // ** ---------Themes --------- **
  const { theme } = useContext(ThemeContext);

  // ** ---------Variables --------- **
  const { navigate } = props.navigation;
  const colors = theme.colors;

  // ** ---------Use Effect (lifecycles) --------- **
  // ** ---------Functions --------- **

  const cancelTrip = () => {
    resetJourneyStore();
  };

  const statusMessage = endedTrip ? "Reset journey?" : "Cancel journey";

  return (
    <LayoutView centered primaryColor={theme.colors.background}>
      {destinations && startedTrip ? (
        <>
          <ContainerView>
            <ImageContainer />
            <ListItem
              onPress={() => setShowMap(!showMap)}
              badge={{
                value: destinations.length,
                textStyle: {
                  color: theme.colors.onAccent,
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
                              backgroundColor: colors.primaryVariant,
                              color: colors.onPrimaryVariant,
                              padding: 1,
                              marginBottom: 2,
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            {index + 1 + ". " + station.name}
                          </Text>
                          <Icon
                            name={"train"}
                            iconStyle={{
                              color: station.arrived
                                ? colors.selected
                                : colors.onPending,
                            }}
                            type="font-awesome"
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
                <Icon
                  style={{ alignSelf: "center" }}
                  size={20}
                  name={"train"}
                />
              }
              chevron
            />
            {showDestinations ? (
              <UIDestinationsView
                hasErrorButton={true}
                buttonTitle={statusMessage}
                buttonOnPress={cancelTrip}
                hideTitle
                roundedBottomCorners
              />
            ) : null}
          </ContainerView>
        </>
      ) : (
        <View
          style={{
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Card
            title="You have no ongoing yourney."
            containerStyle={{ borderRadius: 5, width: "100%" }}
          >
            <Text style={{ marginBottom: 10 }}>
              Please press the button to enter your destination or route.
            </Text>
            <CustomButton
              onPress={() => navigate("FindDestinationScreen")}
              addIcon={{
                name: "ios-train",
              }}
              iconRight
              title={"Find your destination"}
            ></CustomButton>
          </Card>
        </View>
      )}
    </LayoutView>
  );
};

export default JourneyScreen;

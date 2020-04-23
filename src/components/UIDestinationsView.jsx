import React, { useState, useEffect, useContext } from "react";
import {
  DestinationsView,
  SecondaryHeadlineText,
  StationView,
  StationMore,
} from "./styles";

import Icon from "react-native-vector-icons/Ionicons";
// import { dest } from "../data/destinations";
import { JourneyContext } from "../../store/journeyStore";
import { Card, Text, ThemeContext, Input } from "react-native-elements";
import { ScrollView } from "react-native";
import CustomButton from "./CustomButton";
import { UserDetailsContext } from "../../store/userDetails";
import CustomOverlay from "./CustomOverlay";

//Gör en overlay här som när man trycker på spara skickar in destinationerna till firebase
// Rendera sedan ut dem i favorites

const UIDestinationsView = (props) => {
  const [showSaveOverlay, setShowSaveOverlay] = useState(false);

  const {
    journeyStore: [{ startedTrip, destinations }, setJourneyState],
  } = useContext(JourneyContext);

  const {
    userInfo: [{ saveFav }, setUserDetails],
    authState: [{ signedIn, authLoading }, setAuthState],
  } = useContext(UserDetailsContext);

  const { theme } = useContext(ThemeContext);

  const colors = theme.colors;

  const removeStation = (pickedStation) => {
    const removeStation = destinations.filter(
      (storedDest) => storedDest !== pickedStation
    );
    setJourneyState((prevState) => ({
      ...prevState,
      destinations: removeStation,
    }));
  };

  const content = destinations?.map((station, index) => {
    const lastStation = destinations.length - 1 === index;
    return (
      <StationView key={"stationVy" + index + station.name}>
        <Icon
          name="ios-flag"
          size={24}
          color={lastStation ? colors.selected : theme.colors.greyOutline}
          key={index + station.name + "flag"}
        />
        <Text key={index + station.name + "headliner"}>{station.name}</Text>
        {station.arrived ? (
          <Icon
            name="ios-checkmark-circle"
            size={24}
            color={colors.selected}
            key={index + station.name + "checkDone"}
          />
        ) : (
          <Icon
            name="ios-trash"
            size={24}
            color={theme.colors.accent}
            onPress={() => removeStation(station)}
            key={index + station.name + "circle"}
          />
        )}
      </StationView>
    );
  });

  const saveButton = signedIn ? (
    <CustomButton
      hasError={props.hasErrorButton}
      addIcon={{
        name: "save",
        type: "font-awesome",
        size: 20,
      }}
      containerStyle={{
        marginTop: 25,
      }}
      title={"Save this route"}
      onPress={() => setShowSaveOverlay(true)}
    />
  ) : null;

  return (
    <>
      <CustomOverlay
        isVisible={showSaveOverlay}
        overlayTitle={"Save this route?"}
        overlayTextContent={"Please enter your route name"}
        customInput={<Input />}
        onBackdropPress={() => setErrorState(INITIAL_ERROR_STATE)}
        buttons={[
          {
            isSelected: true,
            title: "Save",
            addIcon: {
              name: "ios-thumbs-up",
            },
            iconRight: true,
            onPress: () => setErrorState(INITIAL_ERROR_STATE),
          },
          {
            isSecondary: true,
            title: "Go back",
            addIcon: {
              name: "ios-thumbs-up",
            },
            iconRight: true,
            onPress: () => setShowSaveOverlay(false),
          },
        ]}
      />

      <Card
        title={props.hideTitle ? null : "Destinations"}
        containerStyle={{
          borderRadius: props.roundedBottomCorners ? 0 : 5,
          borderBottomEndRadius: 5,
          borderBottomStartRadius: 5,
        }}
      >
        <ScrollView style={{ overflow: "scroll" }}>
          {content}
          {saveButton}
          <CustomButton
            hasError={props.hasErrorButton}
            addIcon={{
              name: props.hasErrorButton ? "close" : "checklist",
              type: props.hasErrorButton ? "font-awesome" : "octicon",
              size: 20,
            }}
            containerStyle={{
              marginTop: 25,
            }}
            title={props.buttonTitle}
            onPress={props.buttonOnPress}
          />
        </ScrollView>
      </Card>
    </>
  );
};

export default UIDestinationsView;

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
import { Card, Text, ThemeContext } from "react-native-elements";
import { ScrollView } from "react-native";
import CustomButton from "./CustomButton";

const UIDestinationsView = (props) => {
  const {
    journeyStore: [{ destinations }, setJourneyState],
  } = useContext(JourneyContext);

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

  return (
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
  );
};

export default UIDestinationsView;

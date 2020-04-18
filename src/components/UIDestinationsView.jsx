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
import { Card, Text } from "react-native-elements";
import { ScrollView } from "react-native";

const UIDestinationsView = (props) => {
  const {
    journeyStore: [{ destinations }, setJourneyState],
  } = useContext(JourneyContext);

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
          color={lastStation ? "green" : "grey"}
          key={index + station.name + "flag"}
        />
        <Text h3 key={index + station.name + "headliner"}>
          {station.name}
        </Text>
        {station.arrived ? (
          <Icon
            name="ios-checkmark-circle"
            size={24}
            color={"green"}
            key={index + station.name + "checkDone"}
          />
        ) : (
          <Icon
            name="ios-remove-circle"
            size={24}
            color={"red"}
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
      <ScrollView style={{ overflow: "scroll", maxHeight: 130 }}>
        {content}
      </ScrollView>
    </Card>
  );
};

export default UIDestinationsView;

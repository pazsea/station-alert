import React, { useState, useEffect, useContext } from "react";
import {
  DestinationsView,
  SecondaryHeadlineText,
  StationView,
  StationMore
} from "./styles";

import Icon from "react-native-vector-icons/Ionicons";
// import { dest } from "../data/destinations";
import { JourneyContext } from "../../store/journeyStore";

const UIDestinationsView = () => {
  const {
    journeyStore: [{ destinations }, setJourneyState]
  } = useContext(JourneyContext);

  const removeStation = pickedStation => {
    const removeStation = destinations.filter(
      storedDest => storedDest !== pickedStation
    );
    setJourneyState(prevState => ({
      ...prevState,
      destinations: removeStation
    }));
  };

  const content = destinations.length
    ? destinations.map((station, index) => {
        if (
          (index === 0 && destinations.length === 1) ||
          index === destinations.length - 1
        ) {
          // console.log("MITT INDEX " + station.name + " " + index);
          return (
            <StationView key={index + station.name}>
              <Icon
                name="ios-flag"
                size={24}
                color={"green"}
                key={index + station.name + "flag"}
              />
              <SecondaryHeadlineText
                key={index + station.name + "headlineText"}
              >
                {station.name}
              </SecondaryHeadlineText>
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
        } else {
          return (
            <>
              <StationView key={index + station.name}>
                <Icon
                  name="ios-flag"
                  size={24}
                  color={"grey"}
                  key={index + station.name + "flag"}
                />
                <SecondaryHeadlineText key={index + station.name + "headliner"}>
                  {station.name}
                </SecondaryHeadlineText>
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
              <StationMore key={index + station.name + "more"}>
                <Icon
                  name="ios-more"
                  size={30}
                  color={"white"}
                  key={index + station.name + "icon" + "more"}
                />
              </StationMore>
            </>
          );
        }
      })
    : null;

  return (
    <DestinationsView hasDestinations={destinations.length}>
      {content}
    </DestinationsView>
  );
};

export default UIDestinationsView;

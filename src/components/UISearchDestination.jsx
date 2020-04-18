import React, { useState, useEffect, useContext } from "react";
import { StationButtonContainer, SearchDestinationContainer } from "./styles";
import dest from "../data/destinations";
import { JourneyContext } from "../../store/journeyStore";
import { SearchBar } from "react-native-elements";
import CustomButton from "./CustomButton";

const UISearchDestination = ({ startedSearching, setStartedSearching }) => {
  const {
    journeyStore: [journeyState, setJourneyState],
  } = useContext(JourneyContext);

  const [searchResult, setSearchResult] = useState([]);
  const [value, setValue] = useState("");

  const handlePressedStation = (pickedStation) => {
    const currentDestinations = journeyState.destinations;
    const existingStation = currentDestinations.find(
      (storedDest) => storedDest.name === pickedStation.name
    );

    if (existingStation) {
      const removeStation = currentDestinations.filter(
        (storedDest) => storedDest.name !== pickedStation.name
      );
      setJourneyState({
        ...journeyState,
        destinations: removeStation,
      });
    } else {
      setJourneyState({
        ...journeyState,
        destinations: [...journeyState.destinations, pickedStation],
      });
    }
  };

  const onChangeHandler = (text) => {
    setValue(text);
    if (text) {
      setStartedSearching(true);
      calculateSearchResult(text);
    } else {
      setStartedSearching(false);
    }
  };

  const eraseSearch = () => {
    setValue("");
    setSearchResult([]);
    setStartedSearching(false);
  };

  const calculateSearchResult = (text) => {
    const destinations = dest;
    setSearchResult(
      destinations.filter((object) =>
        object.name.toUpperCase().includes(text.toUpperCase())
      )
    );
  };

  //EVALUATE RETURN:
  const buttons =
    startedSearching && searchResult
      ? searchResult.slice(0, 3).map((station, index) => {
          const stationAlreadyPicked = journeyState.destinations.includes(
            station
          );
          return (
            <CustomButton
              title={station.name}
              key={station.name + index}
              onPress={() => handlePressedStation(station)}
              icon={{
                name: stationAlreadyPicked ? "check" : "train",
                color: stationAlreadyPicked ? "#fff" : "#000",
                size: 20,
              }}
              isChoice={true}
              isActive={stationAlreadyPicked}
              iconRight
            />
          );
        })
      : null;

  return (
    <>
      <SearchDestinationContainer>
        <SearchBar
          value={value}
          onChangeText={onChangeHandler}
          placeholder={"Enter your destination.."}
          lightTheme
        />
      </SearchDestinationContainer>
      <StationButtonContainer>{buttons}</StationButtonContainer>
    </>
  );
};

export default UISearchDestination;

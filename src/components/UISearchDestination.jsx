import React, { useState, useEffect, useContext } from "react";
import { SearchDestinationInput, StationButton, ButtonText } from "./styles";
import { dest } from "../data/destinations";
import { JourneyContext } from "../../store/journeyStore";

const UISearchDestination = ({ startedSearching, setStartedSearching }) => {
  const {
    journeyStore: [journeyState, setJourneyState]
  } = useContext(JourneyContext);

  const [searchResult, setSearchResult] = useState([]);
  const [value, setValue] = useState("");

  // useEffect(() => {
  //   console.log(searchResult);
  // }, [searchResult]);

  const handlePressStation = pickedStation => {
    const currentDestinations = journeyState.destinations;

    if (currentDestinations.find(storedDest => storedDest === pickedStation)) {
      const removedDestination = currentDestinations.filter(
        storedDest => storedDest !== pickedStation
      );
      setJourneyState(prevState => ({
        ...prevState,
        destinations: removedDestination
      }));
    } else {
      setJourneyState(prevState => ({
        ...prevState,
        destinations: [...prevState.destinations, pickedStation]
      }));
    }
  };

  const onChangeHandler = text => {
    setValue(text);
    if (text) {
      setStartedSearching(true);
      calculateSearchResult(text);
    } else {
      setStartedSearching(false);
    }
  };

  const calculateSearchResult = text => {
    const destinations = dest;
    setSearchResult(
      destinations.filter(object =>
        object.name.toUpperCase().includes(text.toUpperCase())
      )
    );
  };

  return (
    <>
      <SearchDestinationInput
        value={value}
        onChangeText={onChangeHandler}
        startedSearching={startedSearching}
      />
      {startedSearching && searchResult
        ? searchResult.map((station, index) => (
            <StationButton
              key={index + station.name}
              onPress={() => handlePressStation(station)}
            >
              <ButtonText>{station.name.toUpperCase()}</ButtonText>
            </StationButton>
          ))
        : null}
    </>
  );
};

export default UISearchDestination;

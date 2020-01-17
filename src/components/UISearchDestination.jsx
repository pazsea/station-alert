import React, { useState, useEffect, useContext } from "react";
import {
  SearchDestinationInput,
  StationButton,
  StationButtonContainer,
  ButtonText,
  SearchDestinationContainer
} from "./styles";
import { dest } from "../data/destinations";
import { JourneyContext } from "../../store/journeyStore";
import Icon from "react-native-vector-icons/Ionicons";

const UISearchDestination = ({ startedSearching, setStartedSearching }) => {
  const {
    journeyStore: [journeyState, setJourneyState]
  } = useContext(JourneyContext);

  const [searchResult, setSearchResult] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {}, [searchResult]);

  const handlePressedStation = pickedStation => {
    const currentDestinations = journeyState.destinations;

    const existingStation = currentDestinations.find(
      storedDest => storedDest === pickedStation
    );

    if (existingStation) {
      const removeStation = currentDestinations.filter(
        storedDest => storedDest !== pickedStation
      );
      setJourneyState({
        ...journeyState,
        destinations: removeStation
      });
    } else {
      setJourneyState({
        ...journeyState,
        destinations: [...journeyState.destinations, pickedStation]
      });
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

  const eraseSearch = () => {
    setValue("");
    setSearchResult([]);
    setStartedSearching(false);
  };

  const calculateSearchResult = text => {
    const destinations = dest;
    setSearchResult(
      destinations.filter(object =>
        object.name.toUpperCase().includes(text.toUpperCase())
      )
    );
  };

  //EVALUATE RETURN:
  const buttons =
    startedSearching && searchResult
      ? searchResult.slice(0, 3).map((station, index) => (
          <StationButton
            key={index + station.name}
            onPress={() => handlePressedStation(station)}
            active={journeyState.destinations.includes(station)}
          >
            <ButtonText>{station.name.toUpperCase()}</ButtonText>
          </StationButton>
        ))
      : null;

  return (
    <>
      <SearchDestinationContainer>
        <SearchDestinationInput
          value={value}
          type={"search"}
          onChangeText={onChangeHandler}
          placeholder={"Enter your destination.."}
        />
        <Icon
          name="ios-close"
          color={value ? "#000" : "lightgrey"}
          onPress={() => eraseSearch()}
          size={30}
        />
      </SearchDestinationContainer>
      <StationButtonContainer>{buttons}</StationButtonContainer>
    </>
  );
};

export default UISearchDestination;

{
  /* <>
<SearchDestinationContainer>
  <SearchDestinationInput
    value={value}
    type={"search"}
    onChangeText={onChangeHandler}
    placeholder={"Enter your destination.."}
    // autoCorrect={false}
    // secureTextEntry
  />
  <Icon name="ios-circle" color="#000" size={14} />
</SearchDestinationContainer>
{buttons}
</> */
}

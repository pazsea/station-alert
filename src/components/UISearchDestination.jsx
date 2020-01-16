import React, { useState, useEffect } from "react";
import { SearchDestinationInput, StationButton, ButtonText } from "./styles";
import { dest } from "../data/destinations";
// import { JourneyContext } from "../store/journeyStore";

const UISearchDestination = ({ startedSearching, setStartedSearching }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log(searchResult);
  }, [searchResult]);

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
            <StationButton key={index + station.name}>
              <ButtonText>{station.name.toUpperCase()}</ButtonText>
            </StationButton>
          ))
        : null}
    </>
  );
};

export default UISearchDestination;

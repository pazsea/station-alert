// General
import React, { useState, useContext } from "react";

// Context & Stores
import { JourneyContext } from "../../store/journeyStore";
import { ThemeModeContext } from "../../store/themeStore";

// Styles, themes
import { StationButtonContainer, SearchDestinationContainer } from "./styles";

// Components
import CustomButton from "./CustomButton";
import { SearchBar, Icon, ThemeContext } from "react-native-elements";

// Contants and lib functions
import dest from "../data/destinations";

const UISearchDestination = ({ startedSearching, setStartedSearching }) => {
  const {
    journeyStore: [journeyState, setJourneyState],
  } = useContext(JourneyContext);

  const {
    themeState: [{ currentTheme }],
  } = useContext(ThemeModeContext);

  const [searchResult, setSearchResult] = useState([]);
  const [value, setValue] = useState("");

  const { theme } = useContext(ThemeContext);

  const colors = theme.colors;

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
      pickedStation.arrived = false;
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
              icon={
                stationAlreadyPicked ? (
                  <Icon
                    name="check"
                    size={18}
                    containerStyle={{
                      marginLeft: 10,
                    }}
                    iconStyle={{ color: colors.primaryVariant }}
                    type="font-awesome"
                  />
                ) : (
                  <Icon
                    name="train"
                    containerStyle={{
                      marginLeft: 10,
                    }}
                    size={18}
                    type="font-awesome"
                    iconStyle={{ color: colors.onPrimaryVariant }}
                  />
                )
              }
              isChoice={true}
              isSelected={stationAlreadyPicked}
              iconRight
            />
          );
        })
      : null;

  return (
    <>
      <SearchDestinationContainer>
        <SearchBar
          containerStyle={{
            paddingTop: 2,
            paddingBottom: 2,
          }}
          value={value}
          onChangeText={onChangeHandler}
          placeholder={"Find your destination.."}
          lightTheme={currentTheme === "light"}
        />
      </SearchDestinationContainer>
      <StationButtonContainer>{buttons}</StationButtonContainer>
    </>
  );
};

export default UISearchDestination;

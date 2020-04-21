import React, { useState, createContext, useEffect } from "react";

import { isPointWithinRadius } from "geolib";

export const JourneyContext = createContext();

const INITIAL_JOURNEY_STATE = {
  destinations: [],
  startedTrip: false,
  arrivedAllStations: false,
};

const INITIAL_USERPOSITION_STATE = {
  lat: null,
  long: null,
};

export const JourneyContextProvider = (props) => {
  const [journeyState, setJourneyState] = useState(INITIAL_JOURNEY_STATE);
  const [userPosition, setUserPosition] = useState(INITIAL_USERPOSITION_STATE);

  const [locationAllowed, setLocationAllowed] = useState(true);

  useEffect(() => {
    if (userPosition.lat && userPosition.long) {
      // Kolla om någon station är inom min radie

      journeyState.destinations?.map((station, stationIndex) => {
        const stationArrived = isPointWithinRadius(
          {
            latitude: userPosition.lat,
            longitude: userPosition.long,
          },
          { latitude: station.lat, longitude: station.long },
          500
        );

        if (stationArrived) {
          let newDestinationStatus = journeyState.destinations;
          newDestinationStatus[stationIndex].arrived = true;

          setJourneyState((prevState) => ({
            ...prevState,
            destinations: newDestinationStatus,
          }));
        }
      });
    }
  }, [userPosition.lat, userPosition.long]);

  // useEffect(() => {
  //   if (journeyState.destinations.every((station) => station.arrived == true)) {
  //     setJourneyState(INITIAL_JOURNEY_STATE);
  //   }
  // }, [journeyState.destinations]);

  useEffect(() => {
    if (
      locationAllowed &&
      journeyState.startedTrip &&
      !journeyState.arrivedAllStations
    ) {
      //Kör gps och sätt nytt state med ens position
      const watchID = navigator.geolocation.watchPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          // distanceFilter: 0.1,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
      return () => {
        navigator.geolocation.clearWatch(watchID);
      };
    }
  }, [locationAllowed, journeyState.startedTrip]);

  const resetJourneyStore = () => {
    // let resetDestinations = [...journeyState.destinations];
    // console.log(resetDestinations);
    // resetDestinations.forEach((dest) => (dest.arrived = false));

    setJourneyState(INITIAL_JOURNEY_STATE);
  };

  useEffect(() => {}, [journeyState]);

  const JourneyStore = {
    journeyStore: [journeyState, setJourneyState],
    permission: [locationAllowed, setLocationAllowed],
    resetJourneyStore,
  };

  return (
    <JourneyContext.Provider value={JourneyStore}>
      {props.children}
    </JourneyContext.Provider>
  );
};

export default JourneyContextProvider;

//___ HELPERS

// useEffect(() => {
//   journeyState.destinations.map((station) => {
//     console.log(station);
//   });
// }, [journeyState.destinations]);

// useEffect(() => {
//   if (userPosition) {
//     console.log(userPosition.lat);
//   }
// }, [userPosition]);

//___

// useEffect(() => {
//   if (journeyState.destinations.length > 0) {
//     const arrivedAtStations = () => journeyState.destinations.every((station) => {
//       station.arrived === true;
//     });

//     if (!arrivedAtStations) {
//       setJourneyState({
//         destinations: [],
//         startedTrip: false,
//         arrivedAllStations: true,
//       });
//     }
//   }
// }, [journeyState]);

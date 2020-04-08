import React, { useState, createContext, useEffect } from "react";

import * as Permissions from "expo-permissions";

import { isPointWithinRadius } from "geolib";

export const JourneyContext = createContext();

const INITIAL_JOURNEY_STATE = {
  destinations: [],
  startedTrip: false,
  accessToLocation: true
};

export const JourneyContextProvider = props => {
  const [journeyState, setJourneyState] = useState(INITIAL_JOURNEY_STATE);

  // useEffect(() => {
  //   journeyState.destinations.map((station, index) => {
  //     console.log(
  //       "STATET STATION " +
  //         station.name +
  //         " " +
  //         index +
  //         " Arrival " +
  //         station.arrived
  //     );
  //   });
  // }, [journeyState.destinations]);

  useEffect(() => {
    if (journeyState.startedTrip && journeyState.destinations.length) {
      journeyState.destinations.map((station, index) => {
        const { lat, long } = station;
        if (station.arrived) {
          return;
        } else {
          // console.log("GEOLOCATION STARTAD FÖR " + station.name);
          startWatchListener(lat, long, index);
        }
      });
    } else {
      // console.log("GEOLOCATION INTE STARTAD");
    }
  }, [journeyState.destinations, journeyState.startedTrip]);

  startWatchListener = async (destinationLat, destinationLong, stateIndex) => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === "granted") {
      const watchID = navigator.geolocation.watchPosition(
        position => {
          // checks if 51.525/7.4575 is within a radius of 5 km from 51.5175/7.4678
          const hasArrived = isPointWithinRadius(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            { latitude: destinationLat, longitude: destinationLong },
            500
          );

          // console.log("POSITION" + position.coords.latitude);

          if (hasArrived) {
            const stateWithArrival = journeyState.destinations.map(
              (station, index) => {
                if (index === stateIndex) {
                  return { ...station, arrived: true };
                } else {
                  return station;
                }
              }
            );

            // console.log("NYA STATET " + JSON.stringify(stateWithArrival));

            setJourneyState(prevState => ({
              ...prevState,
              destinations: stateWithArrival
            })),
              navigator.geolocation.clearWatch(watchID);
            console.log(
              journeyState.destinations[stateIndex].name + " HAR KOMMIT FRAM"
            );
          } else {
            // Passenger hasn't reach his/hers destination.
          }
        },
        error => {
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          // distanceFilter: 0.1,
          timeout: 15000,
          maximumAge: 10000
        }
      );
    } else {
      setJourneyState(prevState => ({
        ...prevState,
        accessToLocation: true
      }));
    }
  };

  const setInitialStore = () => {
    setJourneyState(INITIAL_JOURNEY_STATE);
  };

  const stores = {
    journeyStore: [journeyState, setJourneyState],
    setInitialStore
  };

  return (
    <JourneyContext.Provider value={stores}>
      {props.children}
    </JourneyContext.Provider>
  );
};

export default JourneyContextProvider;

//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     const globalClassData = localStorage.getItem("globalClassDetails");

//     if (userData) {
//       setUserDetails(JSON.parse(userData));
//     }
//     if (globalClassData) {
//       setGlobalClassDetails(JSON.parse(globalClassData));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem(
//       "globalClassDetails",
//       JSON.stringify(globalClassDetails)
//     );
//   });

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(userDetails));
//   });

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

// Permission location ska finnas när appen startas och vara granted
// När started trip är true så ska gps aktiveras och logga position till statet
// Varje gång det state uppdateras ska man kolla om någon av destinationerna är iom diametern.
// Om så är fallet ås är den destinationen framme.

export const JourneyContextProvider = (props) => {
  const [journeyState, setJourneyState] = useState(INITIAL_JOURNEY_STATE);
  const [userPosition, setUserPosition] = useState(INITIAL_USERPOSITION_STATE);

  const [locationAllowed, setLocationAllowed] = useState(false);

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
  //       console.log("JourneyContextProvider -> station MAP", station);
  //       station.arrived === true;
  //     });

  //     console.log("ARRIVED IS ", arrivedAtStations());
  //     if (!arrivedAtStations) {
  //       console.log("NO MORE DESTINATIONS");
  //       setJourneyState({
  //         destinations: [],
  //         startedTrip: false,
  //         arrivedAllStations: true,
  //       });
  //     }
  //   }
  // }, [journeyState]);

  useEffect(() => {
    if (userPosition.lat) {
      // Kolla om någon station är inom min radie
      console.log("Du kollar coords");

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
          let newDestinationStatus = [...journeyState.destinations];
          newDestinationStatus[stationIndex].arrived = true;

          setJourneyState((prevState) => ({
            ...prevState,
            destinations: newDestinationStatus,
          }));
        }
      });
    }
  }, [userPosition.lat, userPosition.long]);

  useEffect(() => {
    if (locationAllowed && journeyState.startedTrip) {
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
        console.log("JourneyContextProvider -> navigator", "CLEARED");
      };
    }
  }, [locationAllowed, journeyState.startedTrip]);

  const setInitialStore = () => {
    setJourneyState(INITIAL_JOURNEY_STATE);
  };

  const stores = {
    journeyStore: [journeyState, setJourneyState],
    permission: [locationAllowed, setLocationAllowed],
    setInitialStore,
  };

  return (
    <JourneyContext.Provider value={stores}>
      {props.children}
    </JourneyContext.Provider>
  );
};

export default JourneyContextProvider;
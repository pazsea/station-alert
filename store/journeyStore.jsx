import React, { useState, createContext, useEffect } from "react";

import { isPointWithinRadius } from "geolib";
import firebase from "./Firebase";
import { sendPushNotification } from "../src/constant";

export const JourneyContext = createContext();

const INITIAL_JOURNEY_STATE = {
  destinations: [],
  startedTrip: false,
};

const INITIAL_USERPOSITION_STATE = {
  lat: null,
  long: null,
};

export const JourneyContextProvider = (props) => {
  const [journeyState, setJourneyState] = useState(INITIAL_JOURNEY_STATE);
  const [userPosition, setUserPosition] = useState(INITIAL_USERPOSITION_STATE);
  const [arrivedAllStations, setArrivedAllStations] = useState(false);
  const [expoTokenState, setExpoTokenState] = useState("");

  const setStationArrived = async (stationIndex) => {
    console.log("Du är inne i funktione");
    let newDestinationStatus = journeyState.destinations;
    newDestinationStatus[stationIndex].arrived = true;
    const stationName = newDestinationStatus[stationIndex].name;
    const userUid = await firebase.getCurrentUid();
    let token = expoTokenState;

    if (userUid && !expoTokenState) {
      console.log("Fått uid och inget token finns");
      const getToken = await firebase
        .user(userUid)
        .get()
        .then((snap) => {
          let data = snap.data();
          console.log(data);
          if (data) {
            data.expoToken;
            return data.expoToken;
          }
        });
      console.log(getToken);
      if (getToken) {
        token = getToken;
        setExpoTokenState(token);
      }
    }

    await sendPushNotification(
      token,
      stationName,
      `Du kommer strax fram till ${stationName}`
    );

    setJourneyState((prevState) => ({
      ...prevState,
      destinations: newDestinationStatus,
    }));
  };

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
          setStationArrived(stationIndex);
        }
      });
    }
  }, [userPosition.lat, userPosition.long]);

  useEffect(() => {
    console.log("Kollar om du kommit fram till alla stationer");
    if (journeyState.destinations.length === 0) {
      console.log("Finns inga stationer än");
      return;
    } else if (
      journeyState.destinations?.every((station) => station.arrived == true)
    ) {
      console.log("FRAMME");
      setArrivedAllStations(true);
    }
  });

  useEffect(() => {
    if (!journeyState.startedTrip && arrivedAllStations) return;
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
      console.log("WATCH ENDED");
      navigator.geolocation.clearWatch(watchID);
    };
  }, [journeyState.startedTrip, arrivedAllStations]);

  const resetJourneyStore = () => {
    // let resetDestinations = [...journeyState.destinations];
    // console.log(resetDestinations);
    // resetDestinations.forEach((dest) => (dest.arrived = false));

    setJourneyState(INITIAL_JOURNEY_STATE);
    setArrivedAllStations(false);
  };

  useEffect(() => {}, [journeyState]);

  const JourneyStore = {
    journeyStore: [journeyState, setJourneyState],
    stationStatus: [arrivedAllStations, setArrivedAllStations],
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

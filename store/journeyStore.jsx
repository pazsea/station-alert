// General
import React, { useState, createContext, useEffect } from "react";

// Constants and lib functions
import { isPointWithinRadius } from "geolib";
import { sendPushNotification } from "../src/constant";

// Backend
import firebase from "./Firebase";

// TO DO: Borde effektivisera allArrived state och journeystate.endedTrip
// Borde städa ordentlig här och titta på alla IF statements. Behövs alla? Går det att göra bättre?

export const JourneyContext = createContext();

const INITIAL_JOURNEY_STATE = {
  destinations: [],
  startedTrip: false,
  endedTrip: false,
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
    if (journeyState.endedTrip) return;

    // Uppdaterar aktuell stations arrival status till true.
    let newDestinationStatus = [...journeyState.destinations];
    newDestinationStatus[stationIndex].arrived = true;
    const stationName = newDestinationStatus[stationIndex].name;

    // Hämtar användarens UID. OM man är inloggad.
    const userUid = await firebase.getCurrentUid();
    const arrivedAtAllStations = newDestinationStatus.every(
      (station) => station.arrived
    );

    // Sätter destinationer som ankommna om man kommit fram utan att vara inloggad.
    if (!userUid && arrivedAtAllStations) {
      return setJourneyState((prevState) => ({
        ...prevState,
        destinations: newDestinationStatus,
        endedTrip: true,
      }));
    } else if (!userUid) {
      return setJourneyState((prevState) => ({
        ...prevState,
        destinations: newDestinationStatus,
      }));
    }

    // Sätter destinationer om man är inloggad.

    let token = expoTokenState;

    if (userUid && !expoTokenState) {
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

    if (token && arrivedAtAllStations) {
      await sendPushNotification(
        token,
        stationName,
        `Soon you will have arrived at you final destination.`
      );
      setJourneyState((prevState) => ({
        ...prevState,
        destinations: newDestinationStatus,
        endedTrip: true,
      }));
    } else if (token) {
      await sendPushNotification(
        token,
        stationName,
        `You will soon be arriving to ${stationName} station.`
      );
    }
  };

  useEffect(() => {
    if (userPosition.lat && userPosition.long) {
      // Kolla om någon station är inom min radie

      journeyState.destinations.map((station, stationIndex) => {
        const stationArrived = isPointWithinRadius(
          {
            latitude: userPosition.lat,
            longitude: userPosition.long,
          },
          { latitude: station.lat, longitude: station.long },
          500
        );

        if (stationArrived && !station.arrived) {
          setStationArrived(stationIndex);
        }
      });
    }
  }, [userPosition.lat, userPosition.long]);

  useEffect(() => {
    if (!journeyState.startedTrip && journeyState.endedTrip) return;
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
  }, [journeyState.startedTrip, journeyState.endedTrip]);

  const resetJourneyStore = () => {
    setJourneyState(INITIAL_JOURNEY_STATE);
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

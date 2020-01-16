import React, { useState, createContext, useEffect } from "react";

export const JourneyContext = createContext();

// destination: name, coords, arrived, transport,

// Starta en listener för coord för varje station oavsett ordning i useEffect
// Man ska kunna avbryta en station coords när som helst eller t.o.m avsluta hela resan.

const INITIAL_JOURNEY_STATE = {
  destinations: [],
  hasStarted: false
};

export const JourneyContextProvider = props => {
  const [journeyState, setJourneyState] = useState(INITIAL_JOURNEY_STATE);

  useEffect(() => {
    console.log(journeyState);
  }, [journeyState.destinations]);

  const stores = {
    journeyStore: [journeyState, setJourneyState]
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

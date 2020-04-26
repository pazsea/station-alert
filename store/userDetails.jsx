// General
import React, { useState, createContext, useEffect } from "react";

// Constants and lib functions
import firebase from "./Firebase";

// Backend

export const UserDetailsContext = createContext();

const INITIAL_USERDETAILS_STATE = {
  name: "",
  email: "",
  userUid: "",
  favRoutes: [],
  img: "",
};

const INITIAL_AUTH_STATE = {
  signedIn: false,
  authLoading: false,
  errorStatus: false,
  errorMessage: "",
  statusMessage: "",
};

const UserDetailsProvider = (props) => {
  const [userDetails, setUserDetails] = useState(INITIAL_USERDETAILS_STATE);

  const [authState, setAuthState] = useState(INITIAL_AUTH_STATE);

  useEffect(() => {
    if (!authState.signedIn || !firebase.isInitialized()) return;
    const userUid = firebase.getCurrentUid();
    const unsub = firebase.user(userUid).onSnapshot((snap) => {
      // if (snap) {
      //   console.log("UserDetailsProvider -> snap", snap);
      //   const date = snap.data();
      //   console.log("UserDetailsProvider -> date", date);
      //   const docs = snap.docs;
      //   console.log("UserDetailsProvider -> docs", docs);
      // }
      if (snap) {
        console.log("UserDetailsProvider -> snap", snap.data);
        const firebaseUserDetails = snap.data();
        setUserDetails(firebaseUserDetails);
      } else {
        console.log("Firebase funkar inte");
      }
    });
    return () => {
      unsub;
      console.log("UNSUB");
    };
  }, [authState]);

  const resetError = () => {
    setAuthState(INITIAL_AUTH_STATE);
  };

  const hasStatus = (message) => {
    setAuthState((prevState) => ({
      ...prevState,
      authLoading: false,
      errorStatus: false,
      errorMessage: "",
      statusMessage: message,
    }));

    setTimeout(() => {
      setAuthState((prevState) => ({
        ...prevState,
        authLoading: false,
        errorStatus: false,
        errorMessage: "",
        statusMessage: "",
      }));
    }, 2000);
  };

  const hasError = (message) => {
    setAuthState((prevState) => ({
      ...prevState,
      authLoading: false,
      errorStatus: true,
      errorMessage: message,
      statusMessage: "",
    }));

    setTimeout(() => {
      setAuthState((prevState) => ({
        ...prevState,
        errorStatus: false,
        errorMessage: "",
        statusMessage: "",
      }));
    }, 2000);
  };

  const logOut = () => {
    setUserDetails(INITIAL_USERDETAILS_STATE);
    setAuthState(INITIAL_AUTH_STATE);
    firebase.logout();
  };

  const userDetailsStore = {
    userInfo: [userDetails, setUserDetails],
    authState: [authState, setAuthState],
    logOut,
    resetError,
    hasError,
    hasStatus,
  };

  return (
    <UserDetailsContext.Provider value={userDetailsStore}>
      {props.children}
    </UserDetailsContext.Provider>
  );
};

export default UserDetailsProvider;

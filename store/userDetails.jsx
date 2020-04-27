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
    if (!firebase.getCurrentUid()) return;
    const userUid = firebase.getCurrentUid();
    const unsub = firebase.user(userUid).onSnapshot((snap) => {
      const firebaseUserDetails = snap.data();
      if (firebaseUserDetails) {
        setUserDetails(firebaseUserDetails);

        if (authState.signedIn) return;
        setAuthState((prevState) => ({
          ...prevState,
          signedIn: true,
        }));
      } else {
      }
    });
    return () => {
      unsub;
      console.log("Unsub firebase");
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

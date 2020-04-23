import React, { useState, createContext, useEffect } from "react";
import { AsyncStorage } from "react-native";
import firebase from "./Firebase";

export const UserDetailsContext = createContext();

const INITIAL_USERDETAILS_STATE = {
  name: "",
  email: "",
  userUid: "",
  img: "",
};

const INITIAL_AUTH_STATE = {
  signedIn: false,
  authLoading: false,
};

const UserDetailsProvider = (props) => {
  const [userDetails, setUserDetails] = useState(INITIAL_USERDETAILS_STATE);

  const [authState, setAuthState] = useState({
    signedIn: false,
    authLoading: false,
  });

  // Gör en authState med logged in state bör ha en userDetailsLoading
  // Om logged in är true så starta firebase
  // Firebase är en listener som dehydrate userDetailsStatet
  // unsub i cleanup

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

  // useEffect(() => {
  //   console.log("firebase INNAN IF");

  //   if (authState.signedIn && firebase.isInitialized()) {
  //     const userUid = firebase.getCurrentUid();
  //     console.log("firebase startar");
  //     console.log("UserDetailsProvider -> userUid", userUid);

  //     const unsub = firebase.user(userUid).onSnapshot((snap) => {
  //       // if (snap) {
  //       //   console.log("UserDetailsProvider -> snap", snap);
  //       //   const date = snap.data();
  //       //   console.log("UserDetailsProvider -> date", date);
  //       //   const docs = snap.docs;
  //       //   console.log("UserDetailsProvider -> docs", docs);
  //       // }
  //       if (snap) {
  //         console.log("UserDetailsProvider -> snap", snap.data);
  //         const firebaseUserDetails = snap.data();
  //         setUserDetails(firebaseUserDetails);
  //       } else {
  //         console.log("Firebase funkar inte");
  //       }
  //     });
  //     return () => {
  //       unsub;
  //       console.log("UNSUB");
  //     };
  //   }
  // }, [authState]);

  const logOut = () => {
    setUserDetails(INITIAL_USERDETAILS_STATE);
    setAuthState(INITIAL_AUTH_STATE);
    firebase.logout();
  };

  const userDetailsStore = {
    userInfo: [userDetails, setUserDetails],
    authState: [authState, setAuthState],
    logOut,
  };

  return (
    <UserDetailsContext.Provider value={userDetailsStore}>
      {props.children}
    </UserDetailsContext.Provider>
  );
};

export default UserDetailsProvider;

// const [loading, setLoading] = useState(true);

// useEffect(() => {
//   console.log("USER DETAILS ÄNDRADES", userDetails);
// }, [userDetails]);

// const saveUserDetails = async () => {
//   await AsyncStorage.setItem(
//     "userDetailsStorage",
//     JSON.stringify(userDetails)
//   );
// };

// const getUserDetails = async () => {
//   const storage = await AsyncStorage.getItem("userDetailsStorage");

//   if (storage) {
//     setUserDetails(JSON.parse(storage));
//   }
// };

// useEffect(() => {
//   getUserDetails;
// }, []);

// useEffect(() => {
//   saveUserDetails;
// }, [userDetails]);

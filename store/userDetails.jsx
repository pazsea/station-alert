import React, { useState, createContext, useEffect } from "react";
import { AsyncStorage } from "react-native";

export const UserDetailsContext = createContext();

const INITIAL_USERDETAILS_STATE = {
  name: "",
  email: "",
  userUid: "",
  userSignedIn: false,
  avatar: "",
};

const UserDetailsProvider = (props) => {
  const [userDetails, setUserDetails] = useState(INITIAL_USERDETAILS_STATE);

  const clearUserDetails = () => {
    setUserDetails(INITIAL_USERDETAILS_STATE);
  };

  const userDetailsStore = {
    userInfo: [userDetails, setUserDetails],
    clearUserDetails,
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

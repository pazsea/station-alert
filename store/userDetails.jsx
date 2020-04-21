import React, { useState, createContext, useEffect } from "react";

export const UserDetailsContext = createContext();

const INITIAL_USERDETAILS_STATE = {
  name: "",
  email: "",
  userUid: "",
  userSignedIn: false,
  avatar: "",
};

export const ContextProvider = (props) => {
  const [userDetails, setUserDetails] = useState(INITIAL_USERDETAILS_STATE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localStorageUserDetails = localStorage.getItem("user");

    if (localStorageUserDetails) {
      setUserDetails(JSON.parse(localStorageUserDetails));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userDetails));
  });

  const clearUserDetails = () => {
    setUserDetails(INITIAL_USERDETAILS_STATE);
  };

  const userDetailsStore = {
    userDetails: [userDetails, setUserDetails],
    loading: [loading, setLoading],
    clearUserDetails,
  };

  return (
    <UserDetailsContext.Provider value={userDetailsStore}>
      {props.children}
    </UserDetailsContext.Provider>
  );
};

export default UserDetailsProvider;

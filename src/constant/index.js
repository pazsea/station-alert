import React, { useEffect } from "react";
import { BackHandler } from "react-native";

export const useGoBack = (handler) => {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handler);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handler);
    };
  }, [handler]);
};

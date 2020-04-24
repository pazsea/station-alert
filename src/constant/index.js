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

export const getInitials = (name) => {
  let initials = name.match(/\b\w/g) || [];
  initials = ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();

  return initials;
};

export function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export const getFirstName = (name) => {
  const fullNameArray = name.split(" ");

  return fullNameArray[0];
};

export const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      // return the blob
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      // something went wrong
      reject(new Error("uriToBlob failed"));
    };
    // this helps us get a blob
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);

    xhr.send(null);
  });
};

const latCheck = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
const longCheck = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;

export const check_lat_lon = (coord) => {
  var validLat = latCheck.test(coord);
  var validLon = longCheck.test(coord);
  if (validLat || validLon) {
    return true;
  } else {
    return false;
  }
};

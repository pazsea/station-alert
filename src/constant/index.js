import React from "react";
import { BackHandler } from "react-native";

const latCheck = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
const longCheck = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;

export const useGoBack = (handler) => {
  React.useEffect(() => {
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

export const check_lat_lon = (coord) => {
  var validLat = latCheck.test(coord);
  var validLon = longCheck.test(coord);
  if (validLat || validLon) {
    return true;
  } else {
    return false;
  }
};

export const sendPushNotification = async (expoToken, title, text) => {
  const message = {
    to: expoToken,
    sound: "default",
    title: title,
    body: text,
    _displayInForeground: true,
  };
  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

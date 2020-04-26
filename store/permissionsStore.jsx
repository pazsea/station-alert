// General
import React, { useState, createContext, useEffect } from "react";
import * as Permissions from "expo-permissions";

// Constants and lib functions
import Constants from "expo-constants";
import { Notifications } from "expo";
import { Platform, Vibration } from "react-native";

// Backend
import firebase from "./Firebase";

export const PermissionsContext = createContext();

const INITIAL_PERMISSIONS_STATE = {
  location: true,
  notifications: false,
};

const PermissionsProvider = (props) => {
  const [permissions, setPermissions] = useState(INITIAL_PERMISSIONS_STATE);

  registerLocationAccess = async () => {
    try {
      const { status } = await Permissions.getAsync(Permissions.LOCATION);

      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        setPermissions((prevState) => ({
          ...prevState,
          location: false,
        }));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingNotificationStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );

      let finalStatus = existingNotificationStatus;

      if (finalStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }

      if (finalStatus === "granted") {
        setPermissions((prevState) => ({
          ...prevState,
          notifications: true,
        }));
      } else {
        return;
      }

      const userUid = await firebase.getCurrentUid();

      if (userUid) {
        const token = await Notifications.getExpoPushTokenAsync();
        console.log(token);
        await firebase.user(userUid).update({
          expoToken: token,
        });
      }
    } else {
      console.log("Not a physical device, need to be that..");
      return;
    }

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  useEffect(() => {
    const unsub = Notifications.addListener(() => {
      Vibration.vibrate();
    });
    return () => {
      unsub;
    };
  }, []);

  useEffect(() => {
    registerLocationAccess();
  }, []);

  const permissionsStore = {
    permissionsInfo: [permissions, setPermissions],
    registerForPushNotificationsAsync,
    registerLocationAccess,
  };

  return (
    <PermissionsContext.Provider value={permissionsStore}>
      {props.children}
    </PermissionsContext.Provider>
  );
};

export default PermissionsProvider;

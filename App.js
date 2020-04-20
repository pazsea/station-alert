import React, { useState, useEffect } from "react";
import { SafeAreaView, AsyncStorage } from "react-native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import { ThemeProvider } from "react-native-elements";
import lightTheme from "./themes/light";
import darkTheme from "./themes/dark";
import Icon from "react-native-vector-icons/Ionicons";

import FindDestinationScreen from "./src/screens/FindDestinations";
import JourneyScreen from "./src/screens/Journey";
import FavouritesScreen from "./src/screens/Favourites";
import MoreModal from "./src/screens/MoreModal";
import PersonalSettings from "./src/screens/PersonalSettings";
import RecommendStation from "./src/screens/RecommendStation";
import Register from "./src/screens/Register";

import styled from "styled-components";
import CombinedStoreProvider from "./store/combinedStore";
import Firebase from "./store/Firebase";

const TabNavigator = createMaterialBottomTabNavigator(
  {
    FindDestinationScreen: {
      screen: FindDestinationScreen,
      navigationOptions: {
        title: "Search",
        tabBarIcon: ({ tintColor }) => (
          <SafeAreaView>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={"ios-search"}
            />
          </SafeAreaView>
        ),
      },
    },
    JourneyScreen: {
      screen: JourneyScreen,
      navigationOptions: {
        title: "Journey",
        tabBarIcon: ({ tintColor }) => (
          <SafeAreaView>
            <Icon style={[{ color: tintColor }]} size={25} name={"ios-train"} />
          </SafeAreaView>
        ),
      },
    },
    FavouritesScreen: {
      screen: FavouritesScreen,
      navigationOptions: {
        title: "Favourites",
        tabBarIcon: ({ tintColor }) => (
          <SafeAreaView>
            <Icon style={[{ color: tintColor }]} size={25} name={"ios-star"} />
          </SafeAreaView>
        ),
      },
    },
    MoreScreen: {
      screen: MoreModal,
      navigationOptions: {
        title: "More",
        tabBarIcon: ({ tintColor }) => (
          <SafeAreaView>
            <Icon style={[{ color: tintColor }]} size={25} name={"ios-more"} />
          </SafeAreaView>
        ),
      },
    },
  },
  {
    barStyleDark: {
      backgroundColor: "#212121",
      shadowColor: "#000",
      shadowOffset: { width: 3, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
    },
    barStyleLight: {
      backgroundColor: "#3c5e82",
    },
    shifting: false,
    labeled: true,
    initialRouteName: "FindDestinationScreen",
    activeColor: "#E4DC93",
    inactiveColor: "#fff",
    barStyle: { backgroundColor: "transparent", height: 80, paddingTop: 10 },
  }
);

const AllRoutes = createSwitchNavigator(
  {
    PersonalSettings: {
      title: "Personal Settings",
      screen: PersonalSettings,
    },
    RecommendStation: {
      title: "Recommend station",
      screen: RecommendStation,
    },
    Register: {
      title: "Register",
      screen: Register,
    },
    Tabs: {
      screen: TabNavigator,
    },
  },
  {
    initialRouteName: "Tabs",
  }
);

const AppContainer = createAppContainer(AllRoutes);

export default App = () => {
  const [lightThemeNav, setLightThemeNav] = useState(false);

  // console.disableYellowBox = true;

  useEffect(() => {
    Firebase.isInitialized();
  });

  const saveThemeState = async () => {
    if (lightThemeNav) {
      await AsyncStorage.removeItem("lightThemeNavState");
    } else {
      await AsyncStorage.setItem(
        "lightThemeNavState",
        JSON.stringify(lightThemeNav)
      );
    }
  };

  const getThemeState = async () => {
    currentMode = await AsyncStorage.getItem("lightThemeNavState");

    if (currentMode) {
      setLightThemeNav(JSON.parse(currentMode));
    }
  };

  useEffect(() => {
    saveThemeState();
  }, [lightThemeNav]);

  useEffect(() => {
    getThemeState();
  }, []);

  return (
    <CombinedStoreProvider>
      <AppContainer
        theme={lightThemeNav ? "light" : "dark"}
        screenProps={{
          setLightThemeNav: setLightThemeNav,
        }}
      />
    </CombinedStoreProvider>
  );
};

// General
import React, { useState, useEffect } from "react";

// Context & Stores
import { ThemeConsumer } from "react-native-elements";

// Components
import CombinedStoreProvider from "./store/combinedStore";

import FindDestinationScreen from "./src/screens/FindDestinations";
import JourneyScreen from "./src/screens/Journey";
import FavouritesScreen from "./src/screens/Favourites";
import MoreModal from "./src/screens/MoreModal";
import PersonalSettings from "./src/screens/PersonalSettings";
import RecommendStation from "./src/screens/RecommendStation";
import Register from "./src/screens/Register";
import SignIn from "./src/screens/SignIn";
import Loading from "./src/components/Loading";

import Icon from "react-native-vector-icons/Ionicons";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import { SafeAreaView, YellowBox } from "react-native";

// Backend
import firebase from "./store/Firebase";

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
    SignIn: {
      title: "SignIn",
      screen: SignIn,
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
  const [loading, setLoading] = useState(true);

  YellowBox.ignoreWarnings(["Setting a timer"]);

  useEffect(() => {
    if (firebase.isInitialized()) {
      setLoading(false);
    }
  });

  return (
    <CombinedStoreProvider>
      <ThemeConsumer>
        {({ theme }) =>
          loading && !theme ? (
            <Loading />
          ) : (
            <AppContainer theme={theme.themeStatus} />
          )
        }
      </ThemeConsumer>
    </CombinedStoreProvider>
  );
};

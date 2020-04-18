import React from "react";
import { SafeAreaView } from "react-native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Icon from "react-native-vector-icons/Ionicons";

import FindDestinationScreen from "./src/screens/FindDestinations";
import JourneyScreen from "./src/screens/Journey";
import FavouritesScreen from "./src/screens/Favourites";
import MoreModal from "./src/screens/MoreModal";
import PersonalSettings from "./src/screens/PersonalSettings";
import RecommendStation from "./src/screens/RecommendStation";

import CombinedStoreProvider from "./store/combinedStore";
import styled from "styled-components";

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
      header: ({ goBack }) => ({
        left: (
          <Icon
            name={"chevron-left"}
            onPress={() => {
              goBack();
            }}
          />
        ),
      }),
    },
    RecommendStation: {
      title: "Recommend station",
      screen: RecommendStation,
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

const ThemedView = styled.View`
  flex: 1;
  background-color: #1b262c;
`;

export default App = () => {
  return (
    <CombinedStoreProvider>
      <ThemedView>
        <AppContainer />
      </ThemedView>
    </CombinedStoreProvider>
  );
};

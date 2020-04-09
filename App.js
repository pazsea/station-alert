import React, { useState } from "react";
import { SafeAreaView } from "react-native";

import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Icon from "react-native-vector-icons/Ionicons";

import FindDestinationScreen from "./src/screens/FindDestinations";
import JourneyScreen from "./src/screens/Journey";
import FavouritesScreen from "./src/screens/Favourites";
import MoreModal from "./src/screens/MoreModal";

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
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={"ios-train"}
              
            />
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
    MoreModal: {
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

const AppContainer = createAppContainer(TabNavigator);

const ThemedView = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.primary};
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

import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Icon from "react-native-vector-icons/Ionicons";

import FindDestinationScreen from "./src/screens/FintDestinationScreen";
import CurrentTripScreen from "./src/screens/CurrentTripScreen";
import FavouritesScreen from "./src/screens/FavouritesScreen";
import MoreModal from "./src/screens/MoreModal";


const TabNavigator = createMaterialBottomTabNavigator(
  {
    FindDestinationScreen: {
      screen: FindDestinationScreen,
      navigationOptions: {
        title: "Search",
        tabBarIcon: ({ tintColor }) => (
          <SafeAreaView>
            <Icon style={[{ color: tintColor }]} size={25} name={"ios-search"} />
          </SafeAreaView>
        )
      }
    },
    CurrentTripScreen: {
      screen: CurrentTripScreen,
      navigationOptions: {
        title: "Trip",
        tabBarIcon: ({ tintColor }) => (
          <SafeAreaView>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={"ios-train"}
            />
          </SafeAreaView>
        )
      }
    },
    FavouritesScreen: {
      screen: FavouritesScreen,
      navigationOptions: {
        title: "Favourites",
        tabBarIcon: ({ tintColor }) => (
          <SafeAreaView>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={"ios-star"}
            />
          </SafeAreaView>
        )
      }
    },
    MoreModal: {
      screen: MoreModal,
      navigationOptions: {
        title: "More",
        tabBarIcon: ({ tintColor }) => (
          <SafeAreaView>
            <Icon style={[{ color: tintColor }]} size={25} name={"ios-more"} />
          </SafeAreaView>
        )
      }
    }
  },
  {
    shifting:false,
    labeled: true,
    initialRouteName: "FindDestinationScreen",
    activeColor: "#ffffff",
    inactiveColor: "#000",
    barStyle: { backgroundColor: "#456990", height: 80, paddingTop:10 }
  }
);

export default createAppContainer(TabNavigator);

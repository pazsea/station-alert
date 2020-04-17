import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  LayoutView,
  ButtonText,
  ContainerView,
  PrimaryButton,
} from "../../components/styles";
import { ThemeContext } from "../../../store/themeStore";
import { Button, Card, ListItem, Avatar, Icon } from "react-native-elements";

const RecommendStation = () => {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () =>
      navigate("MoreScreen")
    );
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", () =>
        navigate("MoreScreen")
      );
    };
  }, []);

  return (
    <LayoutView>
      <ContainerView></ContainerView>
      <PrimaryButton>
        <ButtonText>Save</ButtonText>
      </PrimaryButton>
    </LayoutView>
  );
};

export default RecommendStation;

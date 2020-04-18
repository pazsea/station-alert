import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { LayoutView, ContainerView } from "../../components/styles";
import { Button, Card, ListItem, Avatar, Icon } from "react-native-elements";
import { useGoBack } from "../../constant";
import CustomButton from "../../components/CustomButton";

const RecommendStation = (props) => {
  const { navigate } = props.navigation;

  useGoBack(() => navigate("MoreScreen"));

  return (
    <LayoutView {...props}>
      <ContainerView></ContainerView>
      <CustomButton title={"login"}></CustomButton>
      <Button></Button>
    </LayoutView>
  );
};

export default RecommendStation;

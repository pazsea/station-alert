import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, Text, BackHandler } from "react-native";
import {
  LayoutView,
  ButtonText,
  ContainerView,
  PrimaryButton,
} from "../../components/styles";
import { ThemeContext } from "../../../store/themeStore";
import {
  Button,
  Card,
  ListItem,
  Avatar,
  Icon,
  Input,
} from "react-native-elements";
import { useGoBack } from "../../constant";

const PersonalSettings = (props) => {
  const { navigate } = props.navigation;

  useGoBack(() => navigate("MoreScreen"));

  return (
    <LayoutView>
      <ContainerView>
        <Card
          title={"Personal settings"}
          containerStyle={{ margin: 0, borderRadius: 5 }}
        >
          <Input
            placeholder="Name"
            containerStyle={{ padding: 5 }}
            leftIcon={<Icon name="people" size={24} color="black" />}
            leftIconContainerStyle={{ marginEnd: 5, marginStart: 5 }}
          />
          <Input
            placeholder="Username"
            containerStyle={{ padding: 5 }}
            leftIcon={<Icon name="check" size={24} color="black" />}
            leftIconContainerStyle={{ marginEnd: 5, marginStart: 5 }}
          />
          <Input
            placeholder="Email"
            containerStyle={{ padding: 5 }}
            leftIcon={<Icon name="email" size={24} color="black" />}
            leftIconContainerStyle={{ marginEnd: 5, marginStart: 5 }}
          />
        </Card>
      </ContainerView>
      <PrimaryButton>
        <ButtonText>Save</ButtonText>
      </PrimaryButton>
    </LayoutView>
  );
};

export default PersonalSettings;

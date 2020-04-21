import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, Text, BackHandler } from "react-native";
import { LayoutView, ContainerView } from "../../components/styles";
import { Card, Icon, Input } from "react-native-elements";
import { useGoBack } from "../../constant";
import CustomButton from "../../components/CustomButton";
import { ThemeContext } from "react-native-elements";

const PersonalSettings = (props) => {
  const { navigate } = props.navigation;
  const { theme } = useContext(ThemeContext);

  useGoBack(() => navigate("MoreScreen"));

  return (
    <LayoutView primaryColor={theme.colors.background}>
      <ContainerView>
        <Card
          title={"Personal settings"}
          containerStyle={{ margin: 0, borderRadius: 5 }}
        >
          <Input
            placeholder="Name"
            containerStyle={{
              paddingBottom: 10,
            }}
            containerStyle={{ padding: 5 }}
            leftIcon={<Icon name="people" size={24} color="black" />}
            leftIconContainerStyle={{ marginEnd: 5, marginStart: 5 }}
          />
          <Input
            placeholder="Username"
            containerStyle={{
              paddingTop: 10,
              paddingBottom: 10,
            }}
            containerStyle={{ padding: 5 }}
            leftIcon={<Icon name="check" size={24} color="black" />}
            leftIconContainerStyle={{ marginEnd: 5, marginStart: 5 }}
          />
          <Input
            placeholder="Email"
            containerStyle={{
              paddingTop: 10,
              paddingBottom: 5,
            }}
            containerStyle={{ padding: 5 }}
            leftIcon={<Icon name="email" size={24} color="black" />}
            leftIconContainerStyle={{ marginEnd: 5, marginStart: 5 }}
          />
        </Card>
      </ContainerView>
      <CustomButton title={"login"} />
    </LayoutView>
  );
};

export default PersonalSettings;

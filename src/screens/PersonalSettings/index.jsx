import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, Text, BackHandler } from "react-native";
import { LayoutView, ContainerView } from "../../components/styles";
import { Card, Icon, Input } from "react-native-elements";
import { useGoBack, validateEmail } from "../../constant";
import CustomButton from "../../components/CustomButton";
import { ThemeContext } from "react-native-elements";
import { UserDetailsContext } from "../../../store/userDetails";
import { useForm } from "react-hook-form";
import firebase from "../../../store/Firebase";
// GÖR EN PASSWORD UPDATE
// UPLOAD AVATAR
// GÖR RECOMMEND STATION SOM SKA SKICKAS TILL EN NY COLLECTION pending
// GÖM SETTINGS, RECOMMEND OCH CREATE ACCOUNT NÄR MAN INTE ÄR INLOGGAD

// SIDENOTE, NÄR JAG GODKÄNT DEN SÅ SLÅS DEN IHOP MED NUVARANDE STATIONS

const PersonalSettings = (props) => {
  const { navigate } = props.navigation;
  const { theme } = useContext(ThemeContext);

  const {
    userInfo: [{ name, email }, setUserDetails],
    authState: [
      { signedIn, authLoading, errorStatus, errorMessage, statusMessage },
      setAuthState,
    ],
    logOut,
    resetError,
    hasError,
    hasStatus,
  } = useContext(UserDetailsContext);

  const { register, handleSubmit, setValue, errors } = useForm();

  async function onSave(data) {
    try {
      await setAuthState((prevState) => ({
        ...prevState,
        authLoading: true,
      }));
      await firebase.updateEmail(data.email || email);
      await firebase.updatePassword(data.password);
      await firebase.user(firebase.getCurrentUid()).update({
        name: data.name || name,
        email: data.email || email,
      });
      await hasStatus("Saved");
    } catch (error) {
      hasError(error.message);
    }
  }

  useEffect(() => {
    register("name");
    register("email", {
      validate: (value) => validateEmail(value || email),
    });
    register("password");
  }, [register]);

  useGoBack(() => navigate("MoreScreen"));

  return (
    <LayoutView centered primaryColor={theme.colors.background}>
      <ContainerView>
        <Card
          title={"Personal settings"}
          containerStyle={{ margin: 0, borderRadius: 5 }}
        >
          <Input
            placeholder={name}
            placeholderTextColor={"green"}
            containerStyle={{
              paddingBottom: 10,
            }}
            onChangeText={(text) => {
              setValue("name", text);
            }}
            leftIcon={<Icon name="people" size={24} color="black" />}
            leftIconContainerStyle={{ marginEnd: 5, marginStart: 5 }}
          />
          <Input
            placeholder={email}
            placeholderTextColor={"green"}
            containerStyle={{
              paddingTop: 10,
              paddingBottom: 5,
            }}
            onChangeText={(text) => {
              setValue("email", text);
            }}
            leftIcon={<Icon name="email" size={24} color="black" />}
            leftIconContainerStyle={{ marginEnd: 5, marginStart: 5 }}
          />
          <Input
            containerStyle={{
              paddingTop: 10,
              paddingBottom: 15,
            }}
            placeholder="**Secret**"
            secureTextEntry={true}
            textContentType={"password"}
            errorMessage={errors.password}
            onChangeText={(text) => {
              setValue("password", text);
            }}
            leftIcon={
              <Icon
                name="ios-finger-print"
                size={24}
                color="black"
                type={"ionicon"}
              />
            }
          />
          <Text
            style={{
              color: errorMessage ? theme.colors.error : theme.colors.selected,
            }}
          >
            {errorMessage || statusMessage}
          </Text>
          <CustomButton
            isSelected
            onPress={handleSubmit(onSave)}
            containerStyle={{
              marginTop: 15,
            }}
            addIcon={{ name: "save", type: "font-awesome" }}
            title={"Save"}
            loading={authLoading}
          />
          <CustomButton
            isSecondary
            containerStyle={{
              // paddingBottom: 10,
              marginTop: 10,
            }}
            addIcon={{
              name: "ios-arrow-back",
              size: 20,
              style: {
                marginRight: 10,
                marginLeft: 0,
              },
            }}
            onPress={() => navigate("MoreScreen")}
            title={"Go back"}
            iconRight={false}
          />
        </Card>
      </ContainerView>
    </LayoutView>
  );
};

export default PersonalSettings;

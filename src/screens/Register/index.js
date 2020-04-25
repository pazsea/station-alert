import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { LayoutView, ContainerView } from "../../components/styles";
import { Card, Icon, Input, Overlay, Text } from "react-native-elements";
import { useGoBack } from "../../constant";
import CustomButton from "../../components/CustomButton";
import { ThemeContext } from "react-native-elements";
import firebase from "../../../store/Firebase";
import { useForm } from "react-hook-form";
import { validateEmail } from "../../constant";
import { UserDetailsContext } from "../../../store/userDetails";
import CustomOverlay from "../../components/CustomOverlay";
import { PermissionsContext } from "../../../store/permissionsStore";

const Register = (props) => {
  const {
    userInfo: [userDetails, setUserDetails],
    authState: [
      { signedIn, authLoading, errorStatus, errorMessage },
      setAuthState,
    ],
    logOut,
    resetError,
    hasError,
  } = useContext(UserDetailsContext);

  const {
    permissionsInfo: [permissions, setPermissions],
    registerForPushNotificationsAsync,
  } = useContext(PermissionsContext);

  const { theme } = useContext(ThemeContext);

  const { register, handleSubmit, setValue, errors } = useForm();
  const { navigate } = props.navigation;

  async function onSubmit(data) {
    try {
      await setAuthState((prevState) => ({
        ...prevState,
        authLoading: true,
      }));
      await firebase.register(data.name, data.email, data.password);
      await registerForPushNotificationsAsync();
      await firebase.user(firebase.getCurrentUid()).set({
        name: data.name,
        email: data.email,
        favRoutes: [],
        img: "",
      });
      await setAuthState((prevState) => ({
        prevState,
        authLoading: false,
        signedIn: true,
      }));
      await navigate("MoreScreen");
    } catch (error) {
      hasError(error.message);
    }
  }

  useEffect(() => {
    register("name", { required: true });
    register("email", {
      required: true,
      validate: (value) => validateEmail(value),
    });
    register("password", { required: true, minLength: 6 });
  }, [register]);

  useGoBack(() => navigate("MoreScreen"));

  const content = signedIn ? (
    <>
      <Card title="You are already signed in..">
        <Text>You have to log out to register for a new account</Text>
        <CustomButton
          hasError
          onPress={logOut}
          containerStyle={{
            marginTop: 20,
          }}
          addIcon={{ name: "ios-person-add" }}
          title={"Log out"}
          iconRight
        />
        <CustomButton
          isSecondary
          containerStyle={{
            paddingBottom: 10,
            paddingTop: 10,
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
    </>
  ) : (
    <>
      <CustomOverlay
        isVisible={errorStatus}
        animationsType={"slide"}
        overlayTitle={"Something went wrong..."}
        overlayTextContent={errorMessage}
        onBackdropPress={resetError}
        buttons={[
          {
            title: "Got it!",
            addIcon: {
              name: "ios-thumbs-up",
            },
            iconRight: true,
            onPress: resetError,
          },
        ]}
      />
      <Card title={"Register account"}>
        <Input
          containerStyle={{
            paddingBottom: 10,
          }}
          placeholder="Name"
          onChangeText={(text) => {
            setValue("name", text);
          }}
          errorMessage={errors.name && "You have to supply a name"}
          leftIcon={<Icon name="people" size={24} color="black" />}
        />
        <Input
          containerStyle={{
            paddingTop: 10,
            paddingBottom: 10,
          }}
          placeholder="Email"
          textContentType={"emailAddress"}
          errorMessage={errors.email && "You have to supply a valid email"}
          onChangeText={(text) => {
            setValue("email", text);
          }}
          leftIcon={<Icon name="email" size={24} color="black" />}
        />
        <Input
          containerStyle={{
            paddingTop: 10,
            paddingBottom: 15,
          }}
          placeholder="Password"
          secureTextEntry={true}
          textContentType={"password"}
          errorMessage={errors.password && "Minimum 6 letter"}
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
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          addIcon={{ name: "ios-person-add" }}
          title={"Register account"}
          loading={authLoading}
        />
        <CustomButton
          isSecondary
          containerStyle={{
            paddingBottom: 10,
            paddingTop: 10,
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
    </>
  );

  return (
    <LayoutView centered primaryColor={theme.colors.background}>
      {content}
    </LayoutView>
  );
};

export default Register;

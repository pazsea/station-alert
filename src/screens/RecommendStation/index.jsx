import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { LayoutView, ContainerView } from "../../components/styles";
import { Card, Icon, Input, Overlay, Text } from "react-native-elements";
import { useGoBack, check_lat_lon } from "../../constant";
import CustomButton from "../../components/CustomButton";
import { ThemeContext } from "react-native-elements";
import firebase from "../../../store/Firebase";
import { useForm } from "react-hook-form";
import { validateEmail } from "../../constant";
import { UserDetailsContext } from "../../../store/userDetails";
import CustomOverlay from "../../components/CustomOverlay";

const defaultValues = {
  firstName: "",
  lat: "",
  long: "",
};

const Recommend = (props) => {
  const {
    userInfo: [userDetails, setUserDetails],
    authState: [
      { authLoading, errorStatus, errorMessage, statusMessage },
      setAuthState,
    ],
    logOut,
    resetError,
    hasError,
    hasStatus,
  } = useContext(UserDetailsContext);

  const { theme } = useContext(ThemeContext);

  const {
    register,
    handleSubmit,
    setValue,
    errors,
    unregister,
    reset,
    watch,
  } = useForm({ defaultValues });
  const { navigate } = props.navigation;

  const values = watch();

  async function onSubmit(data) {
    try {
      await setAuthState((prevState) => ({
        ...prevState,
        authLoading: true,
      }));
      await firebase.recommendStation(data.stationName).set({
        lat: data.lat,
        long: data.long,
      });
      await reset(defaultValues);
      await hasStatus(
        "Thanks for you contribution. Our team will look up this station shortly..."
      );

      // await navigate("MoreScreen");
    } catch (error) {
      hasError(error.message);
    }
  }

  useEffect(() => {
    register("stationName", { required: true, minLength: 2 });
    register("lat", {
      required: true,
      minLength: 4,
      validate: (lat) => check_lat_lon(lat),
    });
    register("long", {
      required: true,
      minLength: 4,
      validate: (long) => check_lat_lon(long),
    });

    return () => {
      unregister("stationName");
      unregister("lat");
      unregister("long");
    };
  }, [register]);

  useGoBack(() => navigate("MoreScreen"));

  const content = (
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
      <Card title={"Recommend a station"}>
        <Input
          containerStyle={{
            paddingTop: 10,
            paddingBottom: 10,
          }}
          value={values.stationName}
          placeholder="Station name"
          errorMessage={
            errors.stationName && "Needs to be atleast two characters"
          }
          onChangeText={(text) => {
            setValue("stationName", text);
          }}
          leftIcon={<Icon name="train" size={24} color="black" />}
        />
        <Input
          containerStyle={{
            paddingTop: 10,
            paddingBottom: 15,
          }}
          value={values.lat}
          placeholder="Latitude"
          errorMessage={
            errors.lat && "Needs to be a valid 4 number coordinate at least"
          }
          onChangeText={(text) => {
            setValue("lat", text);
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
        <Input
          containerStyle={{
            paddingTop: 10,
            paddingBottom: 15,
          }}
          value={values.long}
          placeholder="Longitude"
          errorMessage={
            errors.long && "Needs to be a valid 4 number coordinate atleast"
          }
          onChangeText={(text) => {
            setValue("long", text);
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
            textAlign: "center",
            paddingBottom: 2,
          }}
        >
          {errorMessage || statusMessage}
        </Text>
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          addIcon={{ name: "ios-person-add" }}
          title={"Send station request"}
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

  // console.log(errors.lat);

  return (
    <LayoutView centered primaryColor={theme.colors.background}>
      {content}
    </LayoutView>
  );
};

export default Recommend;

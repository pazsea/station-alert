// General
import React, { useState, useEffect, useContext } from "react";

// Context & Stores
import { UserDetailsContext } from "../../store/userDetails";
import { JourneyContext } from "../../store/journeyStore";

// Styles, themes
import { StationView } from "./styles";

// Components
import Icon from "react-native-vector-icons/Ionicons";
import { Card, Text, ThemeContext, Input } from "react-native-elements";
import { ScrollView } from "react-native";
import CustomButton from "./CustomButton";
import CustomOverlay from "./CustomOverlay";

// Contants and lib functions
import { useForm } from "react-hook-form";

// Backend
import firebase from "../../store/Firebase";

const UIDestinationsView = (props) => {
  const [overlayState, setOverlayState] = useState(false);

  const {
    journeyStore: [{ startedTrip, destinations }, setJourneyState],
  } = useContext(JourneyContext);

  const {
    userInfo: [{ saveFav }, setUserDetails],
    authState: [
      { signedIn, authLoading, errorStatus, errorMessage, statusMessage },
      setAuthState,
    ],
    logOut,
    resetError,
    hasError,
    hasStatus,
  } = useContext(UserDetailsContext);

  const { theme } = useContext(ThemeContext);

  const { register, handleSubmit, setValue, errors } = useForm();

  const colors = theme.colors;

  useEffect(() => {
    register("route", { required: true });
  }, [register]);

  const closeOverlay = () => {
    setOverlayState(false);
    resetError;
  };

  async function onSaveRoute(data) {
    try {
      await setAuthState((prevState) => ({
        ...prevState,
        authLoading: true,
      }));
      await firebase.addFavRoute({
        routeName: data.route,
        destinations: destinations,
      });
      await hasStatus("Saved");
      await setTimeout(() => {
        setOverlayState(false);
      }, 2000);
    } catch (e) {
      await hasError(e.message);
    }
  }

  const removeStation = (pickedStation) => {
    const removeStation = destinations.filter(
      (storedDest) => storedDest !== pickedStation
    );
    setJourneyState((prevState) => ({
      ...prevState,
      destinations: removeStation,
    }));
  };

  const content = destinations?.map((station, index) => {
    const lastStation = destinations.length - 1 === index;
    return (
      <StationView key={"stationVy" + index + station.name}>
        <Icon
          name="ios-train"
          size={24}
          color={lastStation ? colors.selected : theme.colors.greyOutline}
          key={index + station.name + "train"}
        />
        <Text key={index + station.name + "headliner"}>{station.name}</Text>
        {station.arrived ? (
          <Icon
            name="ios-checkmark-circle"
            size={24}
            color={colors.selected}
            key={index + station.name + "checkDone"}
          />
        ) : (
          <Icon
            name="ios-trash"
            size={24}
            color={theme.colors.accent}
            onPress={() => removeStation(station)}
            key={index + station.name + "circle"}
          />
        )}
      </StationView>
    );
  });

  const saveButton = signedIn ? (
    <CustomButton
      isSecondary
      addIcon={{
        name: "save",
        type: "font-awesome",
        size: 20,
      }}
      containerStyle={{
        marginTop: 25,
      }}
      title={"Save this route"}
      onPress={() => setOverlayState(true)}
    />
  ) : null;

  return (
    <>
      <CustomOverlay
        isVisible={overlayState}
        overlayTitle={"Save this route?"}
        customInput={
          <>
            <Input
              containerStyle={{
                paddingTop: 10,
              }}
              placeholder="Enter route name..."
              errorMessage={
                errors.route &&
                "The route name must be at least 2 characters..."
              }
              onChangeText={(text) => {
                setValue("route", text);
              }}
              leftIcon={
                <Icon
                  name="ios-train"
                  size={24}
                  color={theme.themeStatus === "light" ? "#000" : "green"}
                />
              }
            />
            <Text
              style={{
                color: errorMessage
                  ? theme.colors.error
                  : theme.colors.selected,
                textAlign: "center",
                paddingBottom: 2,
              }}
            >
              {errorMessage || statusMessage}
            </Text>
          </>
        }
        onBackdropPress={closeOverlay}
        buttons={[
          {
            isSecondary: true,
            title: "Close",
            addIcon: {
              name: "close",
              type: "font-awesome",
            },
            iconRight: true,
            onPress: closeOverlay,
          },
          {
            loading: authLoading,
            isSelected: true,
            title: "Save",
            addIcon: {
              name: "ios-thumbs-up",
            },
            iconRight: true,
            onPress: handleSubmit(onSaveRoute),
          },
        ]}
      />

      <Card
        title={props.hideTitle ? null : "Destinations"}
        containerStyle={{
          borderRadius: props.roundedBottomCorners ? 0 : 5,
          borderBottomEndRadius: 5,
          borderBottomStartRadius: 5,
        }}
      >
        <ScrollView style={{ overflow: "scroll" }}>
          {content}
          {saveButton}
          <CustomButton
            hasError={props.hasErrorButton}
            addIcon={{
              name: props.hasErrorButton ? "close" : "checklist",
              type: props.hasErrorButton ? "font-awesome" : "octicon",
              size: 20,
            }}
            containerStyle={{
              marginTop: signedIn ? 10 : 25,
            }}
            title={props.buttonTitle}
            onPress={props.buttonOnPress}
          />
        </ScrollView>
      </Card>
    </>
  );
};

export default UIDestinationsView;

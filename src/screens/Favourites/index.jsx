// General
import React, { useContext, useState } from "react";

// Context & Stores
import { UserDetailsContext } from "../../../store/userDetails";
import { JourneyContext } from "../../../store/journeyStore";

// Styles
import { LayoutView, StationView } from "../../components/styles";

// Components
import { Card, ThemeContext, Icon, Text } from "react-native-elements";
import { View, ScrollView } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomOverlay from "../../components/CustomOverlay";

// Constants and lib functions

// Backend
import firebase from "../../../store/Firebase";

const INITIAL_OVERLAY_STATE = {
  delete: false,
  overlayError: false,
};

const FavouritesScreen = (props) => {
  // ** ---------States --------- **
  const [overlayState, setOverlayState] = useState(INITIAL_OVERLAY_STATE);

  // ** ---------Contexts --------- **
  const {
    journeyStore: [, setJourneyState],
  } = useContext(JourneyContext);

  const {
    userInfo: [{ favRoutes }],
    authState: [{ signedIn, authLoading, errorMessage }, setAuthState],
    hasError,
    resetError,
  } = useContext(UserDetailsContext);

  // ** ---------Themes --------- **
  const { theme } = useContext(ThemeContext);

  // ** ---------Variables --------- **
  const { navigate } = props.navigation;
  const emptyFav = favRoutes.length <= 0;

  // ** ---------Use Effect (lifecycles) --------- **
  // ** ---------Functions --------- **

  const startFavRoutesJourney = async (stationIndex) => {
    const pickedRoute = favRoutes[stationIndex].destinations;
    setJourneyState({
      startedTrip: true,
      endedTrip: false,
      destinations: pickedRoute,
    });
    navigate("JourneyScreen");
  };

  const deleteFavRoute = async (stationIndex) => {
    try {
      await setAuthState((prevState) => ({
        ...prevState,
        authLoading: true,
      }));
      await firebase.deleteFavRoute(favRoutes[stationIndex]);
      await setAuthState((prevState) => ({
        ...prevState,
        authLoading: false,
      }));
      await setOverlayState(INITIAL_OVERLAY_STATE);
    } catch (error) {
      hasError(error.message);
      setOverlayState({
        delete: false,
        overlayError: true,
      });
    }
  };

  const closeOverlay = () => {
    resetError;
    setOverlayState(INITIAL_OVERLAY_STATE);
  };

  const noFavRoutes = (
    <View
      style={{
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Card
        title="You have no favourite routes saved yet..."
        containerStyle={{ borderRadius: 5, width: "100%" }}
      >
        <>
          <Text style={{ marginBottom: 10 }}>
            If you have a registered account you can save your routes and start
            them from this tab anytime you want.
          </Text>
          <CustomButton
            onPress={() => navigate("FindDestinationScreen")}
            addIcon={{
              name: "ios-train",
            }}
            iconRight
            title={"Find your destination"}
          ></CustomButton>
        </>
      </Card>
    </View>
  );

  const content = !emptyFav
    ? favRoutes.map((station, stationIndex) => {
        return (
          <Card
            title={favRoutes[stationIndex].routeName}
            key={stationIndex}
            containerStyle={{
              marginBottom: 10,
            }}
          >
            <>
              {station.destinations
                ? station.destinations.map((destination, destIndex) => {
                    const lastStation =
                      favRoutes[stationIndex]?.destinations?.length - 1 ===
                      destIndex;
                    return (
                      <StationView
                        key={"stationVy" + destIndex + destination.name}
                      >
                        <Icon
                          name="train"
                          size={24}
                          iconStyle={{
                            color: lastStation
                              ? theme.colors.selected
                              : theme.colors.greyOutline,
                          }}
                        />
                        <Text>{destination.name}</Text>
                        <Icon
                          name="flag"
                          size={24}
                          color={theme.colors.selected}
                          key={destIndex + destination.name + "checkDone"}
                        />
                      </StationView>
                    );
                  })
                : null}

              <CustomButton
                hasError
                addIcon={{
                  name: "trash",
                  type: "font-awesome",
                  size: 20,
                }}
                containerStyle={{
                  marginTop: 25,
                }}
                title={"Delete this route"}
                onPress={() => deleteFavRoute(stationIndex)}
              />
              <CustomButton
                addIcon={{
                  name: "train",
                  type: "font-awesome",
                  size: 20,
                }}
                containerStyle={{
                  marginTop: 5,
                }}
                title={"Start this journey"}
                onPress={() => startFavRoutesJourney(stationIndex)}
              />
            </>
          </Card>
        );
      })
    : null;

  return (
    <LayoutView centered primaryColor={theme.colors.background}>
      <CustomOverlay
        isVisible={overlayState.delete || overlayState.overlayError}
        overlayTitle={
          overlayState.delete ? "Delete this route?" : "Something went wrong..."
        }
        onBackdropPress={closeOverlay}
        overlayTextContent={
          overlayState.delete ? "This route will be deleted" : errorMessage
        }
        buttons={
          overlayState
            ? [
                {
                  isSecondary: true,
                  title: "No",
                  addIcon: {
                    name: "ios-thumbs-down",
                  },
                  iconRight: true,
                  onPress: closeOverlay,
                },
                {
                  loading: authLoading,
                  isSelected: true,
                  title: "Yes",
                  addIcon: {
                    name: "ios-thumbs-up",
                  },
                  iconRight: true,
                  onPress: deleteFavRoute,
                },
              ]
            : [
                {
                  title: "Got it!",
                  addIcon: {
                    name: "ios-thumbs-up",
                  },
                  iconRight: true,
                  onPress: closeOverlay,
                },
              ]
        }
      />
      <ScrollView style={{ overflow: "scroll" }}>
        {!emptyFav && signedIn ? content : noFavRoutes}
      </ScrollView>
    </LayoutView>
  );
};

export default FavouritesScreen;

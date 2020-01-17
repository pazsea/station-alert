import React, { useContext, useState } from "react";
import { JourneyContext } from "../../../store/journeyStore";

import trainlogo from "../../../images/trainlogo.png";

import {
  PrimaryButton,
  ButtonText,
  LayoutView,
  Image,
  ContainerView
} from "../../components/styles";

import UISearchDestination from "../../components/UISearchDestination";
import UIDestinationsView from "../../components/UIDestinationsView";

const FindDestinationScreen = props => {
  const {
    journeyStore: [{ destinations }, setJourneyState]
  } = useContext(JourneyContext);
  const { navigate } = props.navigation;

  const [startedSearching, setStartedSearching] = useState(false);

  const hasDestinations = destinations.length;

  return (
    <LayoutView>
      <ContainerView>
        {startedSearching || hasDestinations ? null : (
          <Image source={trainlogo} />
        )}
        <UISearchDestination
          setStartedSearching={setStartedSearching}
          startedSearching={startedSearching}
        ></UISearchDestination>
        <UIDestinationsView></UIDestinationsView>
      </ContainerView>
      {hasDestinations ? (
        <PrimaryButton onPress={() => navigate("JourneyScreen")}>
          <ButtonText>Confirm Destination</ButtonText>
        </PrimaryButton>
      ) : null}
    </LayoutView>
  );
};

export default FindDestinationScreen;

import React, { useContext, useState } from "react";
// import { JourneyContext } from "../store/journeyStore";

import trainlogo from "../../../images/trainlogo.png";
import { View } from "react-native";

import {
  PrimaryText,
  PrimaryButton,
  ButtonText,
  LayoutView,
  Image,
  ContainerView
} from "../../components/styles";

import UISearchDestination from "../../components/UISearchDestination";

const FindDestinationScreen = props => {
  // const {
  //   journeyStore: [journeyState]
  // } = useContext(JourneyContext);

  const [startedSearching, setStartedSearching] = useState(false);

  return (
    <LayoutView>
      <ContainerView>
        {startedSearching ? null : <Image source={trainlogo} />}
        <UISearchDestination
          setStartedSearching={setStartedSearching}
          startedSearching={startedSearching}
        ></UISearchDestination>
      </ContainerView>
      <PrimaryButton>
        <ButtonText>Confirm Destination</ButtonText>
      </PrimaryButton>
    </LayoutView>
  );
};

export default FindDestinationScreen;

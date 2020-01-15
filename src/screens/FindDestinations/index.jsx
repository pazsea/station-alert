import React, { useContext } from "react";
// import { JourneyContext } from "../store/journeyStore";
import styled from "styled-components";

import { mixinBackground } from "../../../themes/mixins";
import { PrimaryText, PrimaryButton } from "../../components/styles";

const FindDestinationScreen = props => {
  // const {
  //   journeyStore: [journeyState]
  // } = useContext(JourneyContext);

  return (
    <FindDestinationView>
      <PrimaryText>Find Destination</PrimaryText>
      <PrimaryButton>
        <PrimaryText>Find Destination</PrimaryText>
      </PrimaryButton>
    </FindDestinationView>
  );
};

const FindDestinationView = styled.View`
  ${mixinBackground}
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default FindDestinationScreen;

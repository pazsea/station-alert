import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
// import { JourneyContext } from "../store/journeyStore";
import styled from "styled-components";

const FindDestinationScreen = props => {
  // const {
  //   journeyStore: [journeyState]
  // } = useContext(JourneyContext);

  return (
    <FindDestinationView>
      <Text>FindDestinationScreen</Text>
    </FindDestinationView>
  );
};

const FindDestinationView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.primaryColor};
  color: white;
`;

export default FindDestinationScreen;

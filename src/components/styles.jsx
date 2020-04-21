import styled from "styled-components";

// IMAGES

export const TrainImage = styled.Image`
  flex: 1;
  margin: 0 0 10% 0;

  /* transform: translate(-10px); */
`;

// LAYOUT

export const LayoutView = styled.SafeAreaView`
  display: flex;
  flex: 1;
  height: 100%;
  align-items: center;
  padding: 10% 10% 0 10%;
  background-color: ${({ primaryColor }) => primaryColor};
  flex-direction: ${({ centered, evenly }) => (centered ? "row" : "column")};
  justify-content: ${({ centered, evenly }) =>
    centered ? "center" : evenly ? "space-evenly" : "space-between"};
`;

export const ContainerView = styled.ScrollView`
  width: 100%;
  max-height: 100%;
`;

export const StationButtonContainer = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 5% 0;
`;

export const StationView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 3% 0;
`;

// INPUTS

export const SearchDestinationContainer = styled.View`
  height: 50px;
`;

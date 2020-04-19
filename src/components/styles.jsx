import styled from "styled-components";

// IMAGES

export const TrainImage = styled.Image`
  width: 100%;
  height: 130px;
  margin: 0 0 10% 0;
  transform: translate(-10px);
`;

// LAYOUT

export const LayoutView = styled.SafeAreaView`
  background-color: ${({ primaryColor }) => primaryColor};
  height: 100%;
  display: flex;
  flex: 1;
  justify-content: ${({ centered, evenly }) =>
    centered ? "center" : evenly ? "space-evenly" : "space-between"};
  align-items: center;
  padding: 10% 10% 2% 10%;
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

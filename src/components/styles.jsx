import styled from "styled-components";
import {
  mixinText,
  mixinBackground,
  mixinSecondaryHeadline,
} from "../../themes/mixins";

// IMAGES

export const Image = styled.Image`
  margin: 20% 0 5% 0;
  width: 100%;
  height: 130px;
`;

// LAYOUT

export const ContainerView = styled.View`
  width: 90%;
`;

export const StationButtonContainer = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 5%;
`;

export const LayoutView = styled.SafeAreaView`
  ${mixinBackground}
  display:flex;
  flex: 1;
  justify-content: ${({ centered }) => (centered ? "center" : "space-between")};
  align-items: center;
  padding: 10% 5% 2% 5%;
`;

export const DestinationsView = styled.ScrollView`
  width: 100%;
  overflow: hidden;
  margin-top: 5%;
  border-radius: 5px;
  max-height: 280px;
  min-height: ${({ hasDestinations }) => (hasDestinations ? "280px" : "0")};
  overflow: hidden;
  padding: ${({ hasDestinations }) => (hasDestinations ? "0" : "0")};
  background-color: ${(props) => props.theme.colors.secondary};
`;

export const StationView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StationMore = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// FONTS

export const PrimaryText = styled.Text`
  ${mixinText}
`;

export const SecondaryHeadlineText = styled.Text`
  ${mixinSecondaryHeadline}
`;

export const ButtonText = styled.Text`
  color: ${(props) =>
    props.secondary
      ? props.theme.colors.secondaryText
      : props.theme.colors.primaryText};
  font-size: ${(props) => props.theme.font.buttonSize};
  text-align: center;
`;

//BUTTONS

export const PrimaryButton = styled.TouchableOpacity`
  width: 90%;
  margin: 2%;
  padding: 4%;
  border-radius: 5px;
  border: 0.1px solid black;
  background-color: ${(props) => props.theme.colors.primaryButton};
`;

export const SecondaryButton = styled.TouchableOpacity`
  width: 90%;
  margin: 2%;
  padding: 4%;
  border-radius: 5px;
  border: 0.1px solid black;
  background-color: ${(props) => props.theme.colors.inactive};
`;

export const StationButton = styled.TouchableOpacity`
  margin: 1% 0;
  height: 100%;
  border-radius: 5px;
  border: 0.1px solid black;
  background-color: ${(props) =>
    props.active
      ? props.theme.colors.active
      : props.theme.colors.secondaryButton};
  /* color: ${(props) => props.theme.colors.active}; */
`;

// INPUTS

export const SearchDestinationContainer = styled.View`
  height: 50px;
`;

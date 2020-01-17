import styled from "styled-components";
import {
  mixinText,
  mixinBackground,
  mixinSecondaryHeadline
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
  margin-top: 16%;
`;

export const LayoutView = styled.SafeAreaView`
  ${mixinBackground}
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 0 10% 2% 10%;
`;

export const DestinationsView = styled.ScrollView`
  width: 100%;
  max-height: 40%;
  height: auto;
  margin-top: 5%;
  border-radius: 5px;
  padding: ${({ showPadding }) => (showPadding ? "5% 0" : "0")};
  background-color: ${props => props.theme.colors.secondary};
`;

export const StationView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
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
  color: ${props => props.theme.colors.primaryText};
  font-size: ${props => props.theme.font.buttonSize};
  text-align: center;
`;

//BUTTONS

export const PrimaryButton = styled.TouchableOpacity`
  width: 90%;
  margin: 2%;
  padding: 4%;
  border-radius: 5px;
  border: 0.1px solid black;
  background-color: ${props => props.theme.colors.primaryButton};
`;

export const StationButton = styled.TouchableOpacity`
  width: 100%;
  margin: 1% 0;
  padding: 3%;
  border-radius: 5px;
  border: 0.1px solid black;
  background-color: ${props =>
    props.active
      ? props.theme.colors.buttonActive
      : props.theme.colors.secondaryButton};
  color: ${props => props.theme.colors.secondaryText};
`;

// INPUTS

export const SearchDestinationInput = styled.TextInput`
  flex: 1;
  font-size: 20px;
  text-align: left;
`;

export const SearchDestinationContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  padding: 0% 5%;
  height: 50px;
  top: 15%;
`;

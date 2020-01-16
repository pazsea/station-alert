import styled from "styled-components";
import { mixinText, mixinBackground } from "../../themes/mixins";

// IMAGES

export const Image = styled.Image`
  margin-top: 45%;
  width: 100%;
  height: 45%;
`;

// LAYOUT

export const ContainerView = styled.View`
  width: 90%;
`;

export const LayoutView = styled.SafeAreaView`
  ${mixinBackground}
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 0 10% 2% 10%;
`;

// FONTS

export const PrimaryText = styled.Text`
  ${mixinText}
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
  width: 100%;
  background-color: white;
  border-radius: 5px;
  border-color: lightgrey;
  border-style: solid;
  padding: 3%;
  margin-top: ${({ startedSearching }) => (startedSearching ? "15%" : "0%")};
  font-size: 20px;
  text-align: center;
`;

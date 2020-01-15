import styled from "styled-components";
import { mixinText } from "../../themes/mixins";

//FONTS

export const PrimaryText = styled.Text`
  ${mixinText}
`;

//BUTTONS

export const PrimaryButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 2%;
  padding: 4%;
  border-radius: 10px;
  
  /* box-shadow: 10px 10px 10px -10px rgba(0,0,0,0.39); */
  background-color: ${props => props.theme.colors.primaryButtonColor};
  color: ${props => props.theme.colors.primaryTextColor};
`;

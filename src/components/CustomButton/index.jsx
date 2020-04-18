import React, { useContext } from "react";
import { Button, ThemeContext } from "react-native-elements";

const CustomButton = ({
  isInactive,
  isActive,
  isSecondary,
  isChoice,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);

  const colors = theme.colors;

  const checkButtonBackground = isInactive
    ? colors.inactive
    : isActive
    ? colors.active
    : isSecondary
    ? colors.secondary
    : false;

  const normalButtonStyles = {
    containerStyle: {
      width: "100%",
    },
    buttonStyle: {
      backgroundColor:
        checkButtonBackground || theme.Button.buttonStyle.backgroundColor,
    },
  };

  const choiceButtonStyles = {
    titleStyle: {
      color: isActive ? colors.secondary : colors.primary,
    },
    buttonStyle: {
      backgroundColor: isActive ? colors.active : colors.secondary,
      borderWidth: 0,
      marginRight: 5,
      marginTop: 2,
      marginBottom: 2,
      alignItems: "baseline",
    },
  };

  return isChoice ? (
    <Button
      buttonStyle={choiceButtonStyles.buttonStyle}
      titleStyle={choiceButtonStyles.titleStyle}
      // containerStyle={choiceButtonStyles.containerStyle}
      {...props}
    />
  ) : (
    <Button
      containerStyle={normalButtonStyles.containerStyle}
      buttonStyle={normalButtonStyles.buttonStyle}
      {...props}
    />
  );
};

export default CustomButton;

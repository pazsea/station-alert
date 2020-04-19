import React, { useContext } from "react";
import { Button, ThemeContext, Icon } from "react-native-elements";

const CustomButton = ({
  isInactive,
  isActive,
  isSecondary,
  isChoice,
  addIcon,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);

  const colors = theme.colors;

  const checkButtonBackground = isInactive
    ? colors.accent
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

  const hasIcon = addIcon ? (
    <Icon
      name={addIcon.name}
      type={addIcon.type || "ionicon"}
      color={addIcon.color || colors.secondary}
      containerStyle={{
        marginLeft: 15,
      }}
      {...addIcon}
    ></Icon>
  ) : null;

  return isChoice ? (
    <Button
      buttonStyle={choiceButtonStyles.buttonStyle}
      titleStyle={choiceButtonStyles.titleStyle}
      {...props}
    />
  ) : (
    <Button
      containerStyle={normalButtonStyles.containerStyle}
      buttonStyle={normalButtonStyles.buttonStyle}
      icon={hasIcon}
      iconRight
      {...props}
    />
  );
};

export default CustomButton;

import React, { useContext } from "react";
import { Button, ThemeContext, Icon } from "react-native-elements";

const CustomButton = ({
  hasError,
  isSelected,
  isSecondary,
  isChoice,
  addIcon,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);

  const colors = theme.colors;

  const checkButtonBackground = hasError
    ? colors.error
    : isSelected
    ? colors.selected
    : isSecondary
    ? colors.secondary
    : false;

  const checkButtonTextColor = isSecondary
    ? colors.onSecondary
    : isChoice
    ? colors.onPrimaryVariant
    : hasError
    ? colors.onError
    : colors.onPrimary;

  const checkButtonIconColor = isSecondary
    ? colors.onSecondary
    : isChoice
    ? colors.onPrimaryVariant
    : hasError
    ? colors.onError
    : colors.onPrimary;

  const normalButtonStyles = {
    containerStyle: {
      width: "100%",
    },
    titleStyle: {
      color: checkButtonTextColor,
    },
    buttonStyle: {
      backgroundColor:
        checkButtonBackground || theme.Button.buttonStyle.backgroundColor,
    },
  };

  const choiceButtonStyles = {
    titleStyle: {
      color: isSelected ? colors.onSelected : colors.onPrimaryVariant,
    },
    buttonStyle: {
      backgroundColor: isSelected ? colors.selected : colors.primaryVariant,
      borderRadius: 5,
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
      iconStyle={{ color: checkButtonIconColor }}
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
      titleStyle={normalButtonStyles.titleStyle}
      icon={hasIcon}
      iconRight
      {...props}
    />
  );
};

export default CustomButton;

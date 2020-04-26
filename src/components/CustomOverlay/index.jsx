import React, { useContext } from "react";
import { View, KeyboardAvoidingView } from "react-native";
import { ThemeContext, Overlay, Text } from "react-native-elements";
import CustomButton from "../CustomButton";

const CustomOverlay = ({
  buttons,
  overlayTextContent,
  overlayTitle,
  customInput,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);

  const renderButtons = buttons
    ? buttons.map((button, index) => {
        return (
          <CustomButton
            {...button}
            key={index}
            containerStyle={{
              flex: 1,
            }}
          />
        );
      })
    : null;

  return (
    <Overlay
      {...props}
      overlayBackgroundColor={theme.colors.surface}
      overlayStyle={{
        padding: 20,
      }}
      animated={true}
      animationType={"fade"}
      height={250}
    >
      <KeyboardAvoidingView
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "auto",
          flex: 1,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text h3>{overlayTitle}</Text>
          {customInput || (
            <Text
              style={{
                textAlign: "center",
                paddingTop: 10,
              }}
            >
              {overlayTextContent}
            </Text>
          )}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {renderButtons}
        </View>
      </KeyboardAvoidingView>
    </Overlay>
  );
};

export default CustomOverlay;

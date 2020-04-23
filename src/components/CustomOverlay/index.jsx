import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { LayoutView } from "../../components/styles";
import { ThemeContext, Overlay, Text, Input } from "react-native-elements";
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
        // height: "auto",
        // flex: 0.4,
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
          <Text
            style={{
              textAlign: "center",
              paddingTop: 10,
            }}
          >
            {overlayTextContent}
          </Text>
          {customInput || null}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {renderButtons}
        </View>
      </KeyboardAvoidingView>
    </Overlay>
  );
};

export default CustomOverlay;

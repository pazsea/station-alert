import React from "react";

import trainlogo from "../../../images/trainlogo.png";
import splashScreen from "../../../assets/splash.png";
import { View, Image } from "react-native";

const ImageContainer = ({ showSplash }) => {
  return (
    <View style={{ width: "100%" }}>
      <Image
        style={{
          width: "100%",
          height: showSplash ? "100%" : 110,
          alignSelf: "center",
        }}
        resizeMode={"contain"}
        source={showSplash ? splashScreen : trainlogo}
      />
    </View>
  );
};

export default ImageContainer;

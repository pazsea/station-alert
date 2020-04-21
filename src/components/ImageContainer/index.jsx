import React from "react";

import trainlogo from "../../../images/trainlogo.png";
import { View, Image } from "react-native";

const ImageContainer = () => {
  return (
    <View style={{ marginBottom: "5%", width: "100%" }}>
      <Image
        // resizeMethod={"scale"}
        style={{ width: "100%", alignSelf: "center" }}
        resizeMode={"contain"}
        source={trainlogo}
      />
    </View>
  );
};

export default ImageContainer;

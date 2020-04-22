import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { LayoutView, ContainerView } from "../../components/styles";
import { Card, Icon, Input, Overlay, Text } from "react-native-elements";
import { useGoBack } from "../../constant";
import CustomButton from "../../components/CustomButton";
import { ThemeContext } from "react-native-elements";
import firebase from "../../../store/Firebase";
import { useForm } from "react-hook-form";
import { validateEmail } from "../../constant";
import { UserDetailsContext } from "../../../store/userDetails";

const INITIAL_ERROR_STATE = {
  status: false,
  message: "",
};

const Register = (props) => {
  const [errorState, setErrorState] = useState(INITIAL_ERROR_STATE);

  const {
    userInfo: [{ userSignedIn }, setUserDetails],
    clearUserDetails,
  } = useContext(UserDetailsContext);

  const { theme } = useContext(ThemeContext);

  const { register, handleSubmit, setValue, errors } = useForm();
  const { navigate } = props.navigation;

  async function onSubmit(data) {
    try {
      await firebase.login(data.email, data.password);
      await firebase
        .user(firebase.getCurrentUid())
        .get()
        .then((snapshot) => {
          let details = snapshot.data(); //data är ett objekt..
          details.userSignedIn = true;
          setUserDetails(details);
        });
      //   await firebase.user(firebase.getCurrentUid()).set({
      //     name: data.name,
      //     email: data.email,
      //     favRoutes: [],
      //     avatar: null,
      //   });
      //   await setUserDetails((prevState) => ({
      //     ...prevState,
      //     name: data.name,
      //     email: data.email,
      //     userUid: firebase.getCurrentUid(),
      //     userSignedIn: true,
      //   }));
      await navigate("MoreScreen");
    } catch (error) {
      setErrorState({
        status: true,
        message: error.message,
      });
    }
  }

  useEffect(() => {
    register("email", {
      required: true,
      validate: (value) => validateEmail(value),
    });
    register("password", { required: true, minLength: 6 });
  }, [register]);

  useGoBack(() => navigate("MoreScreen"));

  const content = (
    <>
      <Overlay
        isVisible={errorState.status}
        overlayBackgroundColor={theme.colors.surface}
        onBackdropPress={() => setErrorState(INITIAL_ERROR_STATE)}
        overlayStyle={{
          padding: 20,
          height: "auto",
          flex: 0.3,
        }}
      >
        <View
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
            <Text h3>Something went wrong...</Text>
            <Text
              style={{
                textAlign: "center",
                paddingTop: 10,
              }}
            >
              {errorState.message}
            </Text>
          </View>
          <CustomButton
            title={"Got it!"}
            addIcon={{ name: "ios-thumbs-up" }}
            iconRight
            onPress={() => setErrorState(INITIAL_ERROR_STATE)}
          ></CustomButton>
        </View>
      </Overlay>
      <Card title={"Sign in"}>
        <Input
          containerStyle={{
            paddingTop: 10,
            paddingBottom: 10,
          }}
          placeholder="Email"
          textContentType={"emailAddress"}
          errorMessage={errors.email && "You have to supply a valid email"}
          onChangeText={(text) => {
            setValue("email", text);
          }}
          leftIcon={<Icon name="email" size={24} color="black" />}
        />
        <Input
          containerStyle={{
            paddingTop: 10,
            paddingBottom: 15,
          }}
          placeholder="Password"
          secureTextEntry={true}
          textContentType={"password"}
          errorMessage={errors.password && "Minimum 6 letter"}
          onChangeText={(text) => {
            setValue("password", text);
          }}
          leftIcon={
            <Icon
              name="ios-finger-print"
              size={24}
              color="black"
              type={"ionicon"}
            />
          }
        />
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          addIcon={{ name: "ios-person-add" }}
          title={"Sign In"}
        />
        <CustomButton
          isSecondary
          containerStyle={{
            paddingBottom: 10,
            paddingTop: 10,
          }}
          addIcon={{
            name: "ios-arrow-back",
            size: 20,
            style: {
              marginRight: 10,
              marginLeft: 0,
            },
          }}
          onPress={() => navigate("MoreScreen")}
          title={"Go back"}
          iconRight={false}
        />
      </Card>
    </>
  );

  return (
    <LayoutView centered primaryColor={theme.colors.background}>
      {content}
    </LayoutView>
  );
};

export default Register;

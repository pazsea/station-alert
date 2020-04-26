// General
import React, { useEffect, useContext } from "react";

// Context & Stores
import { ThemeContext } from "react-native-elements";
import { UserDetailsContext } from "../../../store/userDetails";
import { PermissionsContext } from "../../../store/permissionsStore";

// Styles
import { LayoutView } from "../../components/styles";

// Components
import { Card, Icon, Input } from "react-native-elements";
import CustomButton from "../../components/CustomButton";
import CustomOverlay from "../../components/CustomOverlay";

// Constants and lib functions
import { useGoBack, validateEmail } from "../../constant";
import { useForm } from "react-hook-form";

// Backend
import firebase from "../../../store/Firebase";

const Register = (props) => {
  const {
    userInfo: [userDetails, setUserDetails],
    authState: [{ authLoading, errorStatus, errorMessage }, setAuthState],
    logOut,
    resetError,
    hasError,
  } = useContext(UserDetailsContext);

  const {
    permissionsInfo: [permissions, setPermissions],
    registerForPushNotificationsAsync,
  } = useContext(PermissionsContext);

  const { theme } = useContext(ThemeContext);

  const { register, handleSubmit, setValue, errors } = useForm();
  const { navigate } = props.navigation;

  async function onSubmit(data) {
    try {
      await setAuthState((prevState) => ({
        ...prevState,
        authLoading: true,
      }));
      await firebase.login(data.email, data.password);
      await registerForPushNotificationsAsync();
      await setAuthState((prevState) => ({
        ...prevState,
        authLoading: false,
        signedIn: true,
      }));

      await navigate("MoreScreen");
    } catch (error) {
      console.log(error.message);
      hasError(error.message);
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
      <CustomOverlay
        isVisible={errorStatus}
        animationsType={"slide"}
        overlayTitle={"Something went wrong..."}
        overlayTextContent={errorMessage}
        onBackdropPress={resetError}
        buttons={[
          {
            title: "Got it!",
            addIcon: {
              name: "ios-thumbs-up",
            },
            iconRight: true,
            onPress: resetError,
          },
        ]}
      />
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
          loading={authLoading}
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

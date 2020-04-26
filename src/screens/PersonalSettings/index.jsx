// General
import React, { useEffect, useContext } from "react";
import * as ImagePicker from "expo-image-picker";

// Context & Stores
import { ThemeContext } from "react-native-elements";
import { UserDetailsContext } from "../../../store/userDetails";

// Styles
import { LayoutView, ContainerView } from "../../components/styles";

// Components
import { Text } from "react-native";
import { Card, Icon, Input } from "react-native-elements";
import CustomButton from "../../components/CustomButton";

// Constants and lib functions
import { useForm } from "react-hook-form";
import { useGoBack, validateEmail, uriToBlob } from "../../constant";

// Backend
import firebase from "../../../store/Firebase";

const PersonalSettings = (props) => {
  // ** ---------States --------- **
  // ** ---------Contexts --------- **
  const {
    userInfo: [{ name, email }],
    authState: [{ authLoading, errorMessage, statusMessage }, setAuthState],
    hasError,
    hasStatus,
  } = useContext(UserDetailsContext);

  // ** ---------Themes --------- **
  const { theme } = useContext(ThemeContext);

  // ** ---------Variables --------- **
  const { navigate } = props.navigation;
  const { register, handleSubmit, setValue, errors } = useForm();

  // ** ---------Use Effect (lifecycles) --------- **
  useEffect(() => {
    register("name");
    register("email", {
      validate: (value) => validateEmail(value || email),
    });
    register("password");
  }, [register]);

  // ** ---------Functions --------- **
  useGoBack(() => navigate("MoreScreen"));

  async function onSave(data) {
    try {
      await setAuthState((prevState) => ({
        ...prevState,
        authLoading: true,
      }));
      await firebase.updateEmail(data.email || email);
      await firebase.updatePassword(data.password);
      await firebase.user(firebase.getCurrentUid()).update({
        name: data.name || name,
        email: data.email || email,
      });
      await hasStatus("Saved");
    } catch (error) {
      hasError(error.message);
    }
  }

  const uploadImage = (blob, uid) => {
    setAuthState((prevState) => ({
      ...prevState,
      authLoading: true,
    }));

    return new Promise((resolve, reject) => {
      var storageRef = firebase.imageUser(uid);

      storageRef
        .child("profie.jpg")
        .put(blob, {
          contentType: "image/jpeg",
        })
        .then((snapshot) => {
          blob.close();

          resolve(snapshot);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const choosePhoto = async () => {
    const uid = await firebase.getCurrentUid();

    ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
    })
      .then((result) => {
        if (!result.cancelled) {
          // User picked an image
          const { height, width, type, uri } = result;
          return uriToBlob(uri);
        }
      })
      .then((blob) => {
        return uploadImage(blob, uid);
      })
      .then(async (snapshot) => {
        console.log(snapshot.ref.getDownloadURL());
        await snapshot.ref.getDownloadURL().then((avaiUrl) => {
          firebase.user(uid).update({
            img: avaiUrl,
          });
        });
        hasStatus("Saved");
      })
      .catch((error) => {
        hasError(error.message);
        // throw error;
      });
  };

  return (
    <LayoutView centered primaryColor={theme.colors.background}>
      <ContainerView>
        <Card
          title={"Personal settings"}
          containerStyle={{ margin: 0, borderRadius: 5 }}
        >
          <Input
            placeholder={name}
            placeholderTextColor={"green"}
            containerStyle={{
              paddingBottom: 10,
            }}
            onChangeText={(text) => {
              setValue("name", text);
            }}
            leftIcon={<Icon name="people" size={24} color="black" />}
            leftIconContainerStyle={{ marginEnd: 5, marginStart: 5 }}
          />
          <Input
            placeholder={email}
            placeholderTextColor={"green"}
            containerStyle={{
              paddingTop: 10,
              paddingBottom: 5,
            }}
            onChangeText={(text) => {
              setValue("email", text);
            }}
            leftIcon={<Icon name="email" size={24} color="black" />}
            leftIconContainerStyle={{ marginEnd: 5, marginStart: 5 }}
          />
          <Input
            containerStyle={{
              paddingTop: 10,
              paddingBottom: 15,
            }}
            placeholder="**Secret**"
            secureTextEntry={true}
            textContentType={"password"}
            errorMessage={errors.password && "Need to be a valid password"}
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
          <Text
            style={{
              color: errorMessage ? theme.colors.error : theme.colors.selected,
              textAlign: "center",
              paddingBottom: 2,
            }}
          >
            {errorMessage || statusMessage}
          </Text>
          <CustomButton
            isSelected
            onPress={handleSubmit(onSave)}
            addIcon={{ name: "save", type: "font-awesome" }}
            title={"Save"}
            loading={authLoading}
          />
          <CustomButton
            onPress={choosePhoto}
            containerStyle={{
              marginTop: 10,
            }}
            addIcon={{ name: "camera", type: "font-awesome" }}
            title={"Choose avatar"}
            loading={authLoading}
          />
          <CustomButton
            isSecondary
            containerStyle={{
              // paddingBottom: 10,
              marginTop: 10,
            }}
            addIcon={{
              name: "ios-arrow-back",
              size: 15,
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
      </ContainerView>
    </LayoutView>
  );
};

export default PersonalSettings;

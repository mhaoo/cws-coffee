import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  useContext,
} from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import OTPTextView from "react-native-otp-textinput";
import GeneralButton from "../../../components/button/generalButton";
import * as Keychain from "react-native-keychain";
import { AuthContext } from "../../../api/authContext";
import { AxiosContext } from "../../../api/providerContext";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// import { firebaseConfig } from "../../../config/firebase";
// import firebase from "firebase/compat/app";

const { width, height } = Dimensions.get("screen");

export default Login = function ({ navigation }) {
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false); // Doi mau vien cua text input khi nhan vao nhap
  const [inputEmail, setInputEmail] = useState("");
  const [inputPass, setInputPass] = useState("");
  const bottomSheetRef = useRef(null);
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  // const authContext = useContext(AuthContext);
  // const { publicAxios } = useContext(AxiosContext);

  const [isVisible, setIsVisible] = useState(false); // State to control BottomSheet visibility

  const handleLoginPress = () => {
    // setIsVisible(true); // Show BottomSheet when "Đăng nhập" is pressed
    // sendVerification();
    navigation.navigate("Home");
  };

  // const handleLoginPress = async () => {
  //   try {
  //     const response = await publicAxios.post("/auth/login/email", {
  //       email: inputEmail,
  //       password: inputPass,
  //     });

  //     console.log(response.data);

  //     const { accessToken, refreshToken } = response.data;
  //     authContext.setAuthState({
  //       accessToken,
  //       refreshToken,
  //       authenticated: true,
  //     });

  //     await Keychain.setGenericPassword(
  //       "token",
  //       JSON.stringify({
  //         accessToken,
  //         refreshToken,
  //       })
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const checkPasswordValidity = (value) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return "Password must not contain Whitespaces";
    }

    // const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    // if (!isContainsUppercase.test(value)) {
    //   return 'Password must have at least one Uppercase Character.';
    // }

    // const isContainsLowercase = /^(?=.*[a-z]).*$/;
    // if (!isContainsLowercase.test(value)) {
    //   return 'Password must have at least one Lowercase Character.';
    // }

    // const isContainsNumber = /^(?=.*[0-9]).*$/;
    // if (!isContainsNumber.test(value)) {
    //   return 'Password must contain at least one Digit.';
    // }

    // const isValidLength = /^.{8,16}$/;
    // if (!isValidLength.test(value)) {
    //   return 'Password must be 8-16 Characters Long.';
    // }

    // const isContainsSymbol =
    //   /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    // if (!isContainsSymbol.test(value)) {
    //   return 'Password must contain at least one Special Symbol.';
    // }

    return null;
  };

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      setIsVisible(false); // Hide BottomSheet when fully collapsed
    }
  }, []);

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
  };

  // const confirmCode = () => {
  //   const credential = firebase.auth.PhoneAuthProvider.credential(
  //     verificationId,
  //     code
  //   );
  //   firebase
  //     .auth()
  //     .signInWithCredential(credential)
  //     .then(() => {
  //       setCode("");
  //       navigation.navigate("Register");
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  //   Alert.alert("Login successful");
  // };

  return (
    <ImageBackground
      source={require("../../../images/background1.jpg")}
      resizeMode="cover"
      style={styles.container}
    >
      {/* <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={styles.container}
      > */}
      <View style={styles.loginContainer}>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>Chào mừng bạn đến với</Text>
          <Text style={styles.labelText}>COWORKING SPACE COFFEE</Text>
        </View>
        <TextInput
          style={[
            styles.textInput,
            { borderColor: isFocusedEmail ? "#93540A" : "#A8A8A8" },
          ]}
          placeholder="Nhập email hoặc số điện thoại"
          placeholderTextColor="#A8A8A8"
          onChangeText={setInputEmail}
          value={inputEmail}
          onFocus={() => setIsFocusedEmail(true)}
          onBlur={() => setIsFocusedEmail(false)}
          selectionColor={isFocusedEmail ? "#93540A" : "#A8A8A8"}
        ></TextInput>
        <TextInput
          style={[
            styles.textInput,
            { borderColor: isFocusedPass ? "#93540A" : "#A8A8A8" },
          ]}
          placeholder="Nhập password"
          placeholderTextColor="#A8A8A8"
          onChangeText={setInputPass}
          value={inputPass}
          onFocus={() => setIsFocusedPass(true)}
          onBlur={() => setIsFocusedPass(false)}
          selectionColor={isFocusedPass ? "#93540A" : "#A8A8A8"}
        ></TextInput>
        <View style={styles.loginButtonContainer}>
          <GeneralButton text="Đăng nhập" onPress={handleLoginPress} />
        </View>
        <View style={styles.horizontalLineContainer}>
          <View style={styles.horizontalLine}></View>
          <Text style={styles.orText}>HOẶC</Text>
          <View style={styles.horizontalLine}></View>
        </View>
        {/* <Button title="Tiep tuc bang Facebook"></Button>
        <Button title="Tiep tuc bang Google"></Button> */}
      </View>

      {/* {isVisible && (
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={["80%"]}
          handleIndicatorStyle={styles.headerIndicator} // use for hide indicator on header
          enablePanDownToClose={true}
        >
          <BottomSheetView style={styles.bottomSheetContainer}>
            <Text>Xac nhan Ma OTP</Text>
            <Text>Ma xac thuc gom 6 so da duoc gui den</Text>
            <Text>so dien thoai</Text>
            <Text>Nhap ma de tiep tuc</Text>
            <OTPTextView inputCount="6"></OTPTextView>
            <TouchableOpacity
              onPress={navigation.navigate("Register")}
              style={styles.rawStyle}
            >
              <Text>Tiep tuc</Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      )} */}
      {/* </KeyboardAvoidingView> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  loginContainer: {
    flex: 0.7,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "white",
  },
  welcomeTextContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 16,
    lineHeight: height * 0.05,
  },
  labelText: {
    fontSize: 21,
    fontWeight: "600",
    color: "#93540A",
    lineHeight: height * 0.05,
  },
  textInput: {
    fontSize: 16,
    height: height * 0.06,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: width * 0.075,
    marginBottom: width * 0.06,
    backgroundColor: "#F9F9F9",
  },
  loginButtonContainer: {
    flex: 0.2,
    justifyContent: "center",
  },
  horizontalLineContainer: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: width * 0.075,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#A8A8A8",
  },
  orText: {
    fontSize: 14,
    fontWeight: "600",
    marginHorizontal: width * 0.03,
    color: "#A8A8A8",
  },
  bottomSheetContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerIndicator: {
    height: 0,
  },
  rawStyle: {
    marginTop: 0,
  },
});

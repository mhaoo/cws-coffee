import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";
import {
  app,
  getApp,
  auth,
  useAuth,
  firebaseConfig,
} from "../../firebaseConfig";
import { PhoneAuthProvider } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

const Component = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const [countryCode, setCountryCode] = useState("30");
  const recaptchaVerifier = useRef(null);
  const { setUserAuth } = useAuth();

  const formatPhoneNumber = (newValue) => {
    const numericValue = newValue.replace(/\D/g, "");
    setPhoneNumberValue(numericValue);
  };

  const AuthWithPhone = async () => {
    try {
      setLoading(true);
      const formattedPhone = `+${countryCode}` + phoneNumberValue;

      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        formattedPhone,
        recaptchaVerifier.current
      );

      setUserAuth((prevUserAuth) => ({
        ...prevUserAuth,
        phoneNumber: formattedPhone,
        verificationId: verificationId,
        message: "Verification code has been sent to your phone.",
      }));

      setLoading(false);
      navigation.navigate("OTPVerification");
    } catch (err) {
      console.log("Verification error:", err);
      setUserAuth((prevUserAuth) => ({
        ...prevUserAuth,
        message: `Error: ${err.message}`,
      }));
      setLoading(false);
    }
  };

  return (
    <>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      />
      <TextInput
        value={phoneNumberValue}
        placeholder="6912345678"
        keyboardType="phone-pad"
        autoCompleteType="tel"
        onFocus={() => setInputBorder("black")} // Consider defining `setInputBorder` if needed
        onChangeText={(value) => formatPhoneNumber(value)}
      />
      {/* Your button and other components go here */}
    </>
  );
};

export default Component;

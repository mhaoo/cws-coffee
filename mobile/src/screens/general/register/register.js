import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import GeneralButton from "../../../components/button/generalButton";

const { width, height } = Dimensions.get("screen");

export default Register = function ({ navigation }) {
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPassFocused, setIsPassFocused] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPass, setInputPass] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkPasswordValidity = (value) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return "Mật khẩu không được chứa khoảng trắng";
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return "Mật khẩu phải có ít nhất một ký tự viết hoa";
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return "Mật khẩu phải có ít nhất một ký tự viết thường";
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return "Mật khẩu phải chứa ít nhất một chữ số";
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return "Mật khẩu phải có độ dài từ 8-16 ký tự";
    }

    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(value)) {
      return "Mật khẩu phải chứa ít nhất một ký tự đặc biệt";
    }

    return null;
  };

  const handleRegisterPress = async () => {
    if (!inputName.trim()) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập tên của bạn");
      return;
    }
    if (!isValidEmail(inputEmail)) {
      Alert.alert("Email không hợp lệ", "Vui lòng nhập đúng định dạng email");
      return;
    }
    if (checkPasswordValidity(inputPass)) {
      Alert.alert("Mật khẩu không hợp lệ", checkPasswordValidity(inputPass));
      return;
    }
    try {
      const response = await axios.post(
        "http://192.168.2.63:3000/v1/auth/register/email",
        {
          name: inputName,
          email: inputEmail,
          password: inputPass,
        }
      );
      Alert.alert("Đăng ký thành công", "Tài khoản của bạn đã được tạo.");
      navigation.navigate("Home");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        Alert.alert("Đăng ký thất bại", error.response.data.message);
      } else {
        Alert.alert("Đăng ký thất bại", "Có lỗi xảy ra, vui lòng thử lại");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TextInput
          style={[
            styles.textInput,
            { borderColor: isNameFocused ? "#93540A" : "#A8A8A8" },
          ]}
          placeholder="Nhập tên của bạn"
          placeholderTextColor="#A8A8A8"
          onChangeText={setInputName}
          value={inputName}
          onFocus={() => setIsNameFocused(true)}
          onBlur={() => setIsNameFocused(false)}
          selectionColor={isNameFocused ? "#93540A" : "#A8A8A8"}
        ></TextInput>
        <TextInput
          style={[
            styles.textInput,
            { borderColor: isNameFocused ? "#93540A" : "#A8A8A8" },
          ]}
          placeholder="Nhập email của bạn"
          placeholderTextColor="#A8A8A8"
          onChangeText={setInputEmail}
          value={inputEmail}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
          selectionColor={isEmailFocused ? "#93540A" : "#A8A8A8"}
        ></TextInput>
        <TextInput
          style={[
            styles.textInput,
            { borderColor: isPassFocused ? "#93540A" : "#A8A8A8" },
          ]}
          placeholder="Nhập mật khẩu của bạn"
          placeholderTextColor="#A8A8A8"
          onChangeText={setInputPass}
          value={inputPass}
          onFocus={() => setIsPassFocused(true)}
          onBlur={() => setIsPassFocused(false)}
          selectionColor={isPassFocused ? "#93540A" : "#A8A8A8"}
        ></TextInput>
        <GeneralButton text="Tạo tài khoản" onPress={handleRegisterPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  contentContainer: {
    flex: 0.95,
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
});

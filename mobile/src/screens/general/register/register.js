import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import GeneralButton from "../../../components/button/generalButton";

const { width, height } = Dimensions.get("screen");

export default Register = function ({ navigation }) {
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isPassFocused, setIsPassFocused] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputPass, setInputPass] = useState("");

  return (
    <View style={styles.container}>
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
      <GeneralButton text="Tạo tài khoản" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    fontSize: 16,
    height: height * 0.06,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: width * 0.075,
    backgroundColor: "#F9F9F9",
  },
});

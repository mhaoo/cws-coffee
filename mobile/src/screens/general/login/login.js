import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Button,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import OTPTextView from "react-native-otp-textinput";
const { width, height } = Dimensions.get("screen");

export default Login = function ({ navigation }) {
  const bottomSheetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false); // State to control BottomSheet visibility

  const handleLoginPress = () => {
    setIsVisible(true); // Show BottomSheet when "Đăng nhập" is pressed
  };

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      setIsVisible(false); // Hide BottomSheet when fully collapsed
    }
  }, []);

  // const snapPoints = useMemo(() => ["25%", "50%"], []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.welcomeTextContainer}>
          <Text>Chao mung ban den voi</Text>
          <Text>COWORKING SPACE COFFEE</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Nhap so dien thoai"></TextInput>
        </View>
        <Button title="Dang nhap" onPress={handleLoginPress}></Button>
        <View style={styles.horizontalLine}>
          <Text>HOAC</Text>
        </View>
        <Button title="Tiep tuc bang Facebook"></Button>
        <Button title="Tiep tuc bang Google"></Button>
      </View>

      {isVisible && (
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
              onPress={() => navigation.navigate("Register")}
              style={styles.rawStyle}
            >
              <Text>Tiep tuc</Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
    backgroundColor: "pink",
  },
  loginContainer: {
    flex: 0.7,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "white",
  },
  welcomeTextContainer: {
    flex: 0.2,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "lightgreen",
  },
  inputContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
  },
  horizontalLine: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
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

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  PixelRatio,
  TextInput,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";

const screenWidth = Dimensions.get("screen").width;
const headerHeightAndroid = PixelRatio.getPixelSizeForLayoutSize(64);
const headerHeightIOS = PixelRatio.getPixelSizeForLayoutSize(64);

export default SeatBookingHeader = function ({ navigation }) {
  const handleCardPress = () => {
    navigation.navigate("Giỏ hàng");
  };

  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.upperHeader}>
        <Text style={styles.headerText}>Đặt chỗ</Text>
        <TouchableOpacity onPress={handleCardPress}>
          <FontAwesome5 name="shopping-cart" size={28} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.lowerHeader}>
        <View style={styles.searchContainer}>
          <View style={styles.searchIconContainer}>
            <Feather name="search" size={24} color={"#93540A"} />
          </View>
          <TextInput
            placeholder="Tìm kiếm cửa hàng"
            placeholderTextColor="#A8A8A8"
          ></TextInput>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#F7B75740",
    height: Platform.OS === "android" ? headerHeightAndroid : headerHeightIOS,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  upperHeader: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: screenWidth * 0.06,
    marginBottom: screenWidth * 0.04,
  },
  icon: {
    marginBottom: screenWidth * 0.04,
    marginRight: screenWidth * 0.06,
  },
  lowerHeader: {
    flex: 0.5,
    justifyContent: "center",
  },
  searchContainer: {
    flex: 0.6,
    flexDirection: "row",
    borderRadius: 10,
    marginHorizontal: 20,
    backgroundColor: "#F1F1F1",
  },
  searchIconContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
});

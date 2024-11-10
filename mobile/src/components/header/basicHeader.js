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
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const headerHeightAndroid = PixelRatio.getPixelSizeForLayoutSize(36);
const headerHeightIOS = PixelRatio.getPixelSizeForLayoutSize(36);

export default BasicHeader = function ({ navigation, route }) {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={28} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{route.name}</Text>
      </View>
      <View style={styles.spacer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7B75740",
    height: Platform.OS === "android" ? headerHeightAndroid : headerHeightIOS,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: "center", // Căn giữa text trong container
    justifyContent: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
  },
  spacer: {
    width: 28,
  },
  icon: {
    color: "black",
  },
});

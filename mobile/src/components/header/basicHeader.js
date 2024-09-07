import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

export default BasicHeader = function ({ navigation }) {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={25} color="black" />
      </TouchableOpacity>
      <Text>Tao tai khoan</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#F7B757",
  },
});

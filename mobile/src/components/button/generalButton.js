import React from "react";
import { Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get("screen");

const GeneralButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.generalButtonContainer} onPress={onPress}>
      <Text style={styles.generalButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  generalButtonContainer: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.06,
    marginHorizontal: width * 0.075,
    backgroundColor: "#93540A",
  },
  generalButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});

export default GeneralButton;

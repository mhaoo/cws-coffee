import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  FlatList,
} from "react-native";

const { width, height } = Dimensions.get("screen");

export default Cart = function ({ navigation }) {
  return (
    <View style={styles.container}>
      <Text> This is Cart screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
});

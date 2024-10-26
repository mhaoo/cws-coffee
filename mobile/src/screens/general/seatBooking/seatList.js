import React, { useState, useRef } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  PixelRatio,
  ScrollView,
  Platform,
  Animated,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

const { width, height } = Dimensions.get("screen");

const roomData = [
  {
    id: "1",
    roomName: "Meeting POD 1",
    maxCapacity: "10",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "2",
    roomName: "Double POD 1",
    maxCapacity: "2",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "3",
    roomName: "Double POD 2",
    maxCapacity: "2",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "4",
    roomName: "Single POD 1",
    maxCapacity: "1",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "5",
    roomName: "Single POD 2",
    maxCapacity: "1",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "6",
    roomName: "Single POD 3",
    maxCapacity: "1",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
];

export default SeatList = function ({ navigation }) {
  const renderRoomList = ({ item }) => (
    <TouchableOpacity
      style={styles.roomDetailContainer}
      onPress={handleBookingPress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: item.uri,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.roomInformation}>
        <Text>{item.roomName}</Text>
        <Text>{item.maxCapacity}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleBookingPress = () => {
    navigation.navigate("SeatDetail");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={roomData}
        renderItem={renderRoomList}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  imageContainer: {
    flex: 0.3,
    alignItems: "center",
    backgroundColor: "aqua",
  },
  image: {
    height: PixelRatio.getPixelSizeForLayoutSize(40),
    width: width,
  },
});

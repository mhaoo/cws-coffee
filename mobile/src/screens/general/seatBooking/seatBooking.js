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
  Image,
  PixelRatio,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("screen");

const storeData = [
  {
    id: "1",
    branchName: "Chi nhanh 1",
    basicName: "CWS COFFEE",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "2",
    branchName: "Chi nhanh 2",
    basicName: "CWS COFFEE",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "3",
    branchName: "Chi nhanh 3",
    basicName: "CWS COFFEE",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "4",
    branchName: "Chi nhanh 4",
    basicName: "CWS COFFEE",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "5",
    branchName: "Chi nhanh 5",
    basicName: "CWS COFFEE",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "6",
    branchName: "Chi nhanh 6",
    basicName: "CWS COFFEE",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "7",
    branchName: "Chi nhanh 7",
    basicName: "CWS COFFEE",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "8",
    branchName: "Chi nhanh 8",
    basicName: "CWS COFFEE",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "9",
    branchName: "Chi nhanh 9",
    basicName: "CWS COFFEE",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
];

export default SeatBooking = function ({ navigation }) {
  const renderStoreListContainer = ({ item }) => (
    <TouchableOpacity
      style={styles.storeListContainer}
      onPress={handleStorePress}
    >
      <View style={styles.storeDetailContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.uri,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.storeDetail}>
          <Text style={styles.basicName}>{item.basicName}</Text>
          <Text style={styles.branchName}>{item.branchName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleStorePress = () => {
    navigation.navigate("SeatList");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={storeData}
        renderItem={renderStoreListContainer}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.headerText}>Danh sách cửa hàng:</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  storeListContainer: {
    marginHorizontal: 20,
  },
  storeDetailContainer: {
    flexDirection: "row",
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    padding: PixelRatio.getPixelSizeForLayoutSize(5),
  },
  image: {
    height: PixelRatio.getPixelSizeForLayoutSize(30),
    width: PixelRatio.getPixelSizeForLayoutSize(30),
    borderRadius: 8,
  },
  storeDetail: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 8,
  },
  basicName: {
    fontSize: 14,
    fontWeight: "semibold",
    color: "#A8A8A8",
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(4),
  },
  branchName: {
    fontSize: 16,
  },
});

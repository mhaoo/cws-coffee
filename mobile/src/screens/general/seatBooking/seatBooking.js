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
      style={styles.storeDetailContainer}
      onPress={handleStorePress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: item.uri,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.storeDetail}>
        <Text>{item.basicName}</Text>
        <Text>{item.branchName}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleStorePress = () => {
    navigation.navigate("SeatList");
  };

  return (
    <View style={styles.container}>
      <FlatList
        // contentContainerStyle={styles.renderStoreListContainer}
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
  storeDetailContainer: {
    flexDirection: "row",
    paddingBottom: 20,
  },
  imageContainer: {
    flex: 0.3,
    alignItems: "center",
    backgroundColor: "aqua",
  },
  image: {
    height: PixelRatio.getPixelSizeForLayoutSize(40),
    width: PixelRatio.getPixelSizeForLayoutSize(40),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(10),
  },
  storeDetail: {
    flex: 0.7,
    backgroundColor: "blue",
  },
});

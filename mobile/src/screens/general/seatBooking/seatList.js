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
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import GeneralButton from "../../../components/button/generalButton";

const { width, height } = Dimensions.get("screen");

const roomData = [
  {
    id: "1",
    roomName: "Meeting POD 1",
    maxCapacity: "10",
    price: "100000",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "2",
    roomName: "Double POD 1",
    maxCapacity: "2",
    price: "100000",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "3",
    roomName: "Double POD 2",
    maxCapacity: "2",
    price: "100000",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "4",
    roomName: "Single POD 1",
    maxCapacity: "1",
    price: "100000",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "5",
    roomName: "Single POD 2",
    maxCapacity: "1",
    price: "100000",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "6",
    roomName: "Single POD 3",
    maxCapacity: "1",
    price: "100000",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
];

export default SeatList = function ({ navigation }) {
  const renderHeader = () => (
    <View style={styles.storeDetailContainer}>
      <View style={styles.storeImageContainer}>
        <Image
          source={{
            uri: roomData[0].uri,
          }}
          style={styles.storeImage}
        />
      </View>
      <View style={styles.storeDescriptionContainer}>
        <Text style={styles.branchText}>Chi nhanh 1</Text>
        <View style={styles.locationContainer}>
          <Ionicons
            name="location-outline"
            size={20}
            style={styles.locationIcon}
          />
          <Text style={styles.locationText}>
            111 Duong Nam Ky Khoi Nghia, Phuong Vo Thi Sau, Quan 3, Ho Chi Minh
            City, Viet Nam
          </Text>
        </View>
        <View style={styles.clockContainer}>
          <Feather name="clock" size={20} style={styles.clockIcon} />
          <Text style={styles.clockText}>Mở cửa: 08:00 - 22:00</Text>
        </View>
        <View style={styles.phoneContainer}>
          <Feather name="phone" size={20} style={styles.phoneIcon} />
          <Text style={styles.phoneText}>18000909</Text>
        </View>
        <Text style={styles.descriptionHeaderText}>Giới thiệu</Text>
        <Text style={styles.descriptionText}>
          Thanh lap tu 2015, CWS Coffee la he thong cac quan ca phe van phong
          dau tien tai Viet Nam.
        </Text>
      </View>
    </View>
  );

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
      <View style={styles.roomInformationContainer}>
        <View style={styles.roomInformation}>
          <Text style={styles.roomName}>{item.roomName}</Text>
          <Text style={styles.capacity}>
            Số lượng tối đa: {item.maxCapacity}
          </Text>
          <Text style={styles.price}>Giá: {item.price}</Text>
        </View>
        <GeneralButton
          text="Đặt chỗ"
          style={styles.customSecondaryButton}
          onPress={handleBookingPress}
        />
      </View>
    </TouchableOpacity>
  );

  const handleBookingPress = () => {
    navigation.navigate("Chi tiết chỗ ngồi");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={roomData}
        renderItem={renderRoomList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
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
  storeDetailContainer: {
    marginBottom: 20,
  },
  storeImageContainer: {
    marginBottom: 12,
  },
  storeImage: {
    height: PixelRatio.getPixelSizeForLayoutSize(90),
    width: width,
  },
  storeDescriptionContainer: {
    marginHorizontal: 20,
  },
  branchText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  locationIcon: {
    color: "#A8A8A8",
    paddingRight: 12,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    color: "#A8A8A8",
  },
  clockContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  clockIcon: {
    color: "#A8A8A8",
    paddingRight: 12,
  },
  clockText: {
    flex: 1,
    fontSize: 14,
    color: "#A8A8A8",
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  phoneIcon: {
    color: "#A8A8A8",
    paddingRight: 12,
  },
  phoneText: {
    flex: 1,
    fontSize: 14,
    color: "#A8A8A8",
  },
  imageContainer: {
    flex: 0.3,
    alignItems: "center",
  },
  image: {
    height: PixelRatio.getPixelSizeForLayoutSize(80),
    width: width - 40,
    marginBottom: 12,
  },
  descriptionHeaderText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: "#A8A8A8",
  },
  roomDetailContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  roomInformationContainer: {
    flexDirection: "row",
  },
  roomInformation: {
    flex: 1,
  },
  roomName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  capacity: {
    fontSize: 14,
    color: "#A8A8A8",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#A8A8A8",
  },
  customSecondaryButton: {
    height: height * 0.045,
    width: width * 0.25,
    marginHorizontal: 0,
  },
});

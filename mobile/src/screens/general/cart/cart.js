import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
} from "react-native";
import SecondaryButton from "../../../components/button/secondaryButton";

const { width, height } = Dimensions.get("screen");

const data = [
  { id: "header1", type: "header", title: "Sản phẩm" },
  {
    id: "1",
    type: "product",
    title: "Phin sữa đá",
    size: "Size S",
    price: "50.000 VND",
    image: "https://example.com/image1.jpg",
    details: "Pudding phô mai...",
  },
  {
    id: "2",
    type: "product",
    title: "Phin sữa đá",
    size: "Size S",
    price: "50.000 VND",
    image: "https://example.com/image1.jpg",
    details: "Pudding phô mai...",
  },
  {
    id: "3",
    type: "product",
    title: "Phin sữa đá",
    size: "Size S",
    price: "50.000 VND",
    image: "https://example.com/image1.jpg",
    details: "Pudding phô mai...",
  },
  { id: "header2", type: "header", title: "Chỗ ngồi" },
  {
    id: "4",
    type: "seat",
    title: "Không gian cá nhân",
    seat: "F1A1",
    price: "70.000 VND",
    image: "https://example.com/seat1.jpg",
    duration: "2 tiếng",
    startTime: "9:30 ngày 26/05/2024",
  },
  { id: "header3", type: "header", title: "Thiết bị" },
  {
    id: "5",
    type: "equipment",
    title: "Bàn phím DareU",
    price: "80.000 VND",
    image: "https://example.com/equipment1.jpg",
    duration: "1 tiếng",
    date: "Ngày 26/05/2024",
  },
  {
    id: "6",
    type: "equipment",
    title: "Bàn phím DareU",
    price: "80.000 VND",
    image: "https://example.com/equipment1.jpg",
    duration: "1 tiếng",
    date: "Ngày 26/05/2024",
  },
  {
    id: "7",
    type: "equipment",
    title: "Bàn phím DareU",
    price: "80.000 VND",
    image: "https://example.com/equipment1.jpg",
    duration: "1 tiếng",
    date: "Ngày 26/05/2024",
  },
];

export default Cart = function ({ navigation }) {
  const renderItem = ({ item }) => {
    if (item.type === "header") {
      return <Text style={styles.header}>{item.title}</Text>;
    }

    switch (item.type) {
      case "product":
        return (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.productInfo}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.size}</Text>
              <Text style={styles.details}>{item.details}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{item.price}</Text>
                <TouchableOpacity style={styles.deleteButton}>
                  <Text style={styles.deleteText}>🗑</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      case "seat":
        return (
          <View style={styles.seatContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.seatInfo}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.seat}</Text>
              <Text style={styles.details}>
                {item.duration} - Bắt đầu: {item.startTime}
              </Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{item.price}</Text>
                <TouchableOpacity style={styles.deleteButton}>
                  <Text style={styles.deleteText}>🗑</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      case "equipment":
        return (
          <View style={styles.equipmentContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.equipmentInfo}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.details}>
                {item.duration} - {item.date}
              </Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{item.price}</Text>
                <TouchableOpacity style={styles.deleteButton}>
                  <Text style={styles.deleteText}>🗑</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.secondaryButtonContainer}>
          <SecondaryButton
            text="Xac nhan thanh toan"
            // price="55.000 vnđ"
            style={styles.secondaryButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  itemContainer: {
    flex: 0.86,
  },
  footerContainer: {
    flex: 0.14,
    flexDirection: "row",
    borderTopWidth: 0.25,
    borderTopColor: "#A8A8A8",
    backgroundColor: "#FFFFFF",
  },
  secondaryButtonContainer: {
    flex: 0.6,
    alignItems: "center",
    paddingTop: PixelRatio.getPixelSizeForLayoutSize(8),
  },
  productContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  seatContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  equipmentContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  image: { width: 50, height: 50, borderRadius: 5 },
  productInfo: { flex: 1, marginLeft: 10 },
  seatInfo: { flex: 1, marginLeft: 10 },
  equipmentInfo: { flex: 1, marginLeft: 10 },
  title: { fontWeight: "bold", fontSize: 16 },
  subtitle: { fontSize: 14, color: "#555" },
  details: { fontSize: 12, color: "#777" },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: { fontWeight: "bold", fontSize: 14, color: "#333" },
  deleteButton: { padding: 5 },
  deleteText: { fontSize: 16, color: "red" },
  header: { fontSize: 18, fontWeight: "bold", margin: 10 },
});

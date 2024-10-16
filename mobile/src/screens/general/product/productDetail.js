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
} from "react-native";
import { Checkbox } from "react-native-paper";
import SecondaryButton from "../../../components/button/secondaryButton";
import AddButton from "../../../components/button/addButton";
import ProductDetailHeader from "../../../components/header/productDetailHeader";

const { width, height } = Dimensions.get("window");
const headerHeightAndroid = PixelRatio.getPixelSizeForLayoutSize(36);
const headerHeightIOS = PixelRatio.getPixelSizeForLayoutSize(36);

export default ProductDetail = function ({ navigation }) {
  const [countAmountProduct, setCountAmountProduct] = useState(1);

  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedFlavors, setSelectedFlavors] = useState(["Vani"]);
  const [notes, setNotes] = useState("");

  const sizes = ["S", "M", "L"];
  const toppings = [
    "Trân châu sợi",
    "Pudding phô mai",
    "Thạch cà phê",
    "Hạt sen",
    "Rau câu sương sáo",
  ];
  const flavors = ["Đường", "Vani", "Bot", "Caramen"];

  const toggleTopping = (topping) => {
    setSelectedToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping]
    );
  };

  const toggleFlavor = (flavor) => {
    setSelectedFlavors((prev) =>
      prev.includes(flavor)
        ? prev.filter((f) => f !== flavor)
        : [...prev, flavor]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollViewContainer}>
        <ScrollView style={styles.scrollViewContent}>
          <View style={styles.productContainer}>
            <Image
              source={{ uri: "https://example.com/coffee-image.png" }}
              style={styles.productImage}
            />
            <Text style={styles.productTitle}>Cà phê ủ lạnh</Text>
            <Text style={styles.productPrice}>50.000 vnd</Text>
            <Text style={styles.productDescription}>
              Tận hưởng hương vị sâu lắng và đậm đà của Cà Phê Ủ Lạnh...
            </Text>
          </View>

          {/* Size Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizeOptions}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeOption,
                    selectedSize === size && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Toppings Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Topping</Text>
            {toppings.map((topping) => (
              <View key={topping} style={styles.checkboxContainer}>
                <Checkbox
                  status={selectedToppings[topping] ? "checked" : "unchecked"}
                  onPress={() => toggleTopping(topping)}
                />
                <Text style={styles.label}>{topping}</Text>
              </View>
            ))}
          </View>

          {/* Flavor Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hương vị</Text>
            {flavors.map((flavor) => (
              <View key={flavor} style={styles.checkboxContainer}>
                <Checkbox
                  status={selectedFlavors[flavor] ? "checked" : "unchecked"}
                  onPress={() => toggleFlavor(flavor)}
                />
                <Text style={styles.label}>{flavor}</Text>
              </View>
            ))}
          </View>

          {/* Notes Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Yêu cầu khác</Text>
            <TextInput
              style={styles.input}
              placeholder="Thêm ghi chú"
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.addAmountProductContainer}>
          <AddButton
            iconName="remove-outline"
            onPress={() =>
              setCountAmountProduct(Math.max(1, countAmountProduct - 1))
            }
          />
          <Text style={styles.countAmountProductText}>
            {countAmountProduct}
          </Text>
          <AddButton
            iconName="add"
            onPress={() => setCountAmountProduct(countAmountProduct + 1)}
          />
        </View>
        <View style={styles.secondaryButtonContainer}>
          <SecondaryButton
            text="Chọn"
            price="55.000 vnđ"
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
  scrollViewContainer: {
    flex: 0.86,
  },
  scrollViewContent: {},
  footerContainer: {
    flex: 0.14,
    flexDirection: "row",
    borderTopWidth: 0.25,
    borderTopColor: "#A8A8A8",
    backgroundColor: "#FFFFFF",
  },
  addAmountProductContainer: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 35,
  },
  countAmountProductText: {
    fontSize: 14,
    fontWeight: "600",
    paddingTop: 5,
    marginHorizontal: 20,
    color: "#000000",
  },
  secondaryButtonContainer: {
    flex: 0.6,
    alignItems: "center",
    paddingTop: PixelRatio.getPixelSizeForLayoutSize(8),
  },

  productContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  productPrice: {
    fontSize: 18,
    color: "#888",
    marginVertical: 8,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sizeOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  sizeOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedOption: {
    borderColor: "#ff9900",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    marginLeft: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

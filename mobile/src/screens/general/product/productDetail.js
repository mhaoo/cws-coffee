import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Checkbox } from "react-native-paper";
import AddButton from "../../../components/button/addButton";
import SecondaryButton from "../../../components/button/secondaryButton";
import { useCart } from "../cart/cartContext";

export default function ProductDetail({ route, navigation }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [countAmountProduct, setCountAmountProduct] = useState(1);
  const [notes, setNotes] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `http://192.168.2.63:3000/v1/products/${productId}`
        );
        const fetchedProduct = response.data.data;
        setProduct(fetchedProduct);
        calculateTotalPrice(
          fetchedProduct.price,
          selectedOptions,
          countAmountProduct
        );
      } catch (error) {
        console.error("Error fetching product data:", error);
        Alert.alert("Lỗi", "Không thể lấy dữ liệu chi tiết sản phẩm.");
      }
    };

    fetchProductDetail();
  }, [productId]);

  const toggleOptionValue = (optionId, valueId, priceAdjustment) => {
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = {
        ...prevSelectedOptions,
        [optionId]: prevSelectedOptions[optionId] === valueId ? null : valueId,
      };
      calculateTotalPrice(product.price, updatedOptions, countAmountProduct);
      return updatedOptions;
    });
  };

  const calculateTotalPrice = (basePrice, options, quantity) => {
    let optionsTotal = 0;

    if (product?.isCustomizable && product?.options?.length > 0) {
      product.options.forEach((option) => {
        const selectedValueId = options[option.id];
        const selectedValue = option.values.find(
          (val) => val.id === selectedValueId
        );
        if (selectedValue) {
          optionsTotal += selectedValue.priceAdjustment;
        }
      });
    }

    const finalPrice = (basePrice + optionsTotal) * quantity;
    setTotalPrice(finalPrice);
  };

  const handleAddPress = () => {
    const newCount = countAmountProduct + 1;
    setCountAmountProduct(newCount);
    calculateTotalPrice(product.price, selectedOptions, newCount);
  };

  const handleRemovePress = () => {
    const newCount = Math.max(1, countAmountProduct - 1);
    setCountAmountProduct(newCount);
    calculateTotalPrice(product.price, selectedOptions, newCount);
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: totalPrice,
      quantity: countAmountProduct,
      options: selectedOptions,
    };
    addToCart(cartItem);
    navigation.goBack();
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
        <View style={styles.productContainer}>
          <Image
            source={{ uri: "https://example.com/coffee-image.png" }}
            style={styles.productImage}
          />
          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.productPrice}>{`$${product.price}`}</Text>
          <Text style={styles.productDescription}>
            {product.description || "Không có mô tả cho sản phẩm này"}
          </Text>
        </View>

        {product.isCustomizable && product.options.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Tùy chọn sản phẩm</Text>
            {product.options.map((option) => (
              <View key={option.id} style={styles.section}>
                <Text style={styles.sectionTitle}>{option.name}</Text>
                {option.values.map((value) => (
                  <View key={value.id} style={styles.checkboxContainer}>
                    <Checkbox
                      status={
                        selectedOptions[option.id] === value.id
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() =>
                        toggleOptionValue(
                          option.id,
                          value.id,
                          value.priceAdjustment
                        )
                      }
                    />
                    <Text style={styles.label}>
                      {value.value} (+${value.priceAdjustment})
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

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

      <View style={styles.footerContainer}>
        <View style={styles.addAmountProductContainer}>
          <AddButton iconName="remove-outline" onPress={handleRemovePress} />
          <Text style={styles.countAmountProductText}>
            {countAmountProduct}
          </Text>
          <AddButton iconName="add" onPress={handleAddPress} />
        </View>
        <View style={styles.secondaryButtonContainer}>
          <SecondaryButton
            text="Chọn"
            price={`${totalPrice.toFixed(2)} $`}
            style={styles.secondaryButton}
            onPress={handleAddToCart}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  scrollViewContent: {},
  footerContainer: {
    flexDirection: "row",
    borderTopWidth: 0.25,
    borderTopColor: "#A8A8A8",
    backgroundColor: "#FFFFFF",
  },
  addAmountProductContainer: {
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
3;

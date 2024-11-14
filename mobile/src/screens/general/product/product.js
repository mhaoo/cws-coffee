import React, { useState, useEffect } from "react";
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
  TouchableOpacity,
  ScrollView,
  PixelRatio,
  ImageBackground,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
// import { NetworkInfo } from "react-native-network-info";

const { width, height } = Dimensions.get("screen");

const categoryData = [
  {
    id: "1",
    name: "Ca phe sua",
    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
  },
  {
    id: "2",
    name: "Ca phe den da",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "3",
    name: "Tra",
    uri: "https://coffeebean.com.au/cdn/shop/articles/nathan-dumlao-6VhPY27jdps-unsplash_1600x.jpg?v=1670108329",
  },
  {
    id: "4",
    name: "Bac xiu",
    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
  },
  {
    id: "5",
    name: "Ca phe lon",
    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
  },
  {
    id: "6",
    name: "Ca he hong",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "7",
    name: "Coffee sua da pha loang",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "8",
    name: "Capuchino",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
  {
    id: "9",
    name: "Ca phe lon",
    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
  },
  {
    id: "10",
    name: "Ca phe lon",
    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
  },
  {
    id: "11",
    name: "Capuchino",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
];

const data2 = [
  {
    id: "1",
    category: "Ca phe sua",
    title: "Item 1",
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
  },
];

export default Product = function ({ navigation }) {
  const [groupedDataArray, setGroupedDataArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localIP, setLocalIP] = useState(null); // Lưu IP cục bộ

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://192.168.2.63:3000/v1/products");
      const products = response.data.data.rows;

      // Nhóm các sản phẩm theo danh mục
      const groupedData = products.reduce((acc, product) => {
        const category = product.category.name;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
        });
        return acc;
      }, {});

      // Chuyển đổi thành mảng để render bằng FlatList
      const groupedArray = Object.entries(groupedData).map(
        ([category, items]) => ({
          category,
          data: items,
        })
      );

      setGroupedDataArray(groupedArray);
      setLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Không thể lấy dữ liệu sản phẩm.");
      setLoading(false);
    }
  };

  const renderCategoryItem = ({ item }) => (
    <View style={styles.categoryItemContainer}>
      <View style={styles.imageCategoryBox}>
        <Image
          source={{
            uri: item.uri,
          }}
          style={styles.categoryImage}
        />
      </View>
      <View style={styles.categoryName}>
        <Text style={styles.categoryTextStyle}>{item.name}</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.productList}>
      <View style={styles.productCategoryNameContainer}>
        <Text style={styles.productCategoryNameText}>{item.category}</Text>
      </View>
      {item.data.map((product) => (
        <TouchableOpacity
          key={product.id}
          style={styles.productContainer}
          onPress={() => handleProductPress(product)}
        >
          <View style={styles.imageBox}>
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0lat9Ryng1UhE-3c5u7O-ZFCVXYGoANxWrw&s",
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.detailBox}>
            <View style={styles.productTextContainer}>
              <Text style={styles.productNameText}>{product.name}</Text>
              <Text style={styles.productPriceText}>{`$${product.price}`}</Text>
            </View>
            <View style={styles.addButtonContainer}>
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add" size={20} color={"white"} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  // const renderProductDetail = ({ item }) => (
  //   <View style={styles.innerBottomSheetContainer}>
  //     <ImageBackground
  //       source={{
  //         uri: item.uri,
  //       }}
  //       resizeMode="cover"
  //       style={styles.productImage}
  //     ></ImageBackground>
  //   </View>
  // );

  const handleProductPress = (product) => {
    navigation.navigate("ProductDetail", { productId: product.id });
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  // const handleSheetChanges = useCallback((index) => {
  //   if (index === -1) {
  //     setIsVisible(false); // Hide BottomSheet when fully collapsed
  //   }
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.searchIconContainer}>
            <Feather name="search" size={24} color={"#93540A"} />
          </View>
          <TextInput
            placeholder="Tim kiem"
            placeholderTextColor="#A8A8A8"
          ></TextInput>
        </View>
        <ScrollView
          style={styles.scrollContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
          alwaysBounceVertical={false}
        >
          <FlatList
            contentContainerStyle={styles.renderCategoryItemContainer}
            data={categoryData}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            numColumns={Math.ceil(categoryData.length / 2)}
            scrollEnabled={false}
          />
        </ScrollView>
      </View>
      <View style={styles.productListContainer}>
        <FlatList
          data={groupedDataArray}
          renderItem={renderItem}
          keyExtractor={(item) => item.category}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* {isVisible && (
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={["80%"]}
          handleIndicatorStyle={styles.headerIndicator} // use for hide indicator on header
          enablePanDownToClose={true}
        >
          <BottomSheetView style={styles.bottomSheetContainer}>
            <FlatList
              data={data2}
              renderItem={renderProductDetail}
              keyExtractor={(item) => item.id}
            />
          </BottomSheetView>
        </BottomSheet>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  categoryContainer: {
    flex: 0.35,
    marginHorizontal: width * 0.03,
    marginVertical: width * 0.03,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  searchContainer: {
    flex: 0.25,
    flexDirection: "row",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#F1F1F1",
  },
  searchIconContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flex: 0.75,
    // backgroundColor: "orange",
  },
  renderCategoryItemContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    // backgroundColor: "red",
  },
  categoryItemContainer: {
    // flex: 1,
    // marginHorizontal: 10,
    // display: "flex",
    // flexDirection: "column",
    width: PixelRatio.getPixelSizeForLayoutSize(30),
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    // backgroundColor: "blue",
  },
  imageCategoryBox: {
    alignItems: "center",
    // marginBottom: 5,
    // backgroundColor: "aqua",
  },
  categoryImage: {
    height: PixelRatio.getPixelSizeForLayoutSize(18),
    width: PixelRatio.getPixelSizeForLayoutSize(18),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(9),
  },
  categoryName: {
    alignItems: "center",
    // backgroundColor: "yellow",
  },
  categoryTextStyle: {
    fontSize: 12,
    textAlign: "center",
  },
  productListContainer: {
    flex: 0.65,
  },
  productList: {
    flex: 1,
    marginBottom: 20,
    marginHorizontal: width * 0.03,
  },
  productCategoryNameContainer: {
    flex: 0.2,
    marginBottom: 10,
    // backgroundColor: "blue",
  },
  productCategoryNameText: {
    fontSize: 18,
    fontWeight: "600",
  },
  productContainer: {
    flex: 0.8,
    flexDirection: "row",
    marginBottom: 10,
  },
  imageBox: {
    flex: 0.3,
    // backgroundColor: "lightgreen",
  },
  image: {
    borderRadius: 10,
    aspectRatio: 1,
  },
  detailBox: {
    flex: 0.7,
    flexDirection: "row",
  },
  productTextContainer: {
    flex: 0.8,
  },
  addButtonContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  productNameText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  productPriceText: {
    fontSize: 14,
    marginLeft: 15,
  },
  addButton: {
    height: PixelRatio.getPixelSizeForLayoutSize(12),
    width: PixelRatio.getPixelSizeForLayoutSize(12),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(6),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#93540A",
  },
  // bottomSheetContainer: {
  //   flex: 1,
  //   alignItems: "center",
  // },
  // headerIndicator: {
  //   height: 0,
  // },
});

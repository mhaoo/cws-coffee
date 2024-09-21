import React, { useState, useCallback, useRef } from "react";
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
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const { width, height } = Dimensions.get("screen");

const data = [
  { id: "1", title: "Item 1" },
  { id: "2", title: "Item 2" },
  { id: "3", title: "Item 3" },
];

export default Product = function ({ navigation }) {
  const [isVisible, setIsVisible] = useState(false);
  const bottomSheetRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={styles.productList}>
      <View style={styles.productCategoryNameContainer}>
        <Text>{item.id}</Text>
      </View>
      <TouchableOpacity
        style={styles.productContainer}
        onPress={handleProductPress}
      >
        <View style={styles.product}>
          <View style={styles.imageBox}>
            <Image
              source={{
                uri: "https://i2.wp.com/genshinbuilds.aipurrjects.com/genshin/characters/furina/image.png?strip=all&quality=75&w=256",
              }}
              style={styles.image}
            />
          </View>
          <Text>{item.title}</Text>
          <Text>{item.title}</Text>
          <TouchableOpacity>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderProductDetail = ({ item }) => (
    <View>
      <View style={styles.imageBox}>
        <Image
          source={{
            uri: "https://i2.wp.com/genshinbuilds.aipurrjects.com/genshin/characters/furina/image.png?strip=all&quality=75&w=256",
          }}
          style={styles.image}
        />
      </View>
      <Text>Name</Text>
      <Text>Price</Text>
      <Text>Description</Text>
    </View>
  );

  const handleProductPress = () => {
    setIsVisible(true);
  };

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      setIsVisible(false); // Hide BottomSheet when fully collapsed
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.productListContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      {isVisible && (
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={["100%"]}
          handleIndicatorStyle={styles.headerIndicator} // use for hide indicator on header
          enablePanDownToClose={true}
        >
          <BottomSheetView style={styles.bottomSheetContainer}>
            <FlatList data={data} renderItem={renderProductDetail} />
          </BottomSheetView>
        </BottomSheet>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  productListContainer: {
    flex: 1,
  },
  productList: {
    flex: 1,
  },
  productCategoryNameContainer: {
    flex: 0.2,
    backgroundColor: "blue",
  },
  productContainer: {
    flex: 0.8,
    backgroundColor: "red",
  },
  product: {
    // width: width,
    // height: 100,
    flexDirection: "row",
  },
  imageBox: {
    width: width * 0.3,
    justifyContent: "center",
  },
  image: {
    aspectRatio: 1.1,
  },
  bottomSheetContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerIndicator: {
    height: 0,
  },
});

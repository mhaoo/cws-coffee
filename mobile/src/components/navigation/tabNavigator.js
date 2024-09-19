import { React, useState, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import home from "../../screens/general/home/home";
import product from "../../screens/general/product/product";
import seatBooking from "../../screens/general/seatBooking/seatBooking";
import rank from "../../screens/general/rank/rank";
import others from "../../screens/general/others/others";

import ProductHeader from "../header/productHeader";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const screenWidth = Dimensions.get("screen").width;
const Tab = createBottomTabNavigator();

const CustomTabBarIcon = ({ focused, routeName, size }) => {
  // const [iconName, setIconName] = useState("");

  // useEffect(() => {
  //   if (routeName === "Trang chủ") {
  //     setIconName(focused ? "home-outline" : "home-outline");
  //   } else if (routeName === "Sản phẩm") {
  //     setIconName(focused ? "add-circle" : "add-circle-outline");
  //   } else if (routeName === "Đặt chỗ") {
  //     setIconName(focused ? "appstore1" : "appstore-o");
  //   } else if (routeName === "Hạng") {
  //     setIconName(focused ? "appstore1" : "appstore-o");
  //   } else if (routeName === "Khác") {
  //     setIconName(focused ? "appstore1" : "appstore-o");
  //   }
  // }, [focused, routeName]);

  const getIconComponent = () => {
    if (routeName === "Trang chủ") {
      return (
        <MaterialCommunityIcons
          name="home-outline"
          color={focused ? "#93540A" : "#A8A8A8"}
          size={size}
        />
      );
    }
    if (routeName === "Sản phẩm") {
      return (
        <MaterialCommunityIcons
          name="coffee-outline"
          color={focused ? "#93540A" : "#A8A8A8"}
          size={size}
        />
      );
    }
    if (routeName === "Đặt chỗ") {
      return (
        <MaterialCommunityIcons
          name="seat-outline"
          color={focused ? "#93540A" : "#A8A8A8"}
          size={size}
        />
      );
    }
    if (routeName === "Hạng") {
      return (
        <MaterialCommunityIcons
          name="tag-heart-outline"
          color={focused ? "#93540A" : "#A8A8A8"}
          size={size}
        />
      );
    }
    if (routeName === "Khác") {
      return (
        <MaterialCommunityIcons
          name="menu"
          color={focused ? "#93540A" : "#A8A8A8"}
          size={size}
        />
      );
    }
    return null;
  };

  return getIconComponent();
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // tabBarActiveTintColor: "blue",
        // tabBarInactiveTintColor: "black",
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => (
          <View style={styles.tabBarItem}>
            <CustomTabBarIcon
              routeName={route.name}
              focused={focused}
              color={color}
              size={size}
            />
            <Text style={styles.tabBarLabel}>{route.name}</Text>
          </View>
        ),
      })}
    >
      <Tab.Screen
        name="Trang chủ"
        component={home}
        options={{
          header: ({ navigation }) => <HomeHeader navigation={navigation} />,
        }}
      />
      <Tab.Screen
        name="Sản phẩm"
        component={product}
        options={{
          header: ({ navigation }) => <ProductHeader navigation={navigation} />,
        }}
      />
      <Tab.Screen name="Đặt chỗ" component={seatBooking} />
      <Tab.Screen name="Hạng" component={rank} />
      <Tab.Screen name="Khác" component={others} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0,
  },
  tabBarItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarLabel: {
    color: "#A8A8A8",
    fontSize: 10,
  },
});

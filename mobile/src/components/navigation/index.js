import { createStackNavigator } from "@react-navigation/stack";
import login from "../../screens/general/login/login";
import register from "../../screens/general/register/register";
import BasicHeader from "../header/basicHeader";
import HomeHeader from "../header/homeHeader";
import home from "../../screens/general/home/home";
import BottomTabNavigator from "./tabNavigator";
import productDetail from "../../screens/general/product/productDetail";
import ProductDetailHeader from "../header/productDetailHeader";
import seatList from "../../screens/general/seatBooking/seatList";
import SeatListHeader from "../header/seatListHeader";
import seatDetail from "../../screens/general/seatBooking/seatDetail";
import cart from "../../screens/general/cart/cart";
import orderHistory from "../../screens/order/orderHistory";
import orderDetail from "../../screens/order/orderDetail";
import userInformation from "../../screens/general/others/userInformation";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={register}
        options={{
          header: ({ navigation, route }) => (
            <BasicHeader navigation={navigation} route={route} />
          ),
        }}
      />
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={productDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SeatList"
        component={seatList}
        options={{
          header: ({ navigation }) => (
            <SeatListHeader navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="SeatDetail"
        component={seatDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Giỏ hàng"
        component={cart}
        options={{
          header: ({ navigation, route }) => (
            <BasicHeader navigation={navigation} route={route} />
          ),
        }}
      />
      <Stack.Screen
        name="Đơn hàng của tôi"
        component={orderHistory}
        options={{
          header: ({ navigation, route }) => (
            <BasicHeader navigation={navigation} route={route} />
          ),
        }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={orderDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Thông tin cá nhân"
        component={userInformation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

import { createStackNavigator } from "@react-navigation/stack";
import login from "../../screens/general/login/login";
import register from "../../screens/general/register/register";
import BasicHeader from "../header/basicHeader";
import HomeHeader from "../header/homeHeader";
import home from "../../screens/general/home/home";
import BottomTabNavigator from "./tabNavigator";
import productDetail from "../../screens/general/product/productDetail";
import ProductDetailHeader from "../header/productDetailHeader";

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
          header: ({ navigation }) => <BasicHeader navigation={navigation} />,
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
    </Stack.Navigator>
  );
};

export default StackNavigator;

import { createStackNavigator } from "@react-navigation/stack";
import login from "../../screens/general/login/login";
import register from "../../screens/general/register/register";
import BasicHeader from "../header/basicHeader";

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
    </Stack.Navigator>
  );
};

export default StackNavigator;

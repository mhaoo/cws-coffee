import { createStackNavigator } from "@react-navigation/stack";
import login from "../../screens/general/login/login";
import register from "../../screens/general/register/register";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={login} />
      <Stack.Screen name="Register" component={register} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

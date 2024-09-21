import React, { useCallback, useContext, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./components/navigation";
import { AuthContext } from "./api/authContext";
import * as Keychain from "react-native-keychain";
import Login from "./screens/general/login/login";
import Home from "./screens/general/home/home";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={"dark-content"}
        translucent
        backgroundColor="transparent"
      />
      <StackNavigator />
    </NavigationContainer>
  );
}

// const App = () => {
//   const authContext = useContext(AuthContext);
//   const [status, setStatus] = useState("loading");

//   const loadJWT = useCallback(async () => {
//     try {
//       const value = await Keychain.getGenericPassword();
//       const jwt = JSON.parse(value.password);

//       authContext.setAuthState({
//         accessToken: jwt.accessToken || null,
//         refreshToken: jwt.refreshToken || null,
//         authenticated: jwt.accessToken !== null,
//       });
//       setStatus("success");
//     } catch (error) {
//       setStatus("error");
//       console.log(`Keychain Error: ${error.message}`);
//       authContext.setAuthState({
//         accessToken: null,
//         refreshToken: null,
//         authenticated: false,
//       });
//     }
//   }, []);

//   useEffect(() => {
//     loadJWT();
//   }, [loadJWT]);

//   // if (status === "loading") {
//   //   return "Loading";
//   // }

//   if (authContext?.authState?.authenticated === false) {
//     return <Login />;
//   } else {
//     return <Home />;
//   }
// };

// export default App;

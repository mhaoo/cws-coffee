import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import BasicHeader from "../../../components/header/basicHeader";

export default Register = function ({ navigation }) {
  return (
    <View style={styles.container}>
      <BasicHeader navigation={navigation} />
      <TextInput placeholder="Nhap ten cua ban"></TextInput>
      <TextInput placeholder="Nhap email cua ban"></TextInput>
      <Button title="Tao tai khoan"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

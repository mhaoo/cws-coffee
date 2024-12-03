import React, { useState, useEffect } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import GeneralButton from "../../../components/button/generalButton";

const { width, height } = Dimensions.get("screen");

import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import Config from "react-native-config";

const stripePublicKey = Config.STRIPE_PUBLIC_KEY; // Lấy public key từ môi trường

// const handlePayment = async (confirmPayment, clientSecret) => {
//   const { error, paymentIntent } = await confirmPayment(clientSecret, {
//     type: 'Card',
//     billingDetails: {
//       name: 'Tên khách hàng',
//     },
//   });

//   if (error) {
//     console.log("Lỗi thanh toán:", error);
//   } else if (paymentIntent) {
//     console.log("Thanh toán thành công:", paymentIntent);
//   }
// };

export default SeatBookingSummary = function ({ navigation }) {
  useEffect(() => {
    // Stripe Provider sẽ giúp bạn khởi tạo Stripe với public key
  }, []);

  const { confirmPayment } = useStripe(); // Hook từ Stripe

  //! Hàm gọi backend để lấy client secret
  // const fetchPaymentIntentClientSecret = async () => {
  //   const response = await fetch(
  //     "http://localhost:1337/create-payment-intent",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ amount: 5000 }), // Giá trị cần thanh toán
  //     }
  //   );

  //   const { clientSecret } = await response.json();
  //   return clientSecret;
  // };

  return (
    <StripeProvider publishableKey={stripePublicKey}>
      <View style={styles.container}>
        {/* Scrollable content */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Single POD Section */}
          <View style={styles.card}>
            <Text style={styles.title}>Single POD</Text>
            <Text style={styles.subtitle}>WorkFlow Gò Vấp</Text>
            <Text style={styles.info}>1 người - 10m²</Text>
          </View>
          <View style={styles.divider} />

          {/* Time Section */}
          <View style={styles.detailSection}>
            <View style={styles.row}>
              <Text style={styles.sectionTitle}>Thời gian</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.editText}>Chỉnh sửa</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.sectionText}>
              Chủ nhật - 01/12/2024, 16:30 - 17:30
            </Text>
          </View>
          <View style={styles.divider} />

          {/* Order Details Section */}
          <View style={styles.detailSection}>
            <Text style={styles.sectionTitle}>Chi tiết đơn hàng</Text>
            <Text style={styles.sectionText}>01 giờ 00 phút</Text>
            <Text style={styles.sectionText}>
              55.000 đ x 1 giờ 0 phút (16:30 - 17:30)
            </Text>
            <View style={styles.row}>
              <Text style={styles.sectionTitle}>Tổng cộng</Text>
              <Text style={styles.sectionTitle}>55.000 đ</Text>
            </View>
          </View>
          <View style={styles.divider} />

          {/* Payment Section */}
          <View style={styles.paymentSection}>
            <Text style={styles.sectionTitle}>Thanh toán</Text>
            <View style={styles.paymentMethod}>
              <Image
                source={{
                  uri: "https://developers.momo.vn/v3/vi/assets/images/icon-52bd5808cecdb1970e1aeec3c31a3ee1.png",
                }}
                style={styles.paymentIcon}
              />
              <Text style={styles.paymentText}>Momo</Text>
            </View>
          </View>
          <View style={styles.divider} />

          {/* Policy Section */}
          <View style={styles.policySection}>
            <Text style={styles.sectionTitle}>Chính sách hủy chỗ</Text>
            <Text style={styles.policyText}>
              Phí đặt thiết bị sẽ được hoàn trả 100% nếu hủy đặt chỗ trước 24
              giờ.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footerContainer}>
          <GeneralButton
            text="Đặt ngay"
            style={styles.footerButton}
            // onPress={async () => {
            //   // Lấy client secret từ backend và thực hiện thanh toán
            //   const clientSecret = await fetchPaymentIntentClientSecret();
            //   handlePayment(confirmPayment, clientSecret);
            // }}
          />
        </View>
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  contentContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#A8A8A8",
  },
  info: {
    fontSize: 14,
    color: "#333333",
    marginTop: 5,
  },
  detailSection: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 14,
    color: "#333333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editText: {
    fontSize: 14,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  paymentSection: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  paymentIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  paymentText: {
    fontSize: 14,
    color: "#333333",
  },
  policySection: {
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  policyText: {
    fontSize: 14,
    color: "#333333",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 15,
  },
  footerContainer: {
    borderTopWidth: 0.25,
    borderTopColor: "#A8A8A8",
    backgroundColor: "#FFFFFF",
  },
  footerButton: {
    margin: 20,
  },
});

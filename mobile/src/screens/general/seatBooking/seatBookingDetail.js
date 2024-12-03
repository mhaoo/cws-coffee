import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import WeekView from "react-native-week-view";
import GeneralButton from "../../../components/button/generalButton";

const { width } = Dimensions.get("window");

const currentUserId = "123"; // ID người dùng hiện tại

export default SeatBookingDetail = function ({ navigation }) {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isSelectingStart, setIsSelectingStart] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [eventList, setEventList] = useState([
    {
      id: 1,
      description: "Lịch của người khác",
      startDate: new Date(2024, 10, 18, 9, 0),
      endDate: new Date(2024, 10, 18, 10, 0),
      color: "#D3D3D3",
      userId: "456", // ID của người đặt
    },
  ]);

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const handleDateSelect = (day) => {
    setCurrentDate(new Date(day.dateString));
  };

  const adjustToNearestInterval = (time, interval) => {
    const newTime = new Date(time);
    const minutes = newTime.getMinutes();
    const adjustedMinutes = Math.floor(minutes / interval) * interval;
    newTime.setMinutes(adjustedMinutes);
    newTime.setSeconds(0);
    newTime.setMilliseconds(0);
    return newTime;
  };

  const handleConfirmTime = (time) => {
    if (isSelectingStart) {
      if (time.getHours() < 8 || time.getHours() >= 22) {
        Alert.alert(
          "Lỗi",
          "Giờ bắt đầu phải nằm trong khung từ 08:00 đến 22:00."
        );
        return;
      }
      const adjustedTime = adjustToNearestInterval(time, 15); // Làm tròn xuống bội số 15 phút
      setStartTime(adjustedTime);
      setEndTime(null); // Reset giờ kết thúc
    } else {
      if (!startTime) {
        Alert.alert("Lỗi", "Vui lòng chọn giờ bắt đầu trước.");
        return;
      }

      const minEndTime = new Date(startTime);
      minEndTime.setHours(minEndTime.getHours());
      minEndTime.setMinutes(minEndTime.getMinutes() + 60); // Thời gian kết thúc tối thiểu là +60 phút

      if (time < minEndTime) {
        Alert.alert(
          "Lỗi",
          `Giờ kết thúc phải cách giờ bắt đầu ít nhất 60 phút (${minEndTime.toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }
          )}).`
        );
        return;
      }

      const adjustedTime = adjustToNearestInterval(time, 15); // Làm tròn xuống bội số 15 phút
      setEndTime(adjustedTime);
    }

    setPickerVisible(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const confirmBooking = () => {
    if (!startTime || !endTime) {
      Alert.alert(
        "Lỗi",
        "Vui lòng chọn đầy đủ ngày, giờ bắt đầu và giờ kết thúc."
      );
      return;
    }

    const newEvent = {
      id: eventList.length + 1,
      description: "Lịch của bạn",
      startDate: startTime,
      endDate: endTime,
      color: "#4CAF50",
      userId: currentUserId,
    };

    Alert.alert(
      "Xác nhận đặt chỗ",
      `Bạn có muốn đặt chỗ từ ${startTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })} đến ${endTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })} vào ngày ${currentDate.toDateString()} không?`,
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: () => {
            setEventList((prevEvents) => [...prevEvents, newEvent]);
            setStartTime(null);
            setEndTime(null);
            Alert.alert("Đặt chỗ thành công!");
          },
        },
      ]
    );
  };

  const coloredEvents = eventList.map((event) => ({
    ...event,
    color: event.userId === currentUserId ? "#4CAF50" : "#D3D3D3",
  }));

  const handleConfirmPress = () => {
    navigation.navigate("Xác nhận đặt chỗ");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.selectBox} onPress={toggleCalendar}>
        <Text style={styles.selectText}>
          {showCalendar ? "Ẩn lịch" : "Chọn ngày và giờ"}
        </Text>
        <Text style={styles.detailsText}>
          {`Ngày: ${currentDate.toDateString()}`}
        </Text>
        <Text style={styles.detailsText}>
          {`Giờ bắt đầu: ${
            startTime
              ? startTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              : "Chưa chọn"
          }`}
        </Text>
        <Text style={styles.detailsText}>
          {`Giờ kết thúc: ${
            endTime
              ? endTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              : "Chưa chọn"
          }`}
        </Text>
      </TouchableOpacity>

      {showCalendar && (
        <>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={{
              [currentDate.toISOString().split("T")[0]]: {
                selected: true,
                marked: true,
                selectedColor: "blue",
              },
            }}
            minDate={todayString}
          />
          <View style={styles.timePickerContainer}>
            <TouchableOpacity
              style={styles.timePickerButton}
              onPress={() => {
                setIsSelectingStart(true);
                setPickerVisible(true);
              }}
            >
              <Text style={styles.timePickerText}>Chọn giờ bắt đầu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timePickerButton}
              onPress={() => {
                setIsSelectingStart(false);
                setPickerVisible(true);
              }}
              disabled={!startTime}
            >
              <Text style={styles.timePickerText}>Chọn giờ kết thúc</Text>
            </TouchableOpacity>
          </View>
          <GeneralButton
            text="Xác nhận"
            // style={styles.confirmButton}
            // textStyle={styles.footerButtonText}
            onPress={confirmBooking}
          />
        </>
      )}

      <View style={styles.weekViewContainer}>
        <WeekView
          events={coloredEvents}
          selectedDate={currentDate}
          numberOfDays={7}
          hoursInDisplay={14}
          timeStep={60}
          formatDateHeader="ddd"
          startHour={8}
          endHour={22}
          onEventPress={(event) =>
            Alert.alert(
              "Chi tiết sự kiện",
              `Mô tả: ${event.description}\n${
                event.userId === currentUserId
                  ? "Đây là lịch của bạn."
                  : "Đây là lịch của người khác."
              }`
            )
          }
        />
      </View>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={() => setPickerVisible(false)}
      />

      <View style={styles.footerContainer}>
        <View style={styles.footerContent}>
          <View style={styles.footerInfo}>
            <Text style={styles.capacityText}>Số lượng tối đa:</Text>
            <Text style={styles.capacityText}>10</Text>
          </View>
          <View style={styles.footerInfo}>
            <Text style={styles.priceText}>Giá:</Text>
            <Text style={styles.priceText}>55.000 đ/giờ</Text>
          </View>
        </View>
        <GeneralButton
          text="Kiểm tra thông tin và xác nhận"
          style={styles.footerButton}
          onPress={handleConfirmPress}
        />
        <Text style={styles.noteText}>
          Phí đặt chỗ ngồi sẽ được hoàn trả 100% nếu hủy đặt chỗ trước 24 giờ.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F9F9F9",
  },
  selectBox: {
    backgroundColor: "#EFEFEF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  selectText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailsText: {
    fontSize: 16,
    marginTop: 8,
  },
  timePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  timePickerButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
  },
  timePickerText: {
    color: "white",
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  confirmText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  weekViewContainer: {
    height: 400,
    marginTop: 16,
    marginBottom: 16,
  },
  footerContainer: {
    paddingHorizontal: 0,
    marginHorizontal: -16,
    backgroundColor: "#FFFFFF",
  },
  footerContent: {
    flexDirection: "row",
  },
  footerInfo: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  footerButton: {
    marginBottom: 12,
  },
  noteText: {
    fontSize: 14,
    color: "#A8A8A8",
    marginHorizontal: 20,
    marginBottom: 12,
  },
});

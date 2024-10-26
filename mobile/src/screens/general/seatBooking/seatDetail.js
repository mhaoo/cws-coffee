import React, { useState } from "react";
import { Alert, View, StyleSheet, Dimensions } from "react-native";
import WeekView from "react-native-week-view";

const { width, height } = Dimensions.get("window");

export default SeatDetail = function ({
  navigation,
  events = [
    {
      id: 1,
      description: "Đã đặt",
      startDate: new Date(2024, 10, 18, 9, 0),
      endDate: new Date(2024, 10, 18, 10, 0),
      color: "#D3D3D3",
    },
  ],
  selectedDate = new Date(2024, 10, 18),
  numberOfDays = 7,
  hoursInDisplay = 7,
  timeStep = 60,
  formatDateHeader = "ddd",
  locale = "vi",
  startHour = 9,
  endHour = 13,
}) {
  const [eventList, setEvents] = useState(events);
  const [dragStartDate, setDragStartDate] = useState(null);
  const [tempEvent, setTempEvent] = useState(null); // Sự kiện tạm thời

  const isTimeSlotAvailable = (newStartDate, newEndDate) => {
    return !eventList.some(
      (event) => newStartDate < event.endDate && newEndDate > event.startDate
    );
  };

  const onDragStart = (event, startHour, date) => {
    const startDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      startHour,
      0
    );
    setDragStartDate(startDate);

    // Tạo sự kiện tạm thời với màu đặc biệt
    const temp = {
      id: "temp",
      description: "Đang chọn...",
      startDate: startDate,
      endDate: new Date(startDate.getTime() + 60 * 60 * 1000), // Tạm thời là 1 giờ
      color: "#ADD8E6", // Màu xanh nhạt để đánh dấu
    };
    setTempEvent(temp);
  };

  const onDragEnd = (event, endHour, date) => {
    if (dragStartDate) {
      const endDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        endHour,
        0
      );

      if (endDate <= dragStartDate) {
        Alert.alert("Lỗi", "Thời gian kết thúc phải sau thời gian bắt đầu.");
        setDragStartDate(null);
        setTempEvent(null); // Xóa sự kiện tạm thời nếu không hợp lệ
      } else if (isTimeSlotAvailable(dragStartDate, endDate)) {
        const newEvent = {
          id: eventList.length + 1,
          description: "Đã đặt",
          startDate: dragStartDate,
          endDate,
          color: "#D3D3D3",
        };

        Alert.alert(
          "Xác nhận đặt chỗ",
          `Bạn có muốn đặt chỗ từ ${dragStartDate.toLocaleTimeString()} đến ${endDate.toLocaleTimeString()} không?`,
          [
            {
              text: "Hủy",
              style: "cancel",
              onPress: () => {
                setDragStartDate(null);
                setTempEvent(null);
              },
            },
            {
              text: "Đồng ý",
              onPress: () => {
                setEvents((prevEvents) => [...prevEvents, newEvent]);
                setDragStartDate(null);
                setTempEvent(null);
              },
            },
          ]
        );
      } else {
        Alert.alert(
          "Thông báo",
          "Khung giờ đã được đặt, vui lòng chọn khung giờ khác."
        );
        setDragStartDate(null);
        setTempEvent(null);
      }
    }
  };

  const onGridClick = (event, hour, date) => {
    if (!dragStartDate) {
      onDragStart(event, hour, date);
    } else {
      // Cập nhật thời gian kết thúc của sự kiện tạm thời khi kéo
      const tempEndDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        hour,
        0
      );
      setTempEvent((prevTempEvent) => ({
        ...prevTempEvent,
        endDate: tempEndDate,
      }));
      onDragEnd(event, hour, date);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}></View>
      <View style={styles.timeSelectContainer}>
        <WeekView
          events={tempEvent ? [...eventList, tempEvent] : eventList} // Hiển thị sự kiện tạm thời
          selectedDate={selectedDate}
          numberOfDays={numberOfDays}
          onEventPress={(event) => Alert.alert("Chi tiết", event.description)}
          onGridClick={onGridClick}
          hoursInDisplay={hoursInDisplay}
          timeStep={timeStep}
          formatDateHeader={formatDateHeader}
          locale={locale}
          startHour={startHour}
          endHour={endHour}
        />
      </View>
      <View style={styles.detailContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  imageContainer: {
    flex: 0.3,
  },
  timeSelectContainer: {
    flex: 0.4,
  },
  detailContainer: {
    flex: 0.3,
  },
});

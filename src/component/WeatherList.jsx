import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const iconWeather = (weatherMain) => {
  if (weatherMain === "Clear") {
    return "sunny-outline";
  } else if (weatherMain === "Clouds") {
    return "cloudy-outline";
  } else if (weatherMain === "Rain") {
    return "rainy-outline";
  } else {
    return "unknown";
  }
};

export const WeatherList = ({ item }) => {
  const { dt_txt, weather, main } = item;
  const weatherMain = weather[0].main;
  const { temp_max, temp_min } = main;
  const dateString = dt_txt;
  const dateObj = new Date(dateString);
  // 日付を mm/dd(曜日) hh:mm 形式にフォーマット
  const dayOptions = {
    month: "numeric",
    day: "numeric",
    weekday: "short",
  };
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: false, // 24時間制で表示する
  };
  const formatterday = new Intl.DateTimeFormat("ja", dayOptions);
  const formatterTime = new Intl.DateTimeFormat("ja", timeOptions);
  const formattedDay = formatterday.format(dateObj);
  const formattedTime = formatterTime.format(dateObj);
  return (
    <View style={styles.item}>
      <View style={styles.date}>
        <Text style={styles.day}>{formattedDay}</Text>
        <Text style={styles.time}>{formattedTime}</Text>
      </View>
      <View style={styles.icon}>
        <Ionicons name={iconWeather(weatherMain)} size={35} color="black" />
      </View>
      <View style={styles.temps}>
        <Text style={styles.tempMax}>{Math.round(temp_max)}°C</Text>
        <Text style={styles.tempMin}>{Math.round(temp_min)}°C</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#111",
  },
  date: {
    width: "36%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  day: {
    marginLeft: 10,
    fontSize: 18,
  },
  time: {
    fontSize: 18,
    textAlign: "right",
  },
  icon: {
    width: "25%",
    alignItems: "center",
  },
  temps: {
    flexDirection: "row",
    width: "30%",
  },
  tempMax: {
    fontSize: 18,
    color: "red",
    marginRight: 10,
  },
  tempMin: {
    fontSize: 18,
    color: "blue",
  },
});

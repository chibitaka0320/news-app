import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { DateFormatte, TimeFormatte } from "../component/TimeFormatte";

const celsius = (temp) => {
  return temp - 273.15;
};

export const WeatherTop = ({ data }) => {
  const { dt, name } = data;
  const { main } = data.weather[0];
  const { sunrise, sunset } = data.sys;
  const { temp, temp_min, temp_max } = data.main;
  const formatTemp = celsius(temp);
  const formatTempMin = celsius(temp_min);
  const formatTempMax = celsius(temp_max);

  const nowDate = DateFormatte(dt);
  const nowTime = TimeFormatte(dt);

  const sunriseTime = TimeFormatte(sunrise);
  const sunsetTime = TimeFormatte(sunset);

  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.city}>{name}</Text>
          <Text style={styles.weather}>{main}</Text>
          <Text style={styles.temp}>{Math.round(formatTemp)}°</Text>
        </View>
        <Text style={styles.nowDate}>
          {nowDate}　{nowTime}
        </Text>
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.itemContainer}>
          <View style={styles.left}>
            <Text>最低気温</Text>
            <Text style={styles.info}>{Math.round(formatTempMin)}°</Text>
          </View>
          <View style={styles.right}>
            <Text>最高気温</Text>
            <Text style={styles.info}>{Math.round(formatTempMax)}°</Text>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.left}>
            <Text>日の出</Text>
            <Text style={styles.info}>{sunriseTime}</Text>
          </View>
          <View style={styles.right}>
            <Text>日の入</Text>
            <Text style={styles.info}>{sunsetTime}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  footerContainer: {
    paddingHorizontal: 30,
  },
  header: {
    alignItems: "center",
  },
  city: {
    fontSize: 28,
    fontWeight: "bold",
    margin: 5,
  },
  weather: {
    fontSize: 18,
    margin: 5,
  },
  temp: {
    fontSize: 28,
    margin: 5,
    fontWeight: "bold",
  },
  nowDate: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 25,
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  left: {
    width: "50%",
  },
  right: {
    width: "50%",
  },
  info: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

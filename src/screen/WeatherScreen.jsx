import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const API_KEY = "850d26ff727d3988078df0477f3fd3fd";
const CITY = "Tokyo";
const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`;

const WeatherListItem = ({ item }) => {
  const { dt_txt, weather, main } = item;
  const { description, icon } = weather[0];
  const weatherMain = weather[0].main;
  const { temp_max, temp_min } = main;

  const dateString = dt_txt;
  const dateObj = new Date(dateString);

  // 日付を mm/dd(曜日) hh:mm 形式にフォーマット
  const options = {
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false, // 24時間制で表示する
  };
  const formatter = new Intl.DateTimeFormat("ja", options);
  const formattedDate = formatter.format(dateObj);

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

  return (
    <View style={styles.item}>
      <Text style={styles.date}>{formattedDate}</Text>
      <Ionicons
        name={iconWeather(weatherMain)}
        size={35}
        color="black"
        style={styles.icon}
      />
      <View style={styles.temps}>
        <Text style={styles.tempMax}>{Math.round(temp_max)}°C</Text>
        <Text style={styles.tempMin}>{Math.round(temp_min)}°C</Text>
      </View>
    </View>
  );
};

const WeatherList = ({ data }) => {
  return (
    <FlatList
      style={styles.weatherList}
      data={data}
      renderItem={({ item }) => <WeatherListItem item={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export const WeatherScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setData(response.data.list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{CITY}</Text>
      <WeatherList data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2ECE4",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
    textAlign: "center",
  },
  weatherList: {
    marginHorizontal: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderRadius: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#111",
  },
  date: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    width: "45%",
  },
  icon: {
    width: "25%",
  },
  temps: {
    flexDirection: "row",
    width: "25%",
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

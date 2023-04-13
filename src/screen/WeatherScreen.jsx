import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { WeatherList } from "../component/WeatherList";
import { WeatherTop } from "../component/WeatherTop";
import axios from "axios";

const API_KEY = "850d26ff727d3988078df0477f3fd3fd";
const CITY = "Tokyo";
const CITY_ID = "1850147";
const ForecastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`;
const CurrentURL = `https://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&appid=${API_KEY}`;

export const WeatherScreen = () => {
  const [forecastData, setForecastData] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const forecastResponse = await axios.get(ForecastURL);
        const currentResponse = await axios.get(CurrentURL);
        setForecastData(forecastResponse.data.list);
        setCurrentData(currentResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {currentData && <WeatherTop data={currentData} />}
      <FlatList
        style={styles.weatherList}
        data={forecastData}
        renderItem={({ item }) => <WeatherList item={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 30,
  },
  weatherList: {
    paddingHorizontal: 30,
  },
});

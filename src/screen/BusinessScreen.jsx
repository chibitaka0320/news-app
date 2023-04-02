import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView } from "react-native";
import axios from "axios";
import { NewsList } from "../component/NewsList";

export const BusinessScreen = ({ navigation }) => {
  const [news, setNews] = useState(null);

  const url =
    "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a5d3a12724214f949d3318cc7f2c8ddc";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setNews(response.data.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <NewsList
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            date={item.publishedAt}
            onPress={() => navigation.navigate("Web", { articles: item })}
          />
        )}
        keyExtractor={(item) => item.url}
      />
    </SafeAreaView>
  );
};

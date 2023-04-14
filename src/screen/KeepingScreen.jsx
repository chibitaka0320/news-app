import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { NewsList } from "../component/NewsList";
import { UserContext } from "../context/UserContext";
import { getKeep } from "../lib/firebase";
import { useIsFocused } from "@react-navigation/native";

export const KeepingScreen = ({ navigation }) => {
  const [news, setNews] = useState(null);
  const { user } = useContext(UserContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    const result = async () => {
      const articles = await getKeep(user.id);
      setNews(articles);
    };
    if (isFocused) {
      result();
    }
  }, [isFocused]);

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

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

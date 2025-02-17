import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { ListItem } from "../../../components/ListItem";
import { useEffect, useState } from "react";
import { Article } from "../../../types/article";
import axios from "axios";
import { router } from "expo-router";

const URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${process.env.EXPO_PUBLIC_NEWS_API}`;

const Home = (): JSX.Element => {
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchArticles = async () => {
    try {
      const res = await axios.get(URL);
      setArticles(res.data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handlePress = (article: Article): void => {
    router.push({ pathname: "/screen/article", params: article });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => {
          return (
            <ListItem
              imageUrl={item.urlToImage}
              title={item.title}
              author={item.author}
              onPress={() => {
                handlePress(item);
              }}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Home;

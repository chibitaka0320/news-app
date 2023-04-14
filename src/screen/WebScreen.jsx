import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { ClipButton } from "../component/ClipButton";
import { UserContext } from "../context/UserContext";
import { keepCheck, keepArticle, deleteArticle } from "../lib/firebase";

export const WebScreen = ({ route }) => {
  const { user } = useContext(UserContext);
  const [keeping, setKeeping] = useState(false);
  const { articles } = route.params;
  const [articleId, setArticleId] = useState("");

  useEffect(() => {
    const enabledCheck = async () => {
      const result = await keepCheck(user.id, articles.url);
      if (result.length > 0) {
        setKeeping(true);
        setArticleId(result[0]);
      }
    };
    enabledCheck();
  }, []);

  const onPress = async () => {
    const article = {
      urlToImage: articles.urlToImage,
      title: articles.title,
      author: articles.author,
      publishedAt: articles.publishedAt,
      url: articles.url,
    };
    if (keeping) {
      deleteArticle(user.id, articleId);
      setKeeping(false);
    } else {
      await keepArticle(user.id, article);
      setKeeping(true);
    }
    // await keepArticle(user.id, article);
  };

  return (
    <View style={styles.container}>
      <ClipButton onPress={onPress} enabled={keeping} />
      <WebView
        source={{ uri: articles.url }}
        mediaPlaybackRequiresUserAction={true}
        useWebKit={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

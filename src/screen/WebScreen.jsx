import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";
import { ClipButton } from "../component/ClipButton";
import { UserContext } from "../context/UserContext";
import { keepCheck, keepArticle, deleteArticle } from "../lib/firebase";
import { useIsFocused } from "@react-navigation/native";

export const WebScreen = ({ route }) => {
  const { user } = useContext(UserContext);
  const [keeping, setKeeping] = useState(false);
  const { articles } = route.params;
  const [articleId, setArticleId] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    const enabledCheck = async () => {
      const result = await keepCheck(user.id, articles.url);
      if (result.length > 0) {
        setKeeping(true);
        setArticleId(result[0]);
      }
    };
    enabledCheck();
  }, [isFocused]);

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
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: articles.url }}
        mediaPlaybackRequiresUserAction={true}
        useWebKit={true}
        style={styles.webView}
      />
      <ClipButton onPress={onPress} enabled={keeping} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  textContainer: {
    position: "absolute",
    alignSelf: "center",
    bottom: 15,
    backgroundColor: "black",
    borderRadius: 50,
    width: "90%",
    height: 60,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import WebView from "react-native-webview";

const Article = (): JSX.Element => {
  const article = useLocalSearchParams();
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: article.url as string }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Article;

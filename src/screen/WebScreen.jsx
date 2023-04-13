import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export const WebScreen = ({ route }) => {
  const { articles } = route.params;

  return (
    <View style={styles.container}>
      <WebView source={{ uri: articles.url }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

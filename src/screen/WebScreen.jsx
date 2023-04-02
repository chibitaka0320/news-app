import { WebView } from "react-native-webview";

export const WebScreen = ({ route }) => {
  const { articles } = route.params;
  return <WebView source={{ uri: articles.url }} />;
};

import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import WebView from "react-native-webview";
import { ClipButton } from "../../../components/ClipButton";
import { useDispatch, useSelector } from "react-redux";
import { addClip, deleteClip } from "../../store/userSlice";

const Article = (): JSX.Element => {
  const article = useLocalSearchParams();
  const dispatch = useDispatch();
  const clips = useSelector((state: any) => state.user.clips);
  const isClipped = clips.some((clip: any) => clip.url === article.url);
  const onPressClip = () => {
    if (isClipped) {
      dispatch(deleteClip(article));
    } else {
      dispatch(addClip(article));
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ClipButton onPress={onPressClip} enabled={isClipped} />
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

import { FlatList, SafeAreaView, Text } from "react-native";
import { useSelector } from "react-redux";
import { Article } from "../../types/article";
import { ListItem } from "../../components/ListItem";
import { router } from "expo-router";

const Clip = (): JSX.Element => {
  const clips = useSelector((state: any) => state.user.clips) as Article[];

  const handlePress = (article: Article): void => {
    router.push({ pathname: "/screen/article", params: article });
  };
  return (
    <SafeAreaView>
      <FlatList
        data={clips}
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

export default Clip;

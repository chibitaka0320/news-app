import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import moment from "moment";

export const NewsList = ({ imageUrl, title, author, date, onPress }) => {
  const proDate = moment(date);
  const formattedDate = proDate.format("YYYY/MM/DD HH:mm");

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Image style={styles.image} source={{ uri: imageUrl }} />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.title} numberOfLines={3}>
          {title}
        </Text>
        <Text style={styles.author} numberOfLines={2}>
          {author}
        </Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 0.4,
  },
  image: {
    width: 120,
    height: 120,
  },
  rightContainer: {
    flex: 1,
    paddingLeft: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  author: {
    marginVertical: 5,
  },
});

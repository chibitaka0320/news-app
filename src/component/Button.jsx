import React from "react";
import { StyleSheet, TouchableOpacity, Text, Image, View } from "react-native";

export const Button = (props) => {
  const imagePath = props.image;
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Image
        source={{
          uri: imagePath,
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: 10,
    borderWidth: 0.5,
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
  },
  image: {
    left: 30,
    width: 20,
    height: 20,
  },
});

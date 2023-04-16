import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const ClipButton = ({ onPress, enabled }) => {
  const name = enabled ? "check" : "plus";
  const backgroundColor = enabled ? "#d3d3d3" : "black";
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: backgroundColor }]}
    >
      <FontAwesome name={name} size={20} color="white" />
      <Text style={styles.text}>PICK</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "center",
    bottom: 25,
    borderRadius: 50,
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 15,
  },
});

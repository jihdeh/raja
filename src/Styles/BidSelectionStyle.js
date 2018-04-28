import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  checkSelections: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20
  }
});

export default styles;

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#d6d7d8"
  },
  headerRightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  headerRightIcon: {
    paddingRight: 10
  }
});

export default styles;

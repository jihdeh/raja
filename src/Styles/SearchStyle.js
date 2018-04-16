import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    backgroundColor: "rgba(226, 226, 226, 0.6)",
    marginBottom: 20
  },
  searchList: {
    margin: 10
  },
  searchList__category: {
    fontSize: 20,
    fontWeight: "bold"
  },
  searchList__category_product: {
    marginLeft: 10,
    marginTop: 10
  },
  searchIcon: {
    padding: 10
  },
  searchInput: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 0,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: "rgba(226, 226, 226, 0.6)",
    color: "rgb(45, 45, 45)"
  },
  suggestionHeader: {
    height: 40,
    width: width / 2,
    padding: 10,
    textAlign: "center"
  },
  suggestionHeaderWrapper: {
    backgroundColor: "#bababa"
  },
  suggestionContainer: {
    borderColor: "#bababa",
    borderBottomWidth: 1,
    flexDirection: "row"
  },
  suggestionText: {
    color: "black",
    padding: 15
    // borderWidth: 1,
    // borderColor: "#bababa"
  },
  suggestionTextContainer: {
    borderColor: "#bababa",
    borderBottomWidth: 1
  }
});

export default styles;

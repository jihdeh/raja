import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  topUpButton: {
    width: width / 2,
    height: 10,
    backgroundColor: "#515151",
    paddingVertical: 10,
    height: 40,
    justifyContent: "center"
  },
  subContainer: {
    padding: 20
  },
  labelHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 40
  },
  sectionOneCurrContainer: {
    marginBottom: 30,
    flexDirection: "row"
  },
  sectionTwoMenu: {
    flexDirection: "row",
    marginBottom: 30
  },
  sectionTwoMenuIcon: {
    fontSize: 20
  },
  sectionTwoMenuText: {
    marginLeft: 15
  },
  detailsAlign: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
    justifyContent: "space-between"
  }
});

export default styles;

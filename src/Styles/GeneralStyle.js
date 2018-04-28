import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff"
  },
  hotListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#d6d7d8",
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    opacity: 2,
    marginTop: 10,
    marginBottom: 5
  },
  icon: {
    paddingTop: 20,
    height: 50,
    width: 50
  },
  grayMessage: {
    fontWeight: "700",
    fontSize: 18,
    color: "#9b9b9b"
  },
  blackMessage: {
    fontWeight: "700",
    fontSize: 32,
    color: "#282828"
  },
  input: {
    height: 40,
    backgroundColor: "rgba(226, 226, 226, 0.6)",
    marginBottom: 10,
    color: "rgb(45, 45, 45)",
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: "#515151",
    paddingVertical: 10,
    height: 50,
    justifyContent: "center"
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: 16
  },
  linkBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5
  },
  horizon: {
    // flex: 1,
    marginTop: 20,
    flexDirection: "row"
  },
  horizonLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#d6d7d8"
  },
  buttonContainer: {
    backgroundColor: "#515151",
    paddingVertical: 10,
    height: 50,
    justifyContent: "center"
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: 16
  }
});

export default styles;

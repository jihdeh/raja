import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;

export default StyleSheet.create({
  button: {
    height: 35,
    borderRadius: 5,
    marginHorizontal: 0,
    width: width / 1.2,
    backgroundColor: "#3B5998",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row"
  },
  backgroundImage: {
    alignSelf: "center",
    flexDirection: "row"
  },
  buttonText: {
    color: "white",
    flex: 1,
    alignSelf: "center",
    fontSize: 15,
    marginTop: 0,
    marginLeft: -30,
    textAlign: "center"
  },
  facebookIcon: {
    alignSelf: "flex-start",
    width: 15,
    marginHorizontal: 20,
    marginTop: 7
  }
});

import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },

  logo: { width: 150, height: 150 },

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
  loginInputContainer: {
    width: width / 1.2,
    marginTop: 20
  },
  horizon: {
    // flex: 1,
    marginTop: 20,
    flexDirection: "row"
  },
  horizonLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#d6d7d8"
  }
});

export default styles;

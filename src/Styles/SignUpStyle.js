import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  icon: {
    paddingTop: 20,
    height: 50,
    width: 50
  },
  messageView: {
    paddingTop: 50
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
  centerView: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 200
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
  }
});

export default styles;

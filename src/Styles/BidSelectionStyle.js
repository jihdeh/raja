import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  checkSelections: {
    // flex: 1,
    flexDirection: "row",
    marginTop: 20
  },
  priceInput: {
    marginTop: 20
  },
  product_text_header: {
    fontSize: 15,
    textAlign: "center",
    width: "50%",
    alignSelf: "center",
    justifyContent: "center"
  },
  product_text: {
    fontSize: 15,
    marginBottom: 5
  },
  dateTimePickerButton: {
    backgroundColor: "#515151",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    flexDirection: "row"
  },
  dateTimePickerButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: 16
  },
  breakLine: {
    marginTop: 20,
    marginBottom: 10,
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  },
  buttonActions: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    marginTop: 10
  },
  btn: {
    width: width / 2
  }
});

export default styles;

import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  mediaConatiner: {
    backgroundColor: "#FFFFFF",
    flex: 1
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 3,
    marginLeft: 8,
    marginTop: 8,
    marginHorizontal: 3
  },
  image: { height: 100, width: 100, margin: 5, borderRadius: 5 },
  description: {
    height: 50
  },
  productInformation: {
    padding: 10,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  product_text: {
    marginTop: 10,
    marginBottom: 5
  },
  btn: {
    marginBottom: 20
  },
  rightEnd: {
    // width: 250,
    paddingLeft: 20,
    justifyContent: "flex-end"
  }
});

export default styles;

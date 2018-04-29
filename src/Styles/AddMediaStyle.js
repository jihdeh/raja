import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
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
  afterLayer: {
    width: width / 1.2,
    justifyContent: "center",
    flex: 1,
    marginTop: 20
  },
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    backgroundColor: "white"
  },
  product_text: {
    marginTop: 10,
    marginBottom: 5
  },
  btn: {
    marginBottom: 10
  }
});

export default styles;

import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  cartContainer: {
    display: "flex",
    flex: 1,
    padding: 20,
    paddingTop: 30
  },
  cartBtnCont: {
    flex: 1
  },
  cartBtn: {
    flex: 1,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff5252"
  },
  cartItems: {
    flex: 6,
    paddingTop: 5,
    paddingBottom: 5
  },
  myTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15
  },
  btnTitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignItems: "center"
  },
  cartItemsScrollableCont: { flex: 1 },
  eachCartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    height: height / 8
  },
  imageCont: {
    flex: 1,
    marginBottom: 10
  },
  detailCont: {
    flex: 2,
    justifyContent: "space-between",
    paddingLeft: 20
  },
  imageItem: {
    width: "100%",
    height: "100%",
    borderRadius: 10
  },

  topDetail: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  detailLabel: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    display: "flex",
    flex: 3,
    color: "rgba(0,0,0,.2)",
    fontSize: 13,
    fontWeight: "bold"
  },
  top: {
    fontSize: 13,
    fontWeight: "bold"
  },
  cancelCont: {
    flex: 1
  },
  detailOne: {
    marginBottom: 9,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 1
  },
  topCont: {
    marginBottom: 10
  },
  cancel: {
    alignItems: "flex-end",
    marginBottom: 10
  },
  ex: { color: "rgba(0,0,0,.2)", fontSize: 20 },
  Inputs: {
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 3,
    borderColor: "rgba(0,0,0,.2)",
    marginLeft: 2,
    marginTop: 1,
    color: "#ff5252",
    fontWeight: "bold",
    fontSize: 12
  },
  btnTitleTxt: {
    fontWeight: "bold",
    fontSize: 11,
    color: "rgba(0,0,0,.7)"
  },
  btnTitleTxtTwo: {
    fontWeight: "bold",
    fontSize: 13,
    color: "rgba(0,0,0,.9)"
  }
});

export default styles;

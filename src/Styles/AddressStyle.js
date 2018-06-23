import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.05)",
    padding: 20,
    paddingTop: 35
  },
  scrollableCont: {
    flex: 5,
    backgroundColor: "transparent"
  },
  bottomCont: {
    flex: 2,
    justifyContent: "space-around",
    alignItems: "center"
  },
  scrollable: {
    flex: 1
  },
  welc: {
    textAlign: "center",
    paddingTop: 25,
    paddingBottom: 25,
    fontSize: 17
  },
  trackbar: {
    backgroundColor: "grey",
    width: 40,
    paddingTop: 5,
    borderRadius: 10
  },
  myProceedBtn: {
    height: height / 14,
    width: "100%",
    backgroundColor: "#6c63c0",
    justifyContent: "center",
    alignItems: "center"
  },
  btnTxt: {
    color: "white",
    fontSize: 18,
    fontWeight: "500"
  },
  btnLbl: {
    fontSize: 18,
    fontWeight: "400"
  },
  welcIn: {
    color: "#6c63c0"
  },
  itemCont: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "white",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1
  },
  editor: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 10
  },
  moreDetails: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: 80,
    flex: 2,
    marginTop: 5
  },
  check: {
    flex: 3,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  loc: {
    fontWeight: "bold",
    color: "grey"
  },
  selected: {
    color: "#6c63c0"
  },
  divis: {
    flex: 1
  },
  lbl: {
    color: "#6c63c0"
  },
  myCheckBox: { flex: 1, justifyContent: "flex-start", paddingTop: 8 }
});

export default styles;

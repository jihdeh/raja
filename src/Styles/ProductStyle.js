import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  profileImage: {
    alignSelf: "flex-start",
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 15
  },

  textWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "stretch",
    alignSelf: "stretch"
  },

  followBtn: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    height: 25,
    paddingLeft: 10,
    paddingTop: 3,
    paddingRight: 10
  },
  profileName: {
    textAlign: "center",
    paddingLeft: 10
  },
  subText: {
    display: "flex",
    flexDirection: "column"
  },
  productInfoMore: {
    margin: 20
  },
  productInfoMoreX: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 5,
    height: 50,
    marginTop: 10
  },
  hr: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10
  }
});

export default styles;

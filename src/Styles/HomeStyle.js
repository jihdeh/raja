import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  listsContainer: {
    margin: 10
  },

  saleTitle: {
    width: 150
  },

  saleAmount: {
    width: 150,
    paddingTop: 5
  },

  saleImage: {
    width: 150,
    height: 120,
    borderRadius: 5
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

  userFeedContainer: {
    width: width / 2 - 15,
    backgroundColor: "#FFFFFF",
    marginLeft: 10,
    borderRadius: 10,
    marginBottom: 20
  },

  profileContainer: {
    flexDirection: "row",
    marginVertical: 3,
    marginLeft: 8,
    marginTop: 8,
    marginHorizontal: 3
  },

  profileImage: {
    alignSelf: "flex-start",
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 15
  },

  textWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  profileName: {
    marginHorizontal: 1,
    textAlign: "center",
    paddingLeft: 10
  },

  itemForSaleContainer: {},
  itemForSaleImage: {
    marginTop: 8,
    width: "100%",
    height: 180,
    borderRadius: 5
  }
});

export default styles;

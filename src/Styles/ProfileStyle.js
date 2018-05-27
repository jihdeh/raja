import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  profileImage: {
    alignSelf: "flex-start",
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 50
  },
  profileHeader: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20
  },
  profileInfoLayer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around"
  },

  profileInfoTile: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around"
  },
  profileInfo: {
    flexDirection: "column"
  },
  profileInfoCount: {
    textAlign: "center"
  },
  profileSetting: {
    flex: 1,
    position: "absolute",
    top: 60,
    right: 30,
    alignSelf: "flex-end"
  },
  settingBtn: {
    borderWidth: 2,
    width: width / 1.3,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 75,
    paddingRight: 75,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 5
  },
  settingBtnText: {
    textAlign: "center",
    color: "#515151",
    fontSize: 15,
    fontWeight: "200"
  },
  profileUser: {
    padding: 20
  },
  searchInput: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 0,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: "rgba(226, 226, 226, 0.6)",
    color: "rgb(45, 45, 45)"
  },
  searchInputIcon: {
    // display: "flex",
    padding: 10
  },
  searchSection: {
    flexDirection: "row",
    backgroundColor: "rgba(226, 226, 226, 0.6)",
    marginBottom: 20
  },
  listView: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

export default styles;

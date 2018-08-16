import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  AsyncStorage,
  Button
} from "react-native";
const width = Dimensions.get("window").width;
import { Icon } from "native-base";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import get from "lodash/get";
import RecommendedFeeds from "../Components/HomeComponents/UserFeeds";

import GStyles from "../Styles/GeneralStyle";
import Styles from "../Styles/WalletStyle";

const dummyData = [
  {
    displayName: "ladmerc",
    email: "ladna_mekelive@yahoo.com",
    id: "5ac94d1d3359b90004ab9756",
    isFeatured: false,
    isFollowing: false,
    location: {
      isDefault: true,
      _id: "5b3ea53bf1cd600004f19a64",
      firstName: "asm",
      lastName: "masm",
      phone: "0292912801381830"
    },
    meta: { averageRating: 0, sellCount: 0 },
    photo: "https://s3.eu-west-2.amazonaws.com/juli-test/profile-icon.png",
    username: "ladmerc"
  },
  {
    displayName: "rogers",
    email: "jide2@gmail.com",
    id: "5b16f79378420800040c08f5",
    isFeatured: false,
    isFollowing: false,
    location: {
      isDefault: true,
      _id: "5b2ac7638f6fcd00043bbeec",
      firstName: "Awonpere",
      lastName: "Suffery",
      phone: "8069790405"
    },
    meta: { averageRating: 0, sellCount: 0 },
    photo: "https://s3.eu-west-2.amazonaws.com/juli-test/profile-icon.png",
    username: "rogers"
  }
];

class Recommended extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    hasParams = !params ? { header: null } : params;
    return {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" style={{ color: tintColor }} />
      ),
      headerLeft: null,
      title: "Recommended"
    };
  };

  state = {};

  async componentDidMount() {
    const { user } = this.props;
    const { user: isAuthenticated } = user;
  }

  render() {
    const {
      user: { userExtended },
      navigation
    } = this.props;
    
    return (
      <View style={Styles.container}>
        <ScrollView>
          <View style={Styles.subContainer}>
            <View style={Styles.labelHeader}>
              <Text>
                You will need to follow at least 3 people, before you can move
                onto the next screen.
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <View style={Styles.sectionOneCurrContainer}>
                <Text style={{ fontWeight: "bold", fontSize: 30 }}>1.00</Text>
                <Text>Rp</Text>
              </View>
              <TouchableOpacity style={Styles.topUpButton}>
                <Text style={GStyles.buttonText}>Top Up</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ borderWidth: 3, borderColor: "#e4e4e4" }} />
          <RecommendedFeeds userFeedsList={dummyData} />
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={[
            Styles.topUpButton,
            {
              position: "absolute",
              bottom: 0
            }
          ]}
        >
          <Text style={GStyles.buttonText}>Go TO HOME</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={[
            Styles.topUpButton,
            {
              position: "absolute",
              bottom: 0,
              right: 0
            }
          ]}
        >
          <Text style={GStyles.buttonText}>Just Kidding here</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  product: state.get("product").toJS(),
  user: state.get("auth").toJS()
});

export default connect(
  mapStateToProps,
  null
)(Recommended);

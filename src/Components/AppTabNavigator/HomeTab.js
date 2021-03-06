import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  AsyncStorage
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import get from "lodash/get";
import { getLoggedUserProfile } from "../../Actions/AuthAction";
import {
  getCategories,
  getFollowers,
  getFollowings,
  getWalletAmount
} from "../../Actions/SharedAction";
import { getCouriers } from "../../Actions/LocationAction";
import { getProducts, getCartItem } from "../../Actions/ProductAction";

import { Container, Content, Icon } from "native-base";
import HotLists from "../HomeComponents/HotLists";
import UserFeeds from "../HomeComponents/UserFeeds";
import Styles from "../../Styles/HomeStyle";
import GStyles from "../../Styles/GeneralStyle";

class HomeTab extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    hasParams = !params ? { header: null } : params;
    return {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" style={{ color: tintColor }} />
      ),
      headerLeft: (
        <View style={GStyles.headerRightContainer}>
          <Icon
            name="ios-cart"
            onPress={() => navigation.navigate("CartScreen")}
            style={{ paddingLeft: 10 }}
          />
          <Icon
            name="ios-cash-outline"
            onPress={() => navigation.navigate("WalletScreen")}
            style={{ paddingLeft: 20 }}
          />
        </View>
      ),
      headerRight: (
        <View style={GStyles.headerRightContainer}>
          <Icon
            onPress={() => navigation.navigate("BookmarkScreen")}
            style={GStyles.headerRightIcon}
            name="ios-bookmark"
          />
          <Icon onPress={() => navigation.navigate('ChatListScreen')}
            style={{ paddingRight: 10 }} name="md-mail" 
          />
        </View>
      )
    };
  };

  async componentDidMount() {
    const {
      navigation,
      auth,
      getCategories,
      getProducts,
      getCouriers,
      getLoggedUserProfile,
      getFollowers,
      getFollowings,
      getCartItem,
      getWalletAmount
    } = this.props;
    const { user: isAuthenticated } = auth;

    getCategories();
    getCouriers();
    const token =
      (await AsyncStorage.getItem("token")) || isAuthenticated.token;
    getProducts("onSale")
      .then(() => getProducts("isTrending"))
      .then(() => getProducts("isFeatured"))
      .then(() => getLoggedUserProfile(token))
      .then(() => getFollowers(token))
      .then(() => getFollowings(token))
      .then(() => getCartItem(token))
      .then(() => getWalletAmount(token));
  }

  render() {
    const { navigation, products, shared } = this.props;
    const hasFetchedProducts = products && products.toJS();
    return (
      <View>
        <ScrollView>
          <HotLists
            hotListsItems={hasFetchedProducts}
            navigation={navigation}
          />
          <UserFeeds
            userFeedsList={get(shared, "followings") && shared.followings}
            navigation={navigation}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  shared: state.get("shared").toJS(),
  products: state.get("product"),
  auth: state.get("auth").toJS()
});

const mapDispatchToProps = dispatch => {
  return {
    getCategories: bindActionCreators(getCategories, dispatch),
    getCouriers: bindActionCreators(getCouriers, dispatch),
    getProducts: bindActionCreators(getProducts, dispatch),
    getFollowers: bindActionCreators(getFollowers, dispatch),
    getFollowings: bindActionCreators(getFollowings, dispatch),
    getLoggedUserProfile: bindActionCreators(getLoggedUserProfile, dispatch),
    getCartItem: bindActionCreators(getCartItem, dispatch),
    getWalletAmount: bindActionCreators(getWalletAmount, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeTab);

import React, { Component, PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Image,
  Button,
  TextInput,
  FlatList,
  ScrollView
} from "react-native";
import jwtDecode from "jwt-decode";
import get from "lodash/get";
import { Icon } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout, getFollowingUserProfile } from "../../Actions/AuthAction";
import RightHeader from "../ProfileRightHeader";
import ProfileView from "../ProfileView";
import UserProfile from "../UserProfile";
import { getUserProducts } from "../../Actions/ProductAction";

class ProfileTab extends PureComponent {
  constructor(props) {
    super(props);
    this.hasLoaded = null;
  }

  static navigationOptions = ({ navigation }) => {
    return {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="person" style={{ color: tintColor }} />
      ),
      headerLeft: (
        <Text style={{ paddingLeft: 10 }}>
          {get(navigation, "state.params.username") &&
            get(navigation, "state.params.username").toUpperCase()}
        </Text>
      ),
      headerRight: <RightHeader navigation={navigation} />
    };
  };

  async componentWillMount() {
    const { navigation } = this.props;
    const value = await AsyncStorage.getItem("token");
    const decoded = jwtDecode(value);
    if (decoded && !get(navigation, "state.params.username")) {
      navigation.setParams({
        username: decoded.username
      });
    }
  }

  async loadProfileProducts(id, type) {
    const {
      getUserProducts,
      getFollowingUserProfile,
      user: { user: isAuthenticated }
    } = this.props;
    const authToken =
      (await AsyncStorage.getItem("token")) || get(isAuthenticated, "token");

    if (authToken && id) {
      getUserProducts(authToken, id, type);
      getFollowingUserProfile(authToken, id);
    }
    return;
  }

  pullAddress(addresses, type) {
    if (type === "following") {
      return addresses;
    }
    return addresses.find(user => user.isDefault);
  }

  async pullProducts() {
    const {
      navigation,
      products,
      user: { userExtended }
    } = this.props;
    const {
      state: { params }
    } = navigation;
    const hotListsItems = products;
    get(params, "followingProfile") &&
    get(params, "username") !== get(userExtended, "username")
      ? (!this.hasLoaded || this.hasLoaded !== get(params, "username")) &&
        this.loadProfileProducts(get(params, "following.id"), "following")
      : get(hotListsItems, "profileProducts.items") == undefined &&
        this.loadProfileProducts(get(userExtended, "id"));
  }

  render() {
    const {
      navigation,
      products,
      user: { userExtended, followingUserExtended },
      shared
    } = this.props;
    const {
      state: { params }
    } = navigation;
    const hotListsItems = products;

    this.pullProducts().then(() => (this.hasLoaded = get(params, "username")));

    const findDefaultAddress = !get(params, "followingProfile")
      ? get(userExtended, "addresses") &&
        this.pullAddress(userExtended.addresses)
      : get(params.following, "location") &&
        this.pullAddress(params.following.location, "following");

    return (
      <View>
        {get(params, "followingProfile") ? (
          <ProfileView
            navigation={navigation}
            profile={followingUserExtended && followingUserExtended}
            username={get(params, "following.username") || "..."}
            hotListsItems={get(hotListsItems, "followingProfileProducts")}
            address={get(findDefaultAddress, "address")}
          />
        ) : (
          <UserProfile
            navigation={navigation}
            // username={get(userExtended, "username") || "..."}
            // profile={followingUserExtended && followingUserExtended}
            // followers={get(shared, "followers")}
            // user={userExtended}
            // hotListsItems={get(hotListsItems, "profileProducts")}
            // address={get(findDefaultAddress, "address")}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  products: state.get("product").toJS(),
  user: state.get("auth").toJS(),
  shared: state.get("shared").toJS()
});

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(logout, dispatch),
  getFollowingUserProfile: bindActionCreators(
    getFollowingUserProfile,
    dispatch
  ),
  getUserProducts: bindActionCreators(getUserProducts, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileTab);

import React, { Component } from "react";
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
import { logout } from "../../Actions/AuthAction";
import GStyles from "../../Styles/GeneralStyle";
import Styles from "../../Styles/ProfileStyle";
import HStyles from "../../Styles/HomeStyle";

class RightHeader extends Component {
  state = {
    onSettingGearClicked: false
  };

  onGearClick = () => {
    this.setState({ onSettingGearClicked: !this.state.onSettingGearClicked });
    return;
  };

  render() {
    return (
      <View style={GStyles.headerRightContainer}>
        <TouchableOpacity onPress={() => this.onGearClick()}>
          <Icon style={GStyles.headerRightIcon} name="md-settings" />
          {this.state.onSettingGearClicked && (
            <View style={Styles.settingsOption}>
              <Text style={Styles.settingsOptionText}>Profile</Text>
              <Text style={Styles.settingsOptionText}>Logout</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const _keyExtractor = (item, index) => item.id;
class ProfileTab extends Component {
  static navigationOptions = ({ navigation }) => {
    let x = false;
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
      headerRight: <RightHeader />
    };
  };

  state = {
    searchInput: ""
  };

  async componentWillMount() {
    const { navigation } = this.props;
    const value = await AsyncStorage.getItem("token");
    const decoded = jwtDecode(value);
    if (decoded && !get(navigation, "state.params.username")) {
      this.props.navigation.setParams({
        username: decoded.username
      });
    }
  }

  onLogout = () => {
    AsyncStorage.clear();
    this.props.logout();
    this.props.navigation.navigate("Landing");
  };

  renderImage = () => {
    return (
      <Image
        style={Styles.profileImage}
        resizeMode="cover"
        source={{
          uri:
            "https://vignette.wikia.nocookie.net/gumball/images/f/fc/Gumball.png/revision/latest?cb=20140110222931&path-prefix=pl"
        }}
      />
    );
  };

  onSettingsBtn = () => {
    console.log("button press");
  };

  renderItem = item => {
    const { navigation } = this.props;

    return (
      <View style={HStyles.userFeedContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ProductInfo", { item })}
        >
          <View style={HStyles.listsContainer}>
            <Image
              style={HStyles.itemForSaleImage}
              source={{ uri: get(item, "images[0].url") }}
            />
            <Text style={HStyles.saleTitle}>{item.name.toUpperCase()}</Text>
            <Text style={HStyles.saleAmount}>{item.salePrice}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { products } = this.props;
    const hotListsItems = products && products.toJS();

    return (
      <View>
        <ScrollView>
          <View style={Styles.profileHeader}>
            <View>{this.renderImage()}</View>
            <View style={Styles.profileInfoLayer}>
              <View style={Styles.profileInfo}>
                <Text style={Styles.profileInfoCount}>2</Text>
                <Text>Listings</Text>
              </View>

              <View style={Styles.profileInfo}>
                <Text style={Styles.profileInfoCount}>12</Text>
                <Text>Followers</Text>
              </View>
              <View style={Styles.profileInfo}>
                <Text style={Styles.profileInfoCount}>100%</Text>
                <Text>Rating</Text>
              </View>
            </View>
          </View>
          <View style={Styles.profileSetting}>
            <TouchableOpacity
              onPress={this.onSettingsBtn}
              style={Styles.settingBtn}
            >
              <Text style={Styles.settingBtnText}>Settings</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.profileUser}>
            <Text>Username</Text>
            <Text>
              <Icon name="ios-pin-outline" style={{ paddingLeft: 10 }} />{" "}
              Location
            </Text>
          </View>
          <View style={Styles.searchSection}>
            <TextInput
              style={Styles.searchInput}
              underlineColorAndroid="transparent"
              placeholder="Search"
              placeholderTextColor="rgba(45, 45, 45, 0.3)"
              returnKeyType="search"
              onChangeText={searchInput => this.setState({ searchInput })}
              value={this.state.searchInput}
            />
            <Icon
              style={Styles.searchInputIcon}
              name="ios-search"
              size={20}
              color="#000"
            />
          </View>
          <View>
            {get(hotListsItems, "productOnSale.products.length") ? (
              <FlatList
                numColumns={2}
                data={get(hotListsItems, "productOnSale.products")}
                keyExtractor={_keyExtractor}
                renderItem={({ item }) => this.renderItem(item)}
              />
            ) : (
              <View>
                {!get(hotListsItems, "productOnSale.products") ? (
                  <Text style={HStyles.noAvailableText}> Loading...</Text>
                ) : (
                  <Text style={HStyles.noAvailableText}>
                    We're sorry, no products for this user.
                  </Text>
                )}
              </View>
            )}
          </View>
          <TouchableOpacity onPress={this.onLogout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  products: state.get("product")
});

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(logout, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTab);

import React, { Component } from 'react';
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
} from 'react-native';
import jwtDecode from 'jwt-decode';
import get from 'lodash/get';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../Actions/AuthAction';
import GStyles from '../Styles/GeneralStyle';
import Styles from '../Styles/ProfileStyle';
import HStyles from '../Styles/HomeStyle';

const _keyExtractor = (item, index) => item.id;
class ProfileView extends Component {
  state = {
    searchInput: ''
  };

  onLogout = () => {
    AsyncStorage.clear();
    this.props.logout();
    this.props.navigation.navigate('Landing');
  };

  renderImage = () => {
    return (
      <Image
        style={Styles.profileImage}
        resizeMode="cover"
        source={{
          uri:
            'https://vignette.wikia.nocookie.net/gumball/images/f/fc/Gumball.png/revision/latest?cb=20140110222931&path-prefix=pl'
        }}
      />
    );
  };

  renderItem = item => {
    const { navigation } = this.props;

    return (
      <View style={HStyles.userFeedContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductInfo', { item })}
        >
          <View style={HStyles.listsContainer}>
            <Image
              resizeMethod="resize"
              style={HStyles.itemForSaleImage}
              source={{ uri: get(item, 'images[0].url') }}
            />

            <Text
              style={HStyles.saleTitle}
              numberOfLines={1}
              ellipsizeMode={'tail'}
            >
              {item.name}
            </Text>
            {item.saleFormat !== 'auction' && (
              <Text style={Styles.saleAmount}>{item.salePrice}</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  onSearchItem = searchInput => {
    const { hotListsItems } = this.props;
    const lists = get(hotListsItems, 'items');
    this.setState({ searchInput });
    const searchRes = lists.filter(item => item.name.indexOf(searchInput) > -1);
    this.setState({
      productSearchResult: searchRes
    });
  };

  render() {
    const {
      navigation,
      hotListsItems,
      address,
      username,
      followers,
      user: { userExtended }
    } = this.props;
    const { productSearchResult } = this.state;
    console.log(followers);
    return (
      <View>
        <ScrollView>
          <View style={Styles.profileHeader}>
            <View>{this.renderImage()}</View>
            <View style={Styles.profileInfoLayer}>
              <View style={Styles.profileInfo}>
                <Text style={Styles.profileInfoCount}>
                  {get(hotListsItems, 'items.length')}
                </Text>
                <Text>Listings</Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  userExtended.username === username &&
                  navigation.navigate('FollowersScreen')
                }
                style={Styles.profileInfo}
              >
                <Text style={Styles.profileInfoCount}>
                  {(followers && followers.length) || 0}
                </Text>
                <Text>Followers</Text>
              </TouchableOpacity>
              <View style={Styles.profileInfo}>
                <Text style={Styles.profileInfoCount}>100%</Text>
                <Text>Rating</Text>
              </View>
            </View>
          </View>
          <View style={Styles.profileSetting}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingsScreen')}
              style={Styles.settingBtn}
            >
              <Text style={Styles.settingBtnText}>Settings</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.profileUser}>
            <Text>{username}</Text>
            <Text>
              <Icon
                name="ios-pin-outline"
                style={{ paddingLeft: 10, marginRight: 10, fontSize: 20 }}
              />
              {address || 'No Address Set'}
            </Text>
          </View>
          <View style={Styles.searchSection}>
            <TextInput
              style={Styles.searchInput}
              underlineColorAndroid="transparent"
              placeholder="Search"
              placeholderTextColor="rgba(45, 45, 45, 0.3)"
              returnKeyType="search"
              onChangeText={searchInput => this.onSearchItem(searchInput)}
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
            {get(hotListsItems, 'items.length') ? (
              <FlatList
                numColumns={2}
                data={productSearchResult || get(hotListsItems, 'items')}
                keyExtractor={_keyExtractor}
                renderItem={({ item }) => this.renderItem(item)}
              />
            ) : (
              <View>
                {!get(hotListsItems, 'items') ? (
                  <Text style={HStyles.noAvailableText}> Loading...</Text>
                ) : (
                  <Text style={HStyles.noAvailableText}>
                    We're sorry, no products for this user.
                  </Text>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  products: state.get('product'),
  user: state.get('auth').toJS(),
  shared: state.get('shared').toJS()
});

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(logout, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);

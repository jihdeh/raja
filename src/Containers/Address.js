import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/get';
import CheckBox from 'react-native-check-box';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import { getCartItem, addToCart } from '../Actions/ProductAction';
import { getBookmarks } from '../Actions/SharedAction';

import Item from '../Components/Cart/Item';
import Addresses from '../Components/Address/Addresses';
import LStyles from '../Styles/AddressStyle';

class Address extends Component {
  render() {
    const { user: { userExtended, updateProfile }, navigation } = this.props;
    const addressMap =
      get(updateProfile, 'addresses') || get(userExtended, 'addresses');

    return (
      <View style={LStyles.container}>
        <View style={LStyles.scrollableCont}>
          <Text style={LStyles.welc}>Click to set as default</Text>
          <ScrollView style={LStyles.scrollable}>
            {get(userExtended, 'addresses.length') ? (
              <View>
                {addressMap.map((address, key) => (
                  <Addresses key={key} address={address} />
                ))}
              </View>
            ) : (
              <View>
                <Text>Please add an address in the settings view</Text>
              </View>
            )}
          </ScrollView>
        </View>
        <View style={LStyles.bottomCont}>
          <View style={LStyles.trackbar} />
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingsScreen')}
            style={LStyles.myProceedBtn}
          >
            <Text style={LStyles.btnTxt}>Add New Delivery Address</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.get('auth').toJS()
});

export default connect(mapStateToProps)(Address);

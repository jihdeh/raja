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
import { getBookmarks } from '../Actions/SharedAction';
import Item from '../Components/Cart/Item';

import GStyles from '../Styles/GeneralStyle';
import HStyles from '../Styles/HomeStyle';
import Styles from '../Styles/BookmarkStyle';
import CStyles from '../Styles/CartStyles';

class Cart extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={CStyles.cartContainer}>
        <View style={CStyles.cartItems}>
          <ScrollView style={CStyles.cartItemsScrollableCont}>
            <Item />
            <Item />
          </ScrollView>
        </View>
        <View style={CStyles.cartBtnCont}>
          <View style={CStyles.btnTitle}>
            <Text style={CStyles.btnTitleTxt}>Subtotal(2 items)</Text>
            <Text style={CStyles.btnTitleTxtTwo}>$440.00</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('CheckoutScreen')}
            style={CStyles.cartBtn}
          >
            <Text style={CStyles.myTxt}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Cart;

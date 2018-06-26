import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  InteractionManager
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { getBookmarks } from '../Actions/SharedAction';
import { getCartItem, addToCart } from '../Actions/ProductAction';
import Item from '../Components/Checkout/Item';
import Details from '../Components/Checkout/Details';
import Cost from '../Components/Checkout/Cost';

import FStyles from '../Styles/CheckoutStyle';

class Checkout extends Component {
  toScreen = Screen => {
    const { navigation } = this.props;

    InteractionManager.runAfterInteractions(() => {
      navigation.navigate(Screen);
    });
  };

  render() {
    const { product, user: { userExtended }, navigation } = this.props;

    return (
      <ScrollView style={FStyles.container}>
        <View style={FStyles.contOne}>
          {product.addToCart
            ? product.addToCart.items.map((cartItem, key) => {
                return <Item cartItem={cartItem} key={key} />;
              })
            : product.getCart &&
              product.getCart.items.map((cartItem, key) => {
                return <Item cartItem={cartItem} key={key} />;
              })}
        </View>
        <Details navigation={navigation} addresses={userExtended.addresses} />
        <Cost navigation={navigation} toScreen={this.toScreen} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  product: state.get('product').toJS(),
  user: state.get('auth').toJS()
});

const mapDispatchToProps = dispatch => ({
  getCartItem: bindActionCreators(getCartItem, dispatch),
  addToCart: bindActionCreators(addToCart, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

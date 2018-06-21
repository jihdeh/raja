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
import { getCartItem, addToCart } from '../Actions/ProductAction';
import Item from '../Components/Checkout/Item';
import Details from '../Components/Checkout/Details';
import Cost from '../Components/Checkout/Cost';

import FStyles from '../Styles/CheckoutStyle';

class Checkout extends Component {
  componentDidMount() {
    console.log('-ashere');
  }

  render() {
    const { product, user: { userExtended }, navigation } = this.props;
    console.log(userExtended);

    return (
      <View style={FStyles.container}>
        <View style={FStyles.contOne}>
          <ScrollView style={FStyles.scrollable}>
            {product.addToCart &&
              product.addToCart.items.map((cartItem, key) => {
                return <Item cartItem={cartItem} key={key} />;
              })}
          </ScrollView>
        </View>
        <Details navigation={navigation} addresses={userExtended.addresses} />
        <Cost product={product.addToCart} />
      </View>
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

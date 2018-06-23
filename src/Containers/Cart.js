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
import { getCartItem, addToCart } from '../Actions/ProductAction';
import { getBookmarks } from '../Actions/SharedAction';
import Item from '../Components/Cart/Item';

import GStyles from '../Styles/GeneralStyle';
import HStyles from '../Styles/HomeStyle';
import Styles from '../Styles/BookmarkStyle';
import CStyles from '../Styles/CartStyles';

class Cart extends Component {
  componentDidMount() {
    // this.props.getCartItem();
  }
  render() {
    const { navigation, product } = this.props;
    console.log(product);

    return (
      <View style={{ flex: 1 }}>
        {get(product, 'getCart') ? (
          get(product, 'addToCart.items.length') ||
          get(product, 'getCart.items.length') ? (
            <View style={CStyles.cartContainer}>
              <View style={CStyles.cartItems}>
                <ScrollView
                  style={CStyles.cartItemsScrollableCont}
                  keyboardShouldPersistTaps="always"
                >
                  {product.addToCart
                    ? product.addToCart.items.map((cartItem, key) => {
                        return (
                          <Item
                            cartId={product.addToCart.id}
                            cartItem={cartItem}
                            key={key}
                          />
                        );
                      })
                    : product.getCart &&
                      product.getCart.items.map((cartItem, key) => {
                        return (
                          <Item
                            cartId={product.getCart.id}
                            cartItem={cartItem}
                            key={key}
                          />
                        );
                      })}
                </ScrollView>
              </View>
              <View style={CStyles.cartBtnCont}>
                <View style={CStyles.btnTitle}>
                  <Text style={CStyles.btnTitleTxt}>
                    Subtotal({get(product, 'addToCart.items.length') ||
                      get(product, 'getCart.items.length')})
                  </Text>
                  <Text style={CStyles.btnTitleTxtTwo}>
                    Rp{get(product, 'addToCart.totalPrice') ||
                      get(product, 'getCart.totalPrice')}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('CheckoutScreen')}
                  style={CStyles.cartBtn}
                >
                  <Text style={CStyles.myTxt}>Checkout</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#000000' }}>Nothing added to cart</Text>
            </View>
          )
        ) : (
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#000000' }}>Loading...</Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  product: state.get('product').toJS()
});

const mapDispatchToProps = dispatch => ({
  getCartItem: bindActionCreators(getCartItem, dispatch),
  addToCart: bindActionCreators(addToCart, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

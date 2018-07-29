import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Picker from 'react-native-picker-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCartItem, addToCart } from '../../Actions/ProductAction';
import CStyles from '../../Styles/CartStyles';

class Item extends Component {
  state = {
    quantity: 1
  };

  updateCartItem() {
    const { cartId, addToCart, cartItem } = this.props;
    const { quantity } = this.state;
    addToCart(cartId, cartItem, quantity);
  }

  render() {
    const { cartItem } = this.props;

    return (
      <View style={CStyles.eachCartItem}>
        <TouchableOpacity style={CStyles.imageCont}>
          <Image source={{ uri: cartItem.image }} style={CStyles.imageItem} />
        </TouchableOpacity>
        <View style={CStyles.detailCont}>
          <View style={CStyles.topDetail}>
            <View style={CStyles.topCont}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={CStyles.top}
              >
                {cartItem.name}
              </Text>
              <Text style={CStyles.top}> Rp {Math.round(cartItem.price)}</Text>
            </View>
            <View>
              <TouchableOpacity style={CStyles.cancel} 
                onPress={
                  () => this.setState({ quantity: 0, cartItem: cartItem.id }, () => this.updateCartItem())
                }>
                <Text style={CStyles.ex}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={CStyles.detailOne}>
            <View>
              <Text style={CStyles.detailLabel}>QUANTITY</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              {/* <Picker
                  items={[1,2,3,4,5,6,7,8,9,10].map(i => ({ label: String(i), value: i }))}
                  hideIcon
                  onValueChange={quantity =>
                    this.setState({ quantity, cartItem: cartItem.id })
                  }
                  value={cartItem.quantity}
                /> */}
              <TextInput
                onChangeText={quantity =>
                  this.setState({ quantity, cartItem: cartItem.id })
                }
                style={CStyles.Inputs}
                defaultValue={cartItem.quantity.toString()}
              />
            </View>
          </View>
          {cartItem.id === this.state.cartItem ? (
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => this.updateCartItem()}
                style={CStyles.cancel}
              >
                <Text>Update</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Item);

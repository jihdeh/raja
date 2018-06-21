import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import FStyles from '../../Styles/CheckoutStyle';

const Cost = ({ product }) => (
  <View style={FStyles.contTwo}>
    <View style={FStyles.lowCont}>
      <Text style={FStyles.noEmph}>Subtotal</Text>
      <Text style={FStyles.noEmph}>Rp {product.totalPrice}</Text>
    </View>
    <View style={FStyles.lowCont}>
      <Text style={FStyles.noEmph}>Shipping cost</Text>
      <Text style={FStyles.noEmph}>Rp 5.00</Text>
    </View>
    <View style={FStyles.lowCont}>
      <Text style={FStyles.emph}>Total</Text>
      <Text style={FStyles.mEmph}>Rp {product.totalPrice}</Text>
    </View>
    <TouchableOpacity style={FStyles.evtbtn}>
      <Text style={FStyles.evntTxt}>Pay</Text>
    </TouchableOpacity>
  </View>
);

export default Cost;

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

const Item = ({ cartItem }) => (
  <View style={FStyles.itemCont}>
    <View style={FStyles.imageCont}>
      <Image source={{ uri: cartItem.image }} style={FStyles.imageItem} />
    </View>
    <View style={FStyles.detailCont}>
      <Text style={FStyles.toplbl}>{cartItem.name}</Text>
      <Text style={FStyles.lbl}>{cartItem.sellerName}</Text>
      <View style={FStyles.lblCont}>
        <Text style={FStyles.lbl}>Quantity {cartItem.quantity}</Text>
      </View>
    </View>
  </View>
);

export default Item;
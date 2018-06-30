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
import GStyles from '../../Styles/GeneralStyle';

const Item = ({ cartItem }) => (
  <View>
    <View style={FStyles.itemCont}>
      <View style={FStyles.imageCont}>
        <Image source={{ uri: cartItem.image }} style={FStyles.imageItem} />
      </View>
      <View style={FStyles.detailCont}>
        <Text style={FStyles.toplbl} numberOfLines={1} ellipsizeMode={'tail'}>
          {cartItem.name}
        </Text>
        <Text style={FStyles.lbl}>{cartItem.sellerName}</Text>
        <View style={FStyles.lblCont}>
          <Text style={FStyles.lbl}>Quantity {cartItem.quantity}</Text>
        </View>
      </View>
    </View>
    <View style={GStyles.horizonLine} />
  </View>
);

export default Item;

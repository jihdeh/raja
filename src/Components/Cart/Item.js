import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import CStyles from '../../Styles/CartStyles';

const Item = ({ cartItem }) => (
  <View style={CStyles.eachCartItem}>
    <TouchableOpacity style={CStyles.imageCont}>
      <Image source={{ uri: cartItem.image }} style={CStyles.imageItem} />
    </TouchableOpacity>
    <View style={CStyles.detailCont}>
      <View style={CStyles.topDetail}>
        <View style={CStyles.topCont}>
          <Text style={CStyles.top}>{cartItem.name}</Text>
          <Text style={CStyles.top}> Rp{cartItem.price}</Text>
        </View>
        <TouchableOpacity style={CStyles.cancel}>
          <Text style={CStyles.ex}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={CStyles.detailOne}>
        <Text style={CStyles.detailLabel}>QUANTITY</Text>
        <TextInput
          style={CStyles.Inputs}
          defaultValue={cartItem.quantity.toString()}
        />
      </View>
    </View>
  </View>
);

export default Item;

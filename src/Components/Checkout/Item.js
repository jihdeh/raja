import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import FStyles from "../../Styles/CheckoutStyle";

const Item = () => (
  <View style={FStyles.itemCont}>
    <View style={FStyles.imageCont}>
      <Image
        source={require("../../../assets/feed_images/2.jpg")}
        style={FStyles.imageItem}
      />
    </View>
    <View style={FStyles.detailCont}>
      <Text style={FStyles.toplbl}>Peach Simply</Text>
      <View style={FStyles.lblCont}>
        <Text style={FStyles.lbl}>Size 5</Text>
        <Text style={FStyles.lbl}>Quantity 1</Text>
      </View>
    </View>
  </View>
);

export default Item;

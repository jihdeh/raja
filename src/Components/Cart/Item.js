import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import CStyles from "../../Styles/CartStyles";

const Item = () => (
  <View style={CStyles.eachCartItem}>
    <TouchableOpacity style={CStyles.imageCont}>
      <Image
        source={require("../../../assets/feed_images/2.jpg")}
        style={CStyles.imageItem}
      />
    </TouchableOpacity>
    <View style={CStyles.detailCont}>
      <View style={CStyles.topDetail}>
        <View style={CStyles.topCont}>
          <Text style={CStyles.top}> Peach Simply</Text>
          <Text style={CStyles.top}> $120</Text>
        </View>
        <TouchableOpacity style={CStyles.cancel}>
          <Text style={CStyles.ex}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={CStyles.detailOne}>
        <Text style={CStyles.detailLabel}>SIZE</Text>
        <TextInput defaultValue="5" style={CStyles.Inputs} />
      </View>
      <View style={CStyles.detailOne}>
        <Text style={CStyles.detailLabel}>QUANTITY</Text>
        <TextInput style={CStyles.Inputs} defaultValue="6" />
      </View>
    </View>
  </View>
);

export default Item;

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

const Details = () => (
  <View style={FStyles.contOne}>
    <View style={FStyles.detailOne}>
      <View style={FStyles.lblHeader}>
        <Text style={FStyles.lbltitle}>Receiver Name</Text>
        <TouchableOpacity>
          <Text style={FStyles.lblevnt}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={FStyles.lbl}>Nella Kharisma</Text>
    </View>
    <View style={FStyles.detailOne}>
      <View style={FStyles.lblHeader}>
        <Text style={FStyles.lbltitle}>Address</Text>
        <TouchableOpacity>
          <Text style={FStyles.lblevnt}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Text style={FStyles.lbl}>123 6th St.</Text>
      <Text style={FStyles.lbl}>Melborne,FL 32904</Text>
    </View>
  </View>
);

export default Details;

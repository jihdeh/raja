import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import get from "lodash/get";
import { getCartItem, addToCart } from "../Actions/ProductAction";
import { getBookmarks } from "../Actions/SharedAction";
import Item from "../Components/Cart/Item";
import CheckBox from "react-native-check-box";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Addresses from "../Components/Address/Addresses";
import LStyles from "../Styles/AddressStyle";

export default class Address extends Component {
  render() {
    return (
      <View style={LStyles.container}>
        <View style={LStyles.scrollableCont}>
          <Text style={LStyles.welc}>
            Welcome, <Text style={LStyles.welcIn}>Jane Doe</Text>
          </Text>
          <ScrollView style={LStyles.scrollable}>
            <Addresses />
          </ScrollView>
        </View>
        <View style={LStyles.bottomCont}>
          <View style={LStyles.trackbar} />
          <Text style={LStyles.btnLbl}>Add New Delivery Address</Text>
          <TouchableOpacity style={LStyles.myProceedBtn}>
            <Text style={LStyles.btnTxt}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

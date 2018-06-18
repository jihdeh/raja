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
import { getBookmarks } from "../Actions/SharedAction";
import Item from "../Components/Checkout/Item";
import Details from "../Components/Checkout/Details";
import Cost from "../Components/Checkout/Cost";

import FStyles from "../Styles/CheckoutStyle";

class Checkout extends Component {
  render() {
    return (
      <View style={FStyles.container}>
        <View style={FStyles.contOne}>
          <ScrollView style={FStyles.scrollable}>
            <Item />
          </ScrollView>
        </View>
        <Details />
        <Cost />
      </View>
    );
  }
}

export default Checkout;

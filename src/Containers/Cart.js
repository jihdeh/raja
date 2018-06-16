import React, { Component } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import get from "lodash/get";
import { getBookmarks } from "../Actions/SharedAction";

import GStyles from "../Styles/GeneralStyle";
import HStyles from "../Styles/HomeStyle";
import Styles from "../Styles/BookmarkStyle";

class Cart extends Component {
  render() {
    return <Text>This is a cart</Text>;
  }
}

export default Cart;

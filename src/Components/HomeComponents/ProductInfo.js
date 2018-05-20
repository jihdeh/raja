import React, { Component } from "react";
import { View, Text, Image } from "react-native";

class ProductInfo extends Component {
  render() {
    const { navigation } = this.props;
    const { state } = navigation;
    const { params } = state;
    const { items } = params;

    return (
      <View style={{ flex: 1 }}>
        <Text>Action</Text>
      </View>
    );
  }
}

export default ProductInfo;

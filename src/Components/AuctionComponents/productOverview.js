import React, { Component } from "react";
import { View, Text } from "react-native";

class ProductOverview extends Component {
  render() {
    const { navigation } = this.props;
    const { state } = navigation;
    const { params } = state;
    console.log(navigation.state.params);
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
}

export default ProductOverview;

import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import CheckBox from "react-native-checkbox";
import { Icon } from "native-base";

import GStyles from "../../Styles/GeneralStyle";
import Styles from "../../Styles/BidSelectionStyle";

class BidSelection extends Component {
  state = {
    selectedSellType: "fixed",
    fixedPrice: 0,
    targetPrice: 0
  };

  handleBack = () => {
    this.props.navigation.goBack();
  };

  onSellTypeChecked = (checked, type) => {
    console.log(checked);
    this.setState({
      selectedSellType: type
    });
  };

  onPriceInputChange = (text, priceLabel) => {
    this.setState({
      [priceLabel]: text.replace(/[^0-9]/g, "")
    });
  };

  render() {
    const { selectedSellType } = this.state;
    return (
      <View style={GStyles.container}>
        <Text style={GStyles.grayMessage}>
          HOW DO YOU WISH TO SELL YOUR ITEM?
        </Text>
        <View style={Styles.checkSelections}>
          <CheckBox
            label="Fixed Price"
            checked={selectedSellType === "fixed"}
            onChange={checked => this.onSellTypeChecked(checked, "fixed")}
          />
          <CheckBox
            label="Auction"
            checked={selectedSellType === "auction"}
            onChange={checked => this.onSellTypeChecked(checked, "auction")}
          />
        </View>

        {selectedSellType === "fixed" ? (
          <View>
            <Text style={Styles.product_text}>Enter Fixed Price:</Text>
            <TextInput
              style={GStyles.input}
              underlineColorAndroid="transparent"
              placeholder="Fixed price"
              keyboardType="numeric"
              placeholderTextColor="rgba(45, 45, 45, 0.3)"
              onChangeText={price =>
                this.onPriceInputChange(price, "fixedPrice")
              }
              value={this.state.fixedPrice}
            />
          </View>
        ) : (
          <View>
            <Text style={Styles.product_text}>Enter Target Price:</Text>
            <TextInput
              style={[GStyles.input, Styles.description]}
              underlineColorAndroid="transparent"
              placeholder="Target Price"
              multiline={true}
              placeholderTextColor="rgba(45, 45, 45, 0.3)"
              onChangeText={price =>
                this.onPriceInputChange(price, "targetPrice")
              }
              value={this.state.targetPrice}
            />
          </View>
        )}

        <TouchableOpacity onPress={this.handleBack}>
          <Image
            style={GStyles.icon}
            source={require("../../../assets/backArrow.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default BidSelection;

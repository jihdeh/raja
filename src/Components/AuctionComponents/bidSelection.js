import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import CheckBox from "react-native-checkbox";
import { Icon } from "native-base";
import moment from "moment/moment";
import DateTimePicker from "react-native-modal-datetime-picker";
import Picker from "react-native-picker-select";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { displayError } from "../../Actions/ErrorAction";

import GStyles from "../../Styles/GeneralStyle";
import Styles from "../../Styles/BidSelectionStyle";

class BidSelection extends Component {
  state = {
    selectedSellType: "fixed",
    productQualityType: "new",
    fixedPrice: "0",
    targetPrice: "0",
    targetDate: null,
    productWeight: "0",
    isDateTimePickerVisible: false,
    deliveryMethod: "Courier",
    items: [
      {
        label: "Courier",
        value: "courier",
        key: "courier"
      },
      {
        label: "Pick Up",
        value: "pickUp",
        key: "pickUp"
      }
    ]
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={GStyles.icon}
            source={require("../../../assets/backArrow.png")}
          />
        </TouchableOpacity>
      )
    };
  };

  onTypeChecked = (checked, type, field) => {
    this.setState({
      [field]: type
    });
  };

  onNumericInputChange = (text, typeLabel) => {
    this.setState({
      [typeLabel]: text.replace(/[^0-9.]/g, "")
    });
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({
      targetDate: date
    });
    this._hideDateTimePicker();
  };

  validate() {
    const {
      targetDate,
      targetPrice,
      selectedSellType,
      productQualityType,
      fixedPrice,
      deliveryMethod
    } = this.state;

    if (
      !targetPrice.trim() ||
      (selectedSellType == "auction" && +targetPrice === 0) ||
      (selectedSellType == "auction" && isNaN(+targetPrice)) ||
      (!fixedPrice.trim() || +fixedPrice === 0 || isNaN(+fixedPrice))
    ) {
      this.props.displayError("Please enter price of item");
      return false;
    }

    if (
      !selectedSellType ||
      !productQualityType ||
      !deliveryMethod ||
      (+targetPrice !== 0 && !targetDate)
    ) {
      this.props.displayError("All fields are required");
      return false;
    }
    return true;
  }

  onNext = () => {
    if (this.validate()) {
      this.props.navigation.navigate("ProductOverview", {
        ...this.state,
        ...this.props.navigation.state.params
      });
    }
  };

  render() {
    const { selectedSellType, productQualityType } = this.state;
    return (
      <View style={[GStyles.container, Styles.container]}>
        <ScrollView>
          <Text style={Styles.product_text_header}>
            HOW DO YOU WISH TO SELL YOUR ITEM?
          </Text>
          <View style={Styles.checkSelections}>
            <CheckBox
              label="Fixed Price"
              checked={selectedSellType === "fixed"}
              onChange={checked =>
                this.onTypeChecked(checked, "fixed", "selectedSellType")
              }
            />
            <CheckBox
              label="Auction"
              checked={selectedSellType === "auction"}
              onChange={checked =>
                this.onTypeChecked(checked, "auction", "selectedSellType")
              }
            />
          </View>

          {selectedSellType === "fixed" ? (
            <View style={Styles.priceInput}>
              <Text style={Styles.product_text}>Enter Fixed Price ($):</Text>
              <TextInput
                style={GStyles.input}
                underlineColorAndroid="transparent"
                placeholder="Fixed price"
                keyboardType="numeric"
                placeholderTextColor="rgba(45, 45, 45, 0.3)"
                onChangeText={price =>
                  this.onNumericInputChange(price, "fixedPrice")
                }
                value={this.state.fixedPrice}
              />
            </View>
          ) : (
            <View style={Styles.priceInput}>
              <Text style={Styles.product_text}>Enter Target Price ($):</Text>
              <TextInput
                style={GStyles.input}
                underlineColorAndroid="transparent"
                placeholder="Target Price"
                keyboardType="numeric"
                placeholderTextColor="rgba(45, 45, 45, 0.3)"
                onChangeText={price =>
                  this.onNumericInputChange(price, "targetPrice")
                }
                value={this.state.targetPrice}
              />
              {this.state.targetDate && (
                <Text
                  style={{
                    justifyContent: "center",
                    alignSelf: "center",
                    textAlign: "center"
                  }}
                >
                  Auction will end on{" "}
                  {moment(this.state.targetDate).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
                </Text>
              )}
              <TouchableOpacity onPress={this._showDateTimePicker}>
                <View style={Styles.dateTimePickerButton}>
                  <Icon
                    name="ios-timer-outline"
                    style={{
                      fontSize: 20,
                      color: "white",
                      marginTop: 3,
                      marginRight: 5
                    }}
                  />
                  <Text style={Styles.dateTimePickerButtonText}>
                    Select Auction Timeframe
                  </Text>
                </View>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                minimumDate={new Date()}
                onCancel={this._hideDateTimePicker}
                mode="datetime"
              />
            </View>
          )}
          <View>
            <View style={Styles.breakLine} />
            <Text style={Styles.product_text_header}>PRODUCT CONDITION?</Text>
            <View style={Styles.checkSelections}>
              <CheckBox
                label="New"
                checked={productQualityType === "new"}
                onChange={checked =>
                  this.onTypeChecked(checked, "new", "productQualityType")
                }
              />
              <CheckBox
                label="Used"
                checked={productQualityType === "used"}
                onChange={checked =>
                  this.onTypeChecked(checked, "used", "productQualityType")
                }
              />
            </View>

            <Text style={Styles.product_text}>Weight of Item(kg):</Text>
            <TextInput
              style={GStyles.input}
              underlineColorAndroid="transparent"
              placeholder="Product Weight"
              keyboardType="numeric"
              placeholderTextColor="rgba(45, 45, 45, 0.3)"
              onChangeText={weight =>
                this.onNumericInputChange(weight, "productWeight")
              }
              value={this.state.productWeight}
            />
            <Text style={Styles.product_text}>Delivery Method:</Text>
            <View style={GStyles.dropDownSelection_input}>
              <Picker
                items={this.state.items}
                hideIcon
                onValueChange={(method, index) =>
                  this.setState({ deliveryMethod: method })
                }
                placeholder={{
                  label: "Select a delivery method...",
                  value: "courier"
                }}
                value={this.state.deliveryMethod}
              />
            </View>
          </View>

          <View style={Styles.buttonActions}>
            <TouchableOpacity
              onPress={this.onNext}
              style={[Styles.btn, GStyles.buttonContainer]}
            >
              <Text style={GStyles.buttonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  displayError: bindActionCreators(displayError, dispatch)
});

export default connect(null, mapDispatchToProps)(BidSelection);

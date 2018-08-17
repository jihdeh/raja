import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  AsyncStorage
} from "react-native";
import Picker from "react-native-picker-select";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import get from "lodash/get";
import PaymentSelection from "../paymentSelection";
import { displayError } from "../../Actions/ErrorAction";
import { checkout, getShippingCost } from "../../Actions/ProductAction";

import GStyles from "../../Styles/GeneralStyle";
import FStyles from "../../Styles/CheckoutStyle";

class Cost extends Component {
  state = {
    paymentMethod: null,
    bankOption: null,
    isLoading: false
  };

  componentWillReceiveProps(nextProps) {
    const {
      product: { checkout },
      navigation,
      toScreen
    } = nextProps;
    this.setState({
      isLoading: false
    });
    if (this.props.product.checkout !== checkout) {
      toScreen("OrderHistoryScreen");
    }
  }

  async componentDidMount() {
    const { addresses, getShippingCost, auth } = this.props;
    const { user: isAuthenticated } = auth;
    const authToken =
      (await AsyncStorage.getItem("token")) || isAuthenticated.token;

    const getDefaultAddy =
      addresses.length && addresses.find(addy => addy.isDefault);
    getShippingCost(authToken, getDefaultAddy.id);
  }

  onSelect = value => {
    this.setState(value);
  };

  bankSelection = bSelect => {
    this.setState(bSelect);
  };

  defaultAddress() {
    const { addresses } = this.props;
    const getDefaultAddy =
      addresses.length && addresses.find(addy => addy.isDefault);
    return getDefaultAddy;
  }

  validate() {
    const { bankOption, paymentMethod } = this.state;
    const { addresses } = this.props;

    if (!this.defaultAddress() || !addresses.length) {
      this.props.displayError("Please add a default delivery address");
      return false;
    }

    if (!paymentMethod) {
      this.props.displayError("Please select payment method");
      return false;
    }
    if (paymentMethod === "bank" && !bankOption) {
      this.props.displayError("Please select bank option");
      this.setState({
        isLoading: false
      });
      return false;
    }
    return true;
  }

  async onPayClicked() {
    if (!this.validate()) return;
    this.setState({
      isLoading: true
    });
    const { auth } = this.props;
    const { user: isAuthenticated } = auth;
    const token =
      (await AsyncStorage.getItem("token")) || isAuthenticated.token;

    const { selection, paymentMethod } = this.state;
    const location = this.defaultAddress();
    const obj =
      paymentMethod !== "wallet"
        ? {
            bankName: selection.bankName,
            paymentMethod
          }
        : {
            paymentMethod
          };
    this.props.pay(obj, location.id, token);
  }

  render() {
    const {
      product: { addToCart, getCart, shippingCost }
    } = this.props;
    const { bankOption, isLoading } = this.state;
    return (
      <View>
        <PaymentSelection
          onSelect={this.onSelect}
          bankSelection={this.bankSelection}
        />

        <View style={FStyles.contTwo}>
          <View style={FStyles.lowCont}>
            <Text style={FStyles.noEmph}>Subtotal</Text>
            <Text style={FStyles.noEmph}>
              Rp{" "}
              {Math.round(get(addToCart, "totalPrice")) ||
                Math.round(get(getCart, "totalPrice"))}
            </Text>
          </View>
          <View style={FStyles.lowCont}>
            <Text style={FStyles.noEmph}>Shipping cost</Text>
            <Text style={FStyles.noEmph}>Rp {get(shippingCost, 'shippingCost')}</Text>
          </View>
          <View style={FStyles.lowCont}>
            <Text style={FStyles.emph}>Total</Text>
            <Text style={FStyles.mEmph}>
              Rp{" "}
              {Math.round(get(addToCart, "totalPrice")) ||
                Math.round(get(getCart, "totalPrice"))}
            </Text>
          </View>
          {!isLoading ? (
            <TouchableOpacity
              onPress={() => !isLoading && this.onPayClicked()}
              style={FStyles.evtbtn}
            >
              <Text style={FStyles.evntTxt}>PAY</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={FStyles.evtbtn}>
              <ActivityIndicator size="small" color="#ffffff" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  product: state.get("product").toJS(),
  auth: state.get("auth").toJS()
});

const mapDispatchToProps = dispatch => ({
  displayError: bindActionCreators(displayError, dispatch),
  pay: bindActionCreators(checkout, dispatch),
  getShippingCost: bindActionCreators(getShippingCost, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cost);

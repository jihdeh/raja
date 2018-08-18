import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Dimensions,
  Fragment,
  AsyncStorage,
  Button
} from "react-native";
const width = Dimensions.get("window").width;
import { Icon } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import get from "lodash/get";
import PaymentSelection from "../Components/paymentSelection";
import { topUpWallet } from "../Actions/SharedAction";
import { displayError } from "../Actions/ErrorAction";

import GStyles from "../Styles/GeneralStyle";
import FStyles from "../Styles/CheckoutStyle";
import LStyles from "../Styles/LoginStyle";
import Styles from "../Styles/WalletStyle";

class Wallet extends Component {
  state = {
    togglePayment: false,
    isLoading: false,
    amount: "0"
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.shared.requestSuccess) {
      this.setState({
        togglePayment: !this.state.togglePayment
      });
    }
  }

  onTogglePayment = () => {
    this.setState({
      togglePayment: !this.state.togglePayment
    });
  };

  onSelect = value => {
    this.setState(value);
  };

  bankSelection = bSelect => {
    this.setState(bSelect);
  };

  validate() {
    const { amount, paymentMethod, bankOption } = this.state;
    const { addresses } = this.props;

    if (!amount || amount < 10000) {
      this.props.displayError(
        "Please enter an amount greater than or equal to 10000"
      );
      return false;
    }

    if (!paymentMethod) {
      this.props.displayError("Please select payment method");
      return false;
    }

    if (paymentMethod === "bank" && !bankOption) {
      this.props.displayError("Please select bank option");
      return false;
    }

    return true;
  }

  async onPayClicked() {
    if (!this.validate()) return;
    this.setState({
      isLoading: true
    });
    const { user } = this.props;
    const { user: isAuthenticated } = user;
    const token =
      (await AsyncStorage.getItem("token")) || isAuthenticated.token;

    const { paymentMethod, amount, bankOption } = this.state;
    const obj =
      paymentMethod === "bank"
        ? {
            paymentMethod,
            bankName: bankOption,
            amount
          }
        : { paymentMethod, amount };
    this.props.topUpWallet(obj, token);
  }

  render() {
    const {
      user: { userExtended = {} },
      navigation,
      shared: { showSpinner, walletAmount }
    } = this.props;
    const { togglePayment, isLoading } = this.state;
    const reducerIsPaid = (accumulator, currentValue) =>
      currentValue.isPaid && accumulator + +currentValue.amount;
    const amountPaidTotal =
      walletAmount && walletAmount.items.reduce(reducerIsPaid, 0);

    const reducerIsNotPaid = (accumulator, currentValue) =>
      !currentValue.isPaid && accumulator + +currentValue.amount;
    const amountOutstandingTotal =
      walletAmount && walletAmount.items.reduce(reducerIsNotPaid, 0);

    return (
      <ScrollView style={Styles.container}>
        <Spinner
          visible={showSpinner}
          textContent={"Please wait..."}
          textStyle={{ color: "#333" }}
        />
        <View style={Styles.subContainer}>
          <View style={Styles.labelHeader}>
            <Text>{userExtended.firstName || '...'}</Text>
            <Text>{userExtended.email || '...'}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={Styles.sectionOneCurrContainer}>
              <Text style={{ fontWeight: "bold", fontSize: 30 }}>
                {amountPaidTotal || 0}
              </Text>
              <Text>Rp</Text>
            </View>
            <View style={{ marginBottom: 5 }}>
              <Text>Outstanding: Rp {amountOutstandingTotal || 0}</Text>
            </View>
            {!togglePayment ? (
              <TouchableOpacity
                onPress={this.onTogglePayment}
                style={Styles.topUpButton}
              >
                <Text style={GStyles.buttonText}>Top Up</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ flex: 1 }}>
                <View>
                  <Text>Enter Amount: </Text>
                  <TextInput
                    style={{
                      borderColor: "#bababa",
                      borderWidth: 1,
                      borderRadius: 5,
                      height: 30,
                      marginTop: 5,
                      marginBottom: 10
                    }}
                    underlineColorAndroid="transparent"
                    placeholder="Amount"
                    placeholderTextColor="rgba(45, 45, 45, 0.3)"
                    keyboardType="numeric"
                    onChangeText={amount => this.setState({ amount })}
                    value={this.state.amount}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <PaymentSelection
                    onSelect={this.onSelect}
                    excludeField={["wallet"]}
                    bankSelection={this.bankSelection}
                  />
                </View>
                {!isLoading ? (
                  <TouchableOpacity
                    onPress={() => !isLoading && this.onPayClicked()}
                    style={FStyles.evtbtn}
                  >
                    <Text style={FStyles.evntTxt}>TOP-UP NOW</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={FStyles.evtbtn}>
                    <ActivityIndicator size="small" color="#ffffff" />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
        <View style={{ borderWidth: 3, borderColor: "#e4e4e4" }} />
        <View style={{ padding: 30 }}>
          <View style={{ width: width / 2 }}>
            <View style={Styles.sectionTwoMenu}>
              <Icon style={Styles.sectionTwoMenuIcon} name="md-mail" />
              <Text
                style={Styles.sectionTwoMenuText}
                onPress={() =>
                  walletAmount &&
                  navigation.navigate("WalletHistoryDetailsScreen", {
                    ...walletAmount
                  })
                }
              >
                Top Up History
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  shared: state.get("shared").toJS(),
  user: state.get("auth").toJS()
});

const mapDispatchToProps = dispatch => ({
  displayError: bindActionCreators(displayError, dispatch),
  topUpWallet: bindActionCreators(topUpWallet, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);

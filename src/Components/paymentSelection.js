import React, { Component } from "react";
import { View, Text } from "react-native";
import { Icon } from "native-base";
import Picker from "react-native-picker-select";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";

import GStyles from "../Styles/GeneralStyle";
import FStyles from "../Styles/CheckoutStyle";

const BANK_OPTIONS = [
  {
    label: "Permata Virtual Account",
    value: { bankName: "permata", internetBankName: "mandiri_clickpay" }
  },
  {
    label: "BCA Virtual Account",
    value: { bankName: "bca", internetBankName: "mandiri_clickpay" }
  },
  {
    label: "Mandiri Bill Payment",
    value: { bankName: "echannel", internetBankName: "mandiri_clickpay" }
  },
  {
    label: "BNI Virtual Account",
    value: { bankName: "bni", internetBankName: "mandiri_clickpay" }
  }
];

const INTERNET_BANKING = [
  {
    label: "BCA Klikpay",
    value: { bankName: "bca_klikpay", internetBankName: "bca_klickpay" }
  },
  {
    label: "Klikbca",
    value: { bankName: "permata", internetBankName: "bca_klikbca" }
  },
  {
    label: "Mandiri Clickpay",
    value: {
      bankName: "permata",
      internetBankName: "mandiri_clickpay"
    }
  },
  {
    label: "Epay BRI",
    value: { bankName: "permata", internetBankName: "bri_epay" }
  },
  {
    label: "CIMB Clicks",
    value: { bankName: "permata", internetBankName: "cimb_clicks" }
  },
  {
    label: "Danamon Online Banking",
    value: { bankName: "permata", internetBankName: "danamon_online" }
  }
];

class PaymentSelection extends Component {
  state = {
    paymentMethod: null,
    bankOption: null,
    isLoading: false
  };

  onSelect(index, value) {
    this.setState({
      paymentMethod: value
    });
    this.props.onSelect({
      paymentMethod: value
    });
  }

  bankSelection(bank) {
    this.setState({
      selection: bank,
      bankOption: bank.bankName
    });
    this.props.bankSelection({
      selection: bank,
      bankOption: bank.bankName
    });
  }

  renderRadioOptions(excludeField) {
    switch (true) {
      case excludeField.includes("wallet"):
        return (
          <RadioGroup
            color="#515151"
            highlightColor="#ccc8b9"
            onSelect={(index, value) => this.onSelect(index, value)}
          >
            <RadioButton value={"card"}>
              <Text>Pay with card</Text>
            </RadioButton>

            <RadioButton value={"bank"}>
              <Text>Bank Transfer</Text>
            </RadioButton>
          </RadioGroup>
        );
        break;
      case excludeField.includes("bank"):
        return (
          <RadioGroup
            color="#515151"
            highlightColor="#ccc8b9"
            onSelect={(index, value) => this.onSelect(index, value)}
          >
            <RadioButton value={"card"}>
              <Text>Pay with card</Text>
            </RadioButton>
            <RadioButton value={"wallet"}>
              <Text>Pay from wallet</Text>
            </RadioButton>
          </RadioGroup>
        );
        break;
      default:
        return (
          <RadioGroup
            color="#515151"
            highlightColor="#ccc8b9"
            onSelect={(index, value) => this.onSelect(index, value)}
          >
            <RadioButton value={"card"}>
              <Text>Pay with card</Text>
            </RadioButton>

            <RadioButton value={"wallet"}>
              <Text>Pay from wallet</Text>
            </RadioButton>

            <RadioButton value={"bank"}>
              <Text>Bank Transfer</Text>
            </RadioButton>
          </RadioGroup>
        );
    }
  }

  render() {
    const { excludeField = [] } = this.props;
    return (
      <View>
        <View style={FStyles.lblHeader}>
          <Text style={FStyles.lbltitle}>Select Payment Method</Text>
        </View>
        {this.renderRadioOptions(excludeField)}

        {this.state.paymentMethod === "bank" && (
          <View style={[GStyles.dropDownSelection_input, { marginTop: 20 }]}>
            <Picker
              items={BANK_OPTIONS}
              hideIcon
              onValueChange={(bank, index) => this.bankSelection(bank)}
              placeholder={{ label: "SELECT" }}
              value={this.state.bankOption}
            />
          </View>
        )}
      </View>
    );
  }
}

export default PaymentSelection;

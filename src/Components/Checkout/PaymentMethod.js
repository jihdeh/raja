import React, { Component, Fragment } from 'react';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { View, Text } from 'react-native';
import Picker from 'react-native-picker-select';

import GStyles from '../../Styles/GeneralStyle';
import FStyles from '../../Styles/CheckoutStyle';

const BANK_OPTIONS = [
  {
    label: 'Permata Virtual Account',
    value: { bankName: 'permata', internetBankName: 'mandiri_clickpay' }
  },
  {
    label: 'BCA Virtual Account',
    value: { bankName: 'bca', internetBankName: 'mandiri_clickpay' }
  },
  {
    label: 'Mandiri Bill Payment',
    value: { bankName: 'echannel', internetBankName: 'mandiri_clickpay' }
  },
  {
    label: 'BNI Virtual Account',
    value: { bankName: 'bni', internetBankName: 'mandiri_clickpay' }
  }
];

const INTERNET_BANKING = [
  {
    label: 'BCA Klikpay',
    value: { bankName: 'bca_klikpay', internetBankName: 'bca_klickpay' }
  },
  {
    label: 'Klikbca',
    value: { bankName: 'bca_klikbca', internetBankName: 'bca_klickpay' }
  },
  {
    label: 'Mandiri Clickpay',
    value: { bankName: 'mandiri_clickpay', internetBankName: 'bca_klickpay' }
  },
  {
    label: 'Epay BRI',
    value: { bankName: 'bri_epay', internetBankName: 'bca_klickpay' }
  },
  {
    label: 'CIMB Clicks',
    value: { bankName: 'cimb_clicks', internetBankName: 'bca_klickpay' }
  },
  {
    label: 'Danamon Online Banking',
    value: { bankName: 'danamon_online', internetBankName: 'bca_klickpay' }
  }
];

class PaymentMethod extends Component {
  state = {
    paymentMethod: 'card',
    bankOption: null
  };

  onSelect(index, value) {
    this.setState({
      paymentMethod: value
    });
  }

  bankSelection(bank) {
    console.log(bank);
    this.setState({
      selection: bank,
      bankOption: bank.bankName
    });
    // bankName
    // "bca"
    // internetBankName
    // "bca_klikpay"
    // paymentMethod
    // "bank"
  }

  onPayClicked() {
    const {
      selection: { bankName, internetBankName },
      paymentMethod
    } = this.state;
    const obj = {
      bankName,
      internetBankName,
      paymentMethod
    };
    console.log(obj);
  }

  render() {
    return (
      <View>
        <View style={FStyles.lblHeader}>
          <Text style={FStyles.lbltitle}>Select Payment Method</Text>
        </View>
        <RadioGroup
          color="#515151"
          highlightColor="#ccc8b9"
          onSelect={(index, value) => this.onSelect(index, value)}
        >
          <RadioButton value={'card'}>
            <Text>Pay with card</Text>
          </RadioButton>

          <RadioButton value={'bank'}>
            <Text>Bank Transfer</Text>
          </RadioButton>

          <RadioButton value={'internet'}>
            <Text>Internet Banking</Text>
          </RadioButton>
        </RadioGroup>
        {this.state.paymentMethod === 'bank' && (
          <Fragment>
            <View style={[GStyles.dropDownSelection_input, { marginTop: 20 }]}>
              <Picker
                items={BANK_OPTIONS}
                hideIcon
                onValueChange={(bank, index) => this.bankSelection(bank)}
                placeholder={{ label: 'SELECT' }}
                value={this.state.bankOption}
              />
            </View>
          </Fragment>
        )}

        {this.state.paymentMethod === 'internet' && (
          <Fragment>
            <View style={[GStyles.dropDownSelection_input, { marginTop: 20 }]}>
              <Picker
                items={INTERNET_BANKING}
                hideIcon
                onValueChange={(bank, index) => this.bankSelection(bank)}
                placeholder={{ label: 'SELECT' }}
                value={this.state.bankOption}
              />
            </View>
          </Fragment>
        )}
      </View>
    );
  }
}

export default PaymentMethod;
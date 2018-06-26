import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from 'react-native';
import Picker from 'react-native-picker-select';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/get';

import { displayError } from '../../Actions/ErrorAction';
import { checkout } from '../../Actions/ProductAction';

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
    value: { bankName: 'permata', internetBankName: 'bca_klikbca' }
  },
  {
    label: 'Mandiri Clickpay',
    value: {
      bankName: 'permata',
      internetBankName: 'mandiri_clickpay'
    }
  },
  {
    label: 'Epay BRI',
    value: { bankName: 'permata', internetBankName: 'bri_epay' }
  },
  {
    label: 'CIMB Clicks',
    value: { bankName: 'permata', internetBankName: 'cimb_clicks' }
  },
  {
    label: 'Danamon Online Banking',
    value: { bankName: 'permata', internetBankName: 'danamon_online' }
  }
];

class Cost extends Component {
  state = {
    paymentMethod: 'card',
    bankOption: null,
    isLoading: false
  };

  componentWillReceiveProps(nextProps) {
    const { product: { checkout }, navigation } = nextProps;
    this.setState({
      isLoading: false
    });
    console.log('anas');
    navigation.navigate('OrderHistoryScreen');
  }

  onSelect(index, value) {
    this.setState({
      paymentMethod: value
    });
  }

  bankSelection(bank) {
    this.setState({
      selection: bank,
      bankOption: bank.bankName
    });
  }

  validate() {
    const { bankOption, paymentMethod } = this.state;
    if (
      (paymentMethod === 'bank' || paymentMethod === 'internet') &&
      !bankOption
    ) {
      this.props.displayError('Please select bank option');
      this.setState({
        isLoading: false
      });
      return false;
    }
    return true;
  }

  onPayClicked() {
    if (!this.validate()) return;
    const {
      selection: { bankName, internetBankName },
      paymentMethod
    } = this.state;
    const obj = {
      bankName,
      internetBankName,
      paymentMethod
    };
    this.setState({
      isLoading: true
    });
    this.props.pay(obj);
  }

  render() {
    const { product: { addToCart, getCart } } = this.props;
    const { bankOption, isLoading } = this.state;

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
        <View style={FStyles.contTwo}>
          <View style={FStyles.lowCont}>
            <Text style={FStyles.noEmph}>Subtotal</Text>
            <Text style={FStyles.noEmph}>
              Rp {get(addToCart, 'totalPrice') || get(getCart, 'totalPrice')}
            </Text>
          </View>
          <View style={FStyles.lowCont}>
            <Text style={FStyles.noEmph}>Shipping cost</Text>
            <Text style={FStyles.noEmph}>Rp 5.00</Text>
          </View>
          <View style={FStyles.lowCont}>
            <Text style={FStyles.emph}>Total</Text>
            <Text style={FStyles.mEmph}>
              Rp {get(addToCart, 'totalPrice') || get(getCart, 'totalPrice')}
            </Text>
          </View>
          {!isLoading ? (
            <TouchableOpacity
              onPress={() => this.onPayClicked()}
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
  product: state.get('product').toJS()
});

const mapDispatchToProps = dispatch => ({
  displayError: bindActionCreators(displayError, dispatch),
  pay: bindActionCreators(checkout, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Cost);

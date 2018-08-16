import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import { Icon } from 'native-base';
import moment from 'moment/moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Picker from 'react-native-picker-select';
import MultiSelect from 'react-native-multiple-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { displayError } from '../../Actions/ErrorAction';

import GStyles from '../../Styles/GeneralStyle';
import Styles from '../../Styles/BidSelectionStyle';

class BidSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      product: {
        saleFormat: 'fixed',
        condition: 'used',
        salePrice: '',
        targetPrice: '0',
        // location: '',
        location: this._getLocation(true),
        originalPrice: '0',
        auctionEnd: null,
        isBundle: false,
        showAuctionTarget: false,
        weight: '',
        isActive: true,
        courierDelivery: false,
        selfDelivery: false,
        couriers: []
      }
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={GStyles.icon}
            source={require('../../../assets/backArrow.png')}
          />
        </TouchableOpacity>
      )
    };
  };

  onTypeChecked = (checked, type, field) => {
    this.setState({
      product: { ...this.state.product, [field]: type }
    });
  };

  onNumericInputChange = (text, typeLabel) => {
    this.setState({
      product: {
        ...this.state.product,
        [typeLabel]: text.replace(/[^0-9.]/g, '')
      }
    });
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({
      product: {
        ...this.state.product,
        auctionEnd: date
      }
    });
    this._hideDateTimePicker();
  };

  _handleCourierChange = couriers => {
    if (couriers.length > 4) return;
    this.setState({
      couriers,
      disableCourierSelect: couriers.length >= 4,
      product: {
        ...this.state.product,
        couriers: couriers.map(c => ({ courierId: c.value, name: c.label })) // format for server
      }
    });
  };

  _getLocation = (initial = false) => {
    if (!this.props.user) return '';

    if (!initial && this.state.product.location) return this.state.product.location
    const location = this.props.user.userExtended.addresses.find(a => a.isDefault);
    
    if (location && initial) return location.id;

    if (location && !initial && location.id !== this.state.product.location) return location.id;
  };

  validate() {
    const {
      auctionEnd,
      targetPrice,
      saleFormat,
      condition,
      salePrice,
      deliveryMethod
    } = this.state.product;

    if (
      saleFormat == 'auction' &&
      (!targetPrice.trim() || +targetPrice === 0 || isNaN(+targetPrice))
    ) {
      this.props.displayError('Please enter target auction price of item');
      return false;
    } else if (
      saleFormat == 'fixed' &&
      (!salePrice.trim() || +salePrice === 0 || isNaN(+salePrice))
    ) {
      this.props.displayError('Please enter fixed price of item');
      return false;
    }

    if (!saleFormat || !condition || (+targetPrice !== 0 && !auctionEnd)) {
      this.props.displayError('All fields are required');
      return false;
    }
    return true;
  }

  onNext = () => {
    if (this.validate()) {
      this.props.navigation.navigate('ProductOverview', {
        ...this.state.product,
        ...this.props.navigation.state.params
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.loadedCouriers) {
      this.setState({ loadedCouriers: nextProps.location.loadedCouriers })

      if (!this.state.product.couriers.length) {
        this.setState({
          product: {
            ...this.state.product, 
            couriers: [{
              courierId: nextProps.location.loadedCouriers[0].value,
              name: nextProps.location.loadedCouriers[0].name
            }]
          }
        })
      } 
    }
  }

  render() {
    const {
      saleFormat,
      condition,
      salePrice,
      originalPrice,
      targetPrice,
      auctionEnd,
      weight,
      deliveryMethod,
      isBundle,
      showAuctionTarget,
      courierDelivery
    } = this.state.product;

    // let { location: { loadedCouriers } } = this.props;
    const loadedCouriers = this.state.loadedCouriers; // detach from immutable this.props;

    return (
      <View style={[GStyles.container, Styles.container]}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <ScrollView>
            <Text style={Styles.product_text_header}>
              HOW DO YOU WISH TO SELL YOUR ITEM?
            </Text>
            <View style={Styles.checkSelections}>
              <CheckBox
                label="Fixed Price"
                checked={saleFormat === 'fixed'}
                onChange={checked =>
                  this.onTypeChecked(checked, 'fixed', 'saleFormat')
                }
              />
              <CheckBox
                label="Auction"
                checked={saleFormat === 'auction'}
                onChange={checked =>
                  this.onTypeChecked(checked, 'auction', 'saleFormat')
                }
              />
            </View>

            {saleFormat === 'fixed' ? (
              <View style={Styles.priceInput}>
                <Text style={Styles.product_text}>Enter Sale Price (Rp):</Text>
                <TextInput
                  style={GStyles.input}
                  underlineColorAndroid="transparent"
                  placeholder="Sale price"
                  keyboardType="numeric"
                  placeholderTextColor="rgba(45, 45, 45, 0.3)"
                  onChangeText={price =>
                    this.onNumericInputChange(price, 'salePrice')
                  }
                  value={salePrice}
                />
                {/* <Text style={Styles.product_text}>Conditions:</Text>
              <View style={Styles.checkSelections}>
                <CheckBox
                  label="on sale"
                  checked={this.state.product.onSale}
                  onChange={checked => 
                    this.setState({
                      product: { 
                        ...this.state.product, 
                        onSale: !this.state.product.onSale 
                      } 
                    })
                  }
                />
                <CheckBox
                label="this is a bundle"
                checked={this.state.product.isBundle}
                onChange={checked =>
                  this.setState({
                    product: { 
                      ...this.state.product,
                      isBundle: !this.state.product.isBundle 
                    }
                  })
                }
              />
              </View> */}
                {/* {onSale && (
                  <Text style={Styles.product_text}>
                    Enter Original Product Price(Rp):
                  </Text>
                  <TextInput
                    style={GStyles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Original product price"
                    keyboardType="numeric"
                    placeholderTextColor="rgba(45, 45, 45, 0.3)"
                    onChangeText={price =>
                      this.onNumericInputChange(price, "originalPrice")
                    }
                    value={originalPrice}
                  />
              )} */}
              </View>
            ) : (
              <View style={Styles.priceInput}>
                <Text style={Styles.product_text}>
                  Enter Target Price (Rp):
                </Text>
                <TextInput
                  style={GStyles.input}
                  underlineColorAndroid="transparent"
                  placeholder="Target Price"
                  keyboardType="numeric"
                  placeholderTextColor="rgba(45, 45, 45, 0.3)"
                  onChangeText={price =>
                    this.onNumericInputChange(price, 'targetPrice')
                  }
                  value={targetPrice}
                />
                {auctionEnd && (
                  <Text
                    style={{
                      justifyContent: 'center',
                      alignSelf: 'center',
                      textAlign: 'center'
                    }}
                  >
                    Auction will end on{' '}
                    {moment(auctionEnd).format('MMMM Do YYYY, h:mm:ss a')}
                  </Text>
                )}
                <TouchableOpacity onPress={this._showDateTimePicker}>
                  <View style={Styles.dateTimePickerButton}>
                    <Icon
                      name="ios-timer-outline"
                      style={{
                        fontSize: 20,
                        color: 'white',
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
                <CheckBox
                  label="show target price in auction"
                  checked={this.state.product.showAuctionTarget}
                  onChange={checked =>
                    this.setState({
                      product: {
                        ...this.state.product,
                        showAuctionTarget: !this.state.product.showAuctionTarget
                      }
                    })
                  }
                />
              </View>
            )}
            <View>
              <View style={Styles.breakLine} />
              <Text style={Styles.product_text_header}>PRODUCT CONDITION</Text>
              <View style={Styles.checkSelections}>
                <CheckBox
                  label="Used"
                  checked={condition === 'used'}
                  onChange={checked =>
                    this.onTypeChecked(checked, 'used', 'condition')
                  }
                />
                <CheckBox
                  label="New"
                  checked={condition === 'new'}
                  onChange={checked =>
                    this.onTypeChecked(checked, 'new', 'condition')
                  }
                />
                <CheckBox
                  label="Refurbished"
                  checked={condition === 'refurbished'}
                  onChange={checked =>
                    this.onTypeChecked(checked, 'refurbished', 'condition')
                  }
                />
              </View>

              <Text style={Styles.product_text}>Weight of Item(g):</Text>
              <TextInput
                style={GStyles.input}
                underlineColorAndroid="transparent"
                placeholder="Product Weight"
                keyboardType="numeric"
                placeholderTextColor="rgba(45, 45, 45, 0.3)"
                onChangeText={weight =>
                  this.onNumericInputChange(weight, 'weight')
                }
                value={weight}
              />

              <View style={Styles.breakLine} />
              <Text style={Styles.product_text_header}>DELIVERY METHOD</Text>
              <View style={Styles.checkSelections}>
                <CheckBox
                  label="Self"
                  checked={this.state.product.selfDelivery}
                  onChange={checked =>
                    this.setState({
                      product: {
                        ...this.state.product,
                        selfDelivery: !this.state.product.selfDelivery
                      }
                    })
                  }
                />
                <CheckBox
                  label="Courier"
                  checked={this.state.product.courierDelivery}
                  onChange={checked =>
                    this.setState({
                      product: {
                        ...this.state.product,
                        courierDelivery: !this.state.product.courierDelivery
                      }
                    })
                  }
                />
              </View>
              {courierDelivery &&
                loadedCouriers && (
                  <React.Fragment>
                    <Text style={Styles.product_text}>Select Courier:</Text>
                    {loadedCouriers.map(c => 
                      <View style={GStyles.breakLine} key={c.value}>
                        <CheckBox
                          label={c.name}
                          checked={c.checked}
                          onChange={checked => {
                            const couriers = [];
                            this.setState({
                              loadedCouriers: loadedCouriers.map(lc =>  {
                                if (lc.value === c.value) lc.checked = !lc.checked

                                if (lc.checked) {
                                  loadedCouriers.filter(l => lc.checked)
                                  couriers.push({courierId: lc.value, name: lc.name})
                                }
                                return lc;
                              }),
                              product: {
                                ...this.state.product,
                                couriers
                              }
                            })
                          }}
                        />
                      </View>
                    )}
                  </React.Fragment>
                )}
            </View>

            <View style={Styles.breakLine} />
            <Text style={Styles.product_text_header}>PRODUCT LOCATION</Text>
            {(!this.props.user ||
              !this.props.user.userExtended.addresses ||
              !this.props.user.userExtended.addresses.length) && (
              <Text>
                You need to add an address on your profile before selling
              </Text>
            )}

            <View style={GStyles.dropDownSelection_input}>
              <Picker
                items={this.props.user.userExtended.addresses.map(a => ({
                  ...a,
                  label: a.address,
                  value: a.id
                }))}
                hideIcon
                value={this._getLocation()}
                onValueChange={value => {
                  this.setState({
                    product: {
                      ...this.state.product,
                      location: value
                    }
                  });
                }}
              />
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
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  location: state.get('location').toJS(),
  user: state.get('auth').toJS()
});

const mapDispatchToProps = dispatch => ({
  displayError: bindActionCreators(displayError, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BidSelection);

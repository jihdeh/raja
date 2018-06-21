import React, { PureComponent, Fragment } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import Picker from 'react-native-picker-select';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getProvince,
  getCity,
  getSubdistrict
} from '../../Actions/LocationAction';
import { updateProfile } from '../../Actions/AuthAction';
import { displayError } from '../../Actions/ErrorAction';
import GStyles from '../../Styles/GeneralStyle';
import Styles from '../../Styles/SettingStyle';

class UpdateAddress extends PureComponent {
  state = {
    firstName: '',
    lastName: '',
    address: '',
    province: [],
    city: undefined,
    subdistrict: undefined,
    provinceId: 'SELECT',
    cityName: 'SELECT',
    subDistrictId: 'SELECT',
    provinceName: '',
    cityId: '',
    subDistrictName: '',
    phone: '',
    isDefault: false
  };

  componentWillMount() {
    const { getProvince, getCity } = this.props;
    getProvince().then(() => getCity());
  }

  componentWillReceiveProps(nextProps) {
    if (
      get(nextProps.user, 'updateProfile.addresses.length') >
      get(this.props.user, 'userExtended.addresses.length')
    ) {
      this.setState({
        firstName: '',
        lastName: '',
        address: '',
        province: [],
        city: undefined,
        subdistrict: undefined,
        provinceId: 'SELECT',
        cityName: 'SELECT',
        subDistrictId: 'SELECT',
        provinceName: '',
        cityId: '',
        subDistrictName: '',
        phone: '',
        isDefault: false
      });
    }
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  async resetPromise(field, field2) {
    const fields = field2
      ? { [field]: undefined, [field2]: undefined }
      : { [field]: undefined };
    await this.setState({
      ...fields
    });
    return true;
  }

  onLocationChange({ id, name }, nextList) {
    this.resetPromise('city', 'subdistrict').then(() => {
      this.setState({
        city: nextList.filter(list => list.province_id === id),
        provinceName: name,
        provinceId: id
      });
    });
  }

  onCityChange({ id, name }, nextList) {
    const { getSubdistrict } = this.props;
    getSubdistrict(id).then(res => {
      this.resetPromise('subdistrict').then(() => {
        this.setState({
          subdistrict: res.filter(list => list.city_id === id),
          cityId: id,
          cityName: name
        });
      });
    });
  }

  subdistrictChange({ id, name }) {
    this.setState({
      subDistrictId: id,
      subDistrictName: name
    });
  }

  onSubmit = () => {
    const {
      firstName,
      lastName,
      provinceId,
      cityId,
      phone,
      subDistrictId,
      subDistrictName,
      cityName,
      provinceName,
      isDefault
    } = this.state;
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !this.state.address.trim() ||
      !provinceId ||
      !cityId ||
      !phone ||
      !subDistrictId
    ) {
      this.props.displayError('All fields are required');
      return;
    }
    const address = {
      firstName,
      lastName,
      address: this.state.address,
      provinceId,
      cityId,
      subDistrictName,
      cityName,
      provinceName,
      phone,
      subDistrictId,
      isDefault
    };
    this.props.updateProfile({ address });
  };

  render() {
    const { location: { loadedCity, loadedProvince } } = this.props;

    return (
      <View style={{ margin: 10 }}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <Text style={Styles.label_text}>FIRST NAME:</Text>
          <TextInput
            style={GStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Firstname"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize={'none'}
            onChangeText={firstName => this.onChange('firstName', firstName)}
            value={this.state.firstName}
            autoCorrect={false}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <Text style={Styles.label_text}>LAST NAME:</Text>
          <TextInput
            style={GStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Lastname"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize={'none'}
            onChangeText={lastName => this.onChange('lastName', lastName)}
            value={this.state.lastName}
            autoCorrect={false}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <Text style={Styles.label_text}>ADDRESS:</Text>
          <TextInput
            style={GStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Address"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize={'none'}
            onChangeText={address => this.onChange('address', address)}
            value={this.state.address}
            autoCorrect={false}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <Text style={Styles.label_text}>PHONE:</Text>
          <TextInput
            style={GStyles.input}
            underlineColorAndroid="transparent"
            placeholder="phone"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            returnKeyType="go"
            keyboardType="numeric"
            onChangeText={phone => this.onChange('phone', phone)}
            value={this.state.phone}
            autoCorrect={false}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <Fragment>
            <Text style={Styles.label_text}>PROVINCE:</Text>
            <View style={GStyles.dropDownSelection_input}>
              {loadedProvince && (
                <Picker
                  items={loadedProvince}
                  hideIcon
                  onValueChange={(province, index) =>
                    this.onLocationChange(province, loadedCity)
                  }
                  placeholder={{ label: 'SELECT' }}
                  value={this.state.provinceId}
                />
              )}
            </View>
          </Fragment>
        </KeyboardAvoidingView>

        {get(this.state, 'city') && (
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
            <Fragment>
              <Text style={Styles.label_text}>CITY:</Text>
              <View style={GStyles.dropDownSelection_input}>
                <Picker
                  items={this.state.city}
                  hideIcon
                  onValueChange={(city, index) =>
                    this.onCityChange(city, loadedCity)
                  }
                  placeholder={{ label: 'SELECT' }}
                  value={this.state.cityName}
                />
              </View>
            </Fragment>
          </KeyboardAvoidingView>
        )}

        {get(this.state, 'subdistrict') && (
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
            <Fragment>
              <Text style={Styles.label_text}>SUBDISTRICT:</Text>
              <View style={GStyles.dropDownSelection_input}>
                <Picker
                  items={this.state.subdistrict}
                  hideIcon
                  onValueChange={(subdistrict, index) =>
                    this.subdistrictChange(subdistrict)
                  }
                  placeholder={{ label: 'SELECT' }}
                  value={this.state.subDistrictId}
                />
              </View>
            </Fragment>
          </KeyboardAvoidingView>
        )}
        <View style={Styles.checkSelections}>
          <CheckBox
            label="SET AS DEFAULT"
            checked={this.state.isDefault}
            onChange={checked =>
              this.setState({
                isDefault: !this.state.isDefault
              })
            }
          />
        </View>

        <TouchableOpacity
          onPress={this.onSubmit}
          style={[Styles.btn, GStyles.buttonContainer]}
        >
          <Text style={GStyles.buttonText}>SAVE ADDRESS</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  location: state.get('location').toJS(),
  user: state.get('auth').toJS(),
  error: state.get('errorMessage').toJS()
});

const mapDispatchToProps = dispatch => ({
  getProvince: bindActionCreators(getProvince, dispatch),
  getSubdistrict: bindActionCreators(getSubdistrict, dispatch),
  getCity: bindActionCreators(getCity, dispatch),
  updateProfile: bindActionCreators(updateProfile, dispatch),
  displayError: bindActionCreators(displayError, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAddress);

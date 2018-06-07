import React, { PureComponent, Fragment } from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from 'react-native'
import CheckBox from 'react-native-checkbox'
import Picker from 'react-native-picker-select'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getProvince,
  getCity,
  getSubdistrict
} from '../../Actions/LocationAction'
import GStyles from '../../Styles/GeneralStyle'
import Styles from '../../Styles/SettingStyle'

class UpdateAddress extends PureComponent {
  state = {
    firstname: '',
    lastname: '',
    address: '',
    province: [],
    city: undefined,
    subdistrict: undefined,
    selectedProvince: 'SELECT',
    selectedCity: 'SELECT',
    selectedSubdistrict: 'SELECT',
    phonenumber: '',
    setDefault: false
  }

  componentWillMount() {
    const { getProvince, getCity } = this.props
    getProvince().then(() => getCity())
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value
    })
  }

  onLocationChange(selection, nextList) {
    this.setState({
      city: nextList.filter(list => list.province_id === selection),
      selectedProvince: selection
    })
  }

  onCityChange(selection, nextList) {
    const { getSubdistrict } = this.props
    getSubdistrict(selection).then(res => {
      console.log(res)
      this.setState({
        subdistrict: res.filter(list => list.city_id === selection),
        selectedCity: selection
      })
    })
  }

  render() {
    const { location: { loadedCity, loadedProvince } } = this.props
    console.log(this.state, '--s')

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
            onChangeText={firstname => this.onChange('firstname', firstname)}
            value={this.state.firstname}
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
            onChangeText={lastname => this.onChange('lastname', lastname)}
            value={this.state.lastname}
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
            onChangeText={email => this.onChange('email', email)}
            value={this.state.email}
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
            onChangeText={phonenumber =>
              this.onChange('phonenumber', phonenumber)
            }
            value={this.state.phonenumber}
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
                  value={this.state.selectedProvince}
                />
              )}
            </View>
          </Fragment>
        </KeyboardAvoidingView>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <Fragment>
            <Text style={Styles.label_text}>CITY:</Text>
            <View style={GStyles.dropDownSelection_input}>
              {get(this.state, 'city') && (
                <Picker
                  items={this.state.city}
                  hideIcon
                  onValueChange={(city, index) =>
                    this.onCityChange(city, loadedCity)
                  }
                  placeholder={{ label: 'SELECT' }}
                  value={this.state.selectedCity}
                />
              )}
            </View>
          </Fragment>
        </KeyboardAvoidingView>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <Fragment>
            <Text style={Styles.label_text}>CITY:</Text>
            <View style={GStyles.dropDownSelection_input}>
              {get(this.state, 'subdistrict') && (
                <Picker
                  items={this.state.subdistrict}
                  hideIcon
                  onValueChange={(subdistrict, index) =>
                    this.setState({
                      selectedSubdistrict: subdistrict
                    })
                  }
                  placeholder={{ label: 'SELECT' }}
                  value={this.state.selectedSubdistrict}
                />
              )}
            </View>
          </Fragment>
        </KeyboardAvoidingView>
        <View style={Styles.checkSelections}>
          <CheckBox
            label="SET AS DEFAULT"
            checked={this.state.setDefault}
            onChange={checked =>
              this.setState({
                setDefault: !this.state.setDefault
              })
            }
          />
        </View>

        <TouchableOpacity
          onPress={this.onNext}
          style={[Styles.btn, GStyles.buttonContainer]}
        >
          <Text style={GStyles.buttonText}>SAVE ADDRESS</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const mapStateToProps = state => ({
  location: state.get('location').toJS()
})

const mapDispatchToProps = dispatch => ({
  getProvince: bindActionCreators(getProvince, dispatch),
  getSubdistrict: bindActionCreators(getSubdistrict, dispatch),
  getCity: bindActionCreators(getCity, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAddress)

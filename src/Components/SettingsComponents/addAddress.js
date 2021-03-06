import React, { PureComponent, Fragment } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import CheckBox from "react-native-checkbox";
import Picker from "react-native-picker-select";
import get from "lodash/get";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Spinner from "react-native-loading-spinner-overlay";
import { getProvince, getCity } from "../../Actions/LocationAction";
import { updateProfile } from "../../Actions/AuthAction";
import { displayError } from "../../Actions/ErrorAction";
import GStyles from "../../Styles/GeneralStyle";
import Styles from "../../Styles/SettingStyle";

class UpdateAddress extends PureComponent {
  state = {
    firstName: "",
    lastName: "",
    address: "",
    province: [],
    city: undefined,
    provinceId: "SELECT",
    cityName: "SELECT",
    provinceName: "",
    cityId: "",
    phone: "",
    isDefault: false,
    isLoading: false
  };

  componentWillMount() {
    const { getProvince, getCity } = this.props;
    getProvince().then(() => getCity());
  }

  componentWillReceiveProps(nextProps) {
    if (
      get(nextProps.user, "updateProfile.addresses.length") >
      get(this.props.user, "userExtended.addresses.length")
    ) {
      this.setState({
        firstName: "",
        lastName: "",
        address: "",
        province: [],
        city: undefined,
        provinceId: "SELECT",
        cityName: "SELECT",
        provinceName: "",
        cityId: "",
        phone: "",
        isDefault: false,
        isLoading: false
      });
      this.props.displayError("Successfully created");
      // this.props.navigation.navigate('AddressScreen');
      return;
    }
    return;
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  async resetPromise(field) {
    const fields = { [field]: undefined };
    await this.setState({
      ...fields
    });
    return true;
  }

  onLocationChange({ id, name }, nextList) {
    this.resetPromise("city").then(() => {
      this.setState({
        city: nextList.filter(list => list.province_id === id),
        provinceName: name,
        provinceId: id
      });
    });
  }

  onCityChange({ id, name }, nextList) {
    this.setState({
      cityId: id,
      cityName: name
    });
  }

  onSubmit = async () => {
    const { auth } = this.props;
    const { user: isAuthenticated } = auth;
    const token =
      (await AsyncStorage.getItem("token")) || isAuthenticated.token;
    const {
      firstName,
      lastName,
      provinceId,
      cityId,
      phone,
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
      !phone
    ) {
      this.props.displayError("All fields are required");
      return;
    }
    const address = {
      firstName,
      lastName,
      address: this.state.address,
      provinceId,
      cityId,
      cityName,
      provinceName,
      phone,
      isDefault
    };
    this.setState({
      isLoading: true
    });
    this.props.updateProfile({ address }, token);
  };

  render() {
    const {
      location: { loadedCity, loadedProvince },
      shared: { showSpinner }
    } = this.props;
    const { isLoading } = this.state;

    return (
      <View style={{ margin: 10 }}>
        <Spinner
          visible={showSpinner}
          textContent={"Please wait..."}
          textStyle={{ color: "#333" }}
        />
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <Text style={Styles.label_text}>FIRST NAME:</Text>
          <TextInput
            style={GStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Firstname"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize={"none"}
            onChangeText={firstName => this.onChange("firstName", firstName)}
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
            autoCapitalize={"none"}
            onChangeText={lastName => this.onChange("lastName", lastName)}
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
            autoCapitalize={"none"}
            onChangeText={address => this.onChange("address", address)}
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
            onChangeText={phone => this.onChange("phone", phone)}
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
                  placeholder={{ label: "SELECT" }}
                  value={this.state.provinceId}
                />
              )}
            </View>
          </Fragment>
        </KeyboardAvoidingView>

        {get(this.state, "city") && (
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
                  placeholder={{ label: "SELECT" }}
                  value={this.state.cityName}
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

        {!isLoading ? (
          <TouchableOpacity
            onPress={this.onSubmit}
            style={[Styles.btn, GStyles.buttonContainer]}
          >
            <Text style={GStyles.buttonText}>SAVE ADDRESS</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[Styles.btn, GStyles.buttonContainer]}>
            <ActivityIndicator size="small" color="#ffffff" />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  location: state.get("location").toJS(),
  auth: state.get("auth").toJS(),
  error: state.get("errorMessage").toJS(),
  shared: state.get("shared").toJS()
});

const mapDispatchToProps = dispatch => ({
  getProvince: bindActionCreators(getProvince, dispatch),
  getCity: bindActionCreators(getCity, dispatch),
  updateProfile: bindActionCreators(updateProfile, dispatch),
  displayError: bindActionCreators(displayError, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateAddress);

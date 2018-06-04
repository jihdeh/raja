import React, { PureComponent, Fragment } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from "react-native";
import CheckBox from "react-native-checkbox";
import Picker from "react-native-picker-select";
import GStyles from "../../Styles/GeneralStyle";
import Styles from "../../Styles/SettingStyle";

class UpdateAddress extends PureComponent {
  state = {
    firstname: "",
    lastname: "",
    address: "",
    province: [
      {
        label: "Bangladesh",
        value: "bangladesh",
        key: "bangladesh"
      },
      {
        label: "Reverine",
        value: "reverine",
        key: "reverine"
      }
    ],
    city: [
      {
        label: "Bangladesh",
        value: "bangladesh",
        key: "bangladesh"
      },
      {
        label: "Reverine",
        value: "reverine",
        key: "reverine"
      }
    ],
    selectedProvince: "SELECT",
    phonenumber: "",
    setDefault: false
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  render() {
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
            autoCapitalize={"none"}
            onChangeText={firstname => this.onChange("firstname", firstname)}
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
            autoCapitalize={"none"}
            onChangeText={lastname => this.onChange("lastname", lastname)}
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
            autoCapitalize={"none"}
            onChangeText={email => this.onChange("email", email)}
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
              this.onChange("phonenumber", phonenumber)
            }
            value={this.state.phonenumber}
            autoCorrect={false}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <Fragment>
            <Text style={Styles.label_text}>PROVINCE:</Text>
            <View style={GStyles.dropDownSelection_input}>
              <Picker
                items={this.state.province}
                hideIcon
                onValueChange={(province, index) =>
                  this.setState({ selectedProvince: province })
                }
                placeholder={{}}
                value={this.state.selectedProvince}
              />
            </View>
          </Fragment>
        </KeyboardAvoidingView>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <Fragment>
            <Text style={Styles.label_text}>CITY:</Text>
            <View style={GStyles.dropDownSelection_input}>
              <Picker
                items={this.state.city}
                hideIcon
                onValueChange={(city, index) =>
                  this.setState({ selectedCity: city })
                }
                placeholder={{}}
                value={this.state.selectedCity}
              />
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
    );
  }
}

export default UpdateAddress;

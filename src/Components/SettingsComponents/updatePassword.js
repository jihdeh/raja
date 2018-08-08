import React, { PureComponent } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updatePassword } from "../../Actions/AuthAction";
import { displayError } from "../../Actions/ErrorAction";
import GStyles from "../../Styles/GeneralStyle";
import Styles from "../../Styles/SettingStyle";

class UpdatePassword extends PureComponent {
  state = {
    password: "",
    newPassword: "",
    confirmPassword: ""
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  validatePass = () => {
    const { confirmPassword, newPassword, password } = this.state;
    const trimmedConfirmPassword = confirmPassword.trim();
    const trimmednewPassword = newPassword.trim();
    const trimmedpassword = password.trim();
    if (!trimmednewPassword || !trimmedConfirmPassword || !trimmedpassword) {
      this.props.displayError("Fields cannot be blank");
      return false;
    }

    if (trimmednewPassword !== confirmPassword) {
      this.props.displayError("Passwords do not match");
      return false;
    }

    return true;
  };

  onUpdateProfile = () => {
    const { confirmPassword, newPassword, password } = this.state;
    if (!this.validatePass()) return;
    this.props.updatePassword({
      newPassword,
      password
    });
  };

  render() {
    return (
      <View style={{ margin: 10 }}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <Text style={Styles.label_text}>CURRENT PASSWORD:</Text>
          <TextInput
            style={GStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Current Password"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            returnKeyType="next"
            keyboardType="default"
            secureTextEntry
            autoCapitalize={"none"}
            onChangeText={password => this.onChange("password", password)}
            value={this.state.password}
            autoCorrect={false}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <Text style={Styles.label_text}>NEW PASSWORD:</Text>
          <TextInput
            style={GStyles.input}
            underlineColorAndroid="transparent"
            placeholder="New Password"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            returnKeyType="next"
            keyboardType="default"
            secureTextEntry
            autoCapitalize={"none"}
            onChangeText={newPassword =>
              this.onChange("newPassword", newPassword)
            }
            value={this.state.newPassword}
            autoCorrect={false}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <Text style={Styles.label_text}>CONFIRM PASSWORD:</Text>
          <TextInput
            style={GStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Confirm Password"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            keyboardType="default"
            autoCapitalize={"none"}
            secureTextEntry
            onChangeText={confirmPassword =>
              this.onChange("confirmPassword", confirmPassword)
            }
            value={this.state.confirmPassword}
            autoCorrect={false}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={this.onUpdateProfile}
          style={[Styles.btn, GStyles.buttonContainer]}
        >
          <Text style={GStyles.buttonText}>CHANGE PASSWORD</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.get("auth").toJS()
});

const mapDispatchToProps = dispatch => ({
  updatePassword: bindActionCreators(updatePassword, dispatch),
  displayError: bindActionCreators(displayError, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePassword);

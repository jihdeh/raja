import React, { PureComponent } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from "react-native";
import GStyles from "../../Styles/GeneralStyle";
import Styles from "../../Styles/SettingStyle";

class UpdatePassword extends PureComponent {
  state = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
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
          <Text style={Styles.label_text}>CURRENT PASSWORD:</Text>
          <TextInput
            style={GStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Current Password"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize={"none"}
            onChangeText={currentPassword =>
              this.onChange("currentPassword", currentPassword)
            }
            value={this.state.currentPassword}
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
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize={"none"}
            onChangeText={confirmPassword =>
              this.onChange("confirmPassword", confirmPassword)
            }
            value={this.state.confirmPassword}
            autoCorrect={false}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={this.onNext}
          style={[Styles.btn, GStyles.buttonContainer]}
        >
          <Text style={GStyles.buttonText}>CHANGE PASSWORD</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default UpdatePassword;

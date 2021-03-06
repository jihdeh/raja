import React, { PureComponent } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Spinner from "react-native-loading-spinner-overlay";
import { updateProfile } from "../../Actions/AuthAction";
import GStyles from "../../Styles/GeneralStyle";
import Styles from "../../Styles/SettingStyle";

class EditProfile extends PureComponent {
  state = {};

  componentWillMount(nextProps) {
    const {
      user: { userExtended }
    } = this.props;
    this.setState({ ...userExtended });
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  async onUpdateProfile() {
    const {
      user: { userExtended }
    } = this.props;
    const token =
      (await AsyncStorage.getItem("token")) || this.props.user.token;
    const moldObj = Object.assign({ ...userExtended }, { ...this.state });
    this.props.updateProfile(moldObj, token);
  }

  render() {
    const {
      user: { userExtended },
      shared: { showSpinner }
    } = this.props;

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
            placeholder="Last Name"
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
          <Text style={Styles.label_text}>EMAIL:</Text>
          <TextInput
            style={GStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Email"
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
          <Text style={Styles.label_text}>USERNAME:</Text>
          <TextInput
            style={GStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Username"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize={"none"}
            onChangeText={username => this.onChange("username", username)}
            value={this.state.username}
            autoCorrect={false}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <Text style={Styles.label_text}>PHONE NUMBER:</Text>
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
        <TouchableOpacity
          onPress={() => this.onUpdateProfile()}
          style={[Styles.btn, GStyles.buttonContainer]}
        >
          <Text style={GStyles.buttonText}>UPDATE PROFILE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.get("auth").toJS(),
  shared: state.get("shared").toJS()
});

const mapDispatchToProps = dispatch => ({
  updateProfile: bindActionCreators(updateProfile, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);

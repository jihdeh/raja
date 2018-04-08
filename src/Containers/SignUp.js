import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Button,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createAccount } from "../Actions/AuthAction";
import { displayError } from "../Actions/ErrorAction";
import Styles from "../Styles/SignUpStyle";

class SignUp extends Component {
  state = {
    passwordInput: "",
    usernameInput: "",
    confirmPasswordInput: "",
    emailInput: ""
  };

  handleBack = () => {
    this.props.navigation.goBack();
  };

  validateEmail = email => {
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email.toLowerCase());
  };

  validateInputFields = ({
    passwordInput,
    confirmPasswordInput,
    emailInput,
    usernameInput
  }) => {
    const hasFilledInputs =
      !passwordInput.trim() || !confirmPasswordInput.trim();

    const noWhiteSpaceUsername = /\s/.test(usernameInput);

    const isEmailValid = this.validateEmail(emailInput);

    if (!emailInput || !usernameInput) {
      this.props.displayError("Email and Username please.");
      return;
    } else if (!isEmailValid) {
      this.props.displayError("Email address should be valid.");
      return false;
    } else if (passwordInput !== confirmPasswordInput) {
      this.props.displayError("Passwords do not match!");
      return false;
    } else if (noWhiteSpaceUsername) {
      this.props.displayError("No spaces allowed in username");
      return false;
    }

    return true;
  };

  onSignUp = () => {
    const { navigation } = this.props;
    const { state } = navigation;
    const {
      passwordInput,
      confirmPasswordInput,
      emailInput,
      usernameInput
    } = this.state;

    if (!this.validateInputFields(this.state)) return;

    const userData = {
      email: emailInput.trim(),
      password: passwordInput.trim(),
      username: usernameInput.replace(/\s+/g, ""),
      passwordConfirm: confirmPasswordInput.trim()
    };

    this.props.onSignUp(userData);
  };

  render() {
    return (
      <View style={Styles.container}>
        <TouchableOpacity onPress={this.handleBack}>
          <Image
            style={Styles.icon}
            source={require("../../assets/backArrow.png")}
          />
        </TouchableOpacity>
        <View style={Styles.messageView}>
          <Text style={Styles.grayMessage}>HI?</Text>
          <Text style={Styles.blackMessage}>There</Text>
        </View>
        <View style={Styles.centerView}>
          <TextInput
            style={Styles.input}
            underlineColorAndroid="transparent"
            placeholder="Username"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            onChangeText={usernameInput => this.setState({ usernameInput })}
            value={this.state.usernameInput}
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
          />

          <TextInput
            style={Styles.input}
            underlineColorAndroid="transparent"
            placeholder="Email"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            onChangeText={emailInput => this.setState({ emailInput })}
            value={this.state.emailInput}
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
          />

          <TextInput
            style={Styles.input}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            secureTextEntry
            returnKeyType="next"
            ref={input => (this.passwordInput = input)}
            onChangeText={passwordInput => this.setState({ passwordInput })}
            value={this.state.passwordInput}
            onSubmitEditing={() => this.repeatPasswordInput.focus()}
          />

          <TextInput
            style={Styles.input}
            underlineColorAndroid="transparent"
            placeholder="Re-enter Password"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            secureTextEntry
            returnKeyType="go"
            onChangeText={confirmPasswordInput =>
              this.setState({ confirmPasswordInput })
            }
            value={this.state.confirmPasswordInput}
            ref={input => (this.repeatPasswordInput = input)}
          />
          <TouchableOpacity
            onPress={this.onSignUp}
            style={Styles.buttonContainer}
          >
            <Text style={Styles.buttonText}>JOIN JULI!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: bindActionCreators(createAccount, dispatch),
    displayError: bindActionCreators(displayError, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(SignUp);

import React, { Component } from "react";
import {
  AsyncStorage,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../../Actions/AuthAction";
import { displayError } from "../../Actions/ErrorAction";

import Styles from "../../Styles/LoginStyle";

class Login extends Component {
  state = {
    emailInput: "",
    passwordInput: ""
  };

  // componentWillReceiveProps(prevProps) {
  //   const { auth } = prevProps;
  //   if (auth && auth.token) {
  //     AsyncStorage.getItem("token").then(value => {
  //       if (!value) {
  //         AsyncStorage.setItem("token", auth.token);
  //         prevProps.navigation.navigate("Home");
  //       }
  //     });
  //   }
  //   return;
  // }

  validateEmail = email => {
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email.toLowerCase());
  };

  onLogin = e => {
    let emailInput = this.state.emailInput.trim();
    let passwordInput = this.state.passwordInput.trim();
    e.preventDefault();

    const hasFilledInputs = !emailInput || !passwordInput;
    const isEmailValid = this.validateEmail(emailInput);
    if (hasFilledInputs) {
      this.props.displayError("Both the email and password must be entered!");
      return;
    }
    if (!isEmailValid) {
      this.props.displayError("A valid email address is required.");
      return;
    }
    const dummyToken = "19u1ikad87ayhdjas32348yhwjbdrhh8ads8qeijeb3j23h83h";
    this.props.login(dummyToken);
    // this.props.onLogin({
    //   email: emailInput,
    //   password: passwordInput
    // });
  };

  handleBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView
        style={Styles.loginInputContainer}
        behavior="padding"
        keyboardVerticalOffset={64}
      >
        <TextInput
          style={Styles.input}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="rgba(45, 45, 45, 0.3)"
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={emailInput => this.setState({ emailInput })}
          value={this.state.emailInput}
          autoCorrect={false}
        />
        <TextInput
          style={Styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="rgba(45, 45, 45, 0.3)"
          secureTextEntry
          returnKeyType="go"
          ref={input => {
            this.passwordInput = input;
          }}
          onChangeText={passwordInput => this.setState({ passwordInput })}
          value={this.state.passwordInput}
        />

        <TouchableOpacity onPress={this.onLogin} style={Styles.buttonContainer}>
          <Text style={Styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <View style={Styles.linkBox}>
          <Text onPress={() => navigation.navigate("SignUp")}>
            Create Account
          </Text>
          <Text onPress={() => navigation.navigate("ResetPassword")}>
            Forgot password?
          </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
});

const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(login, dispatch),
  displayError: bindActionCreators(displayError, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

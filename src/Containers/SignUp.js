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
import { displayError } from "../Actions/ErrorAction";
import Styles from "../Styles/SignUpStyle";

class SignUp extends Component {
  state = {
    lastNameInput: "",
    firstNameInput: "",
    emailInput: ""
  };

  handleBack = () => {
    this.props.navigation.goBack();
  };

  gotoNext = () => {
    const { navigation, dispatch } = this.props;
    const {
      lastNameInput,
      firstNameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput
    } = this.state;
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
            placeholder="First Name"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            onChangeText={firstNameInput => this.setState({ firstNameInput })}
            value={this.state.firstNameInput}
            returnKeyType="next"
            onSubmitEditing={() => this.lastNameInput.focus()}
          />
          <TextInput
            style={Styles.input}
            underlineColorAndroid="transparent"
            placeholder="Last Name"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            returnKeyType="go"
            onChangeText={lastNameInput => this.setState({ lastNameInput })}
            value={this.state.lastNameInput}
            ref={input => (this.lastNameInput = input)}
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
            onPress={this.gotoNext}
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
    displayError: bindActionCreators(displayError, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(SignUp);

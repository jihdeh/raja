import React, { PropTypes, Component } from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import Styles from "../../Styles/FacebookLoginButtonStyles";

export default class FacebookLoginButton extends Component {
  render() {
    return (
      <TouchableOpacity style={Styles.button}>
        <Image
          source={require("../../../assets/Icons/facebook-icon.png")}
          style={Styles.facebookIcon}
        />
        <Text style={Styles.buttonText}>Login with Facebook</Text>
      </TouchableOpacity>
    );
  }
}

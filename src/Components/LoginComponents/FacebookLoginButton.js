import React, { PropTypes, Component } from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import Styles from "../../Styles/FacebookLoginButtonStyles";

export default class FacebookLoginButton extends Component {
  async onClick() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "194433294293107",
      {
        permissions: ["public_profile"]
      }
    );
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
    }
  }

  render() {
    return (
      <TouchableOpacity style={Styles.button} onPress={() => this.onClick()}>
        <Image
          source={require("../../../assets/Icons/facebook-icon.png")}
          style={Styles.facebookIcon}
        />
        <Text style={Styles.buttonText}>Login with Facebook</Text>
      </TouchableOpacity>
    );
  }
}

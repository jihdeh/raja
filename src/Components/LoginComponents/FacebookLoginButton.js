import React, { PropTypes, Component } from "react";
import { TouchableOpacity, Text, Image, Alert } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Styles from "../../Styles/FacebookLoginButtonStyles";
import { facebookLogin } from "../../Actions/AuthAction";

class FacebookLoginButton extends Component {
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
      this.props.onLogin(token);
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

const mapDispatchToProps = dispatch => ({
  onLogin: bindActionCreators(facebookLogin, dispatch)
});

export default connect(null, mapDispatchToProps)(FacebookLoginButton);

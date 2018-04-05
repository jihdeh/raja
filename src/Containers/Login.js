import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FacebookButton from "../Components/LoginComponents/FacebookLoginButton";
import LoginInputs from "../Components/LoginComponents/LoginInputs";
import Styles from "../Styles/LoginStyle";

class Login extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={Styles.container}>
        <Image
          style={Styles.logo}
          source={{
            uri:
              "https://airshp.com/wp-content/uploads/AL1-LogoSuite2016-v3_MARK-688x688.png"
          }}
        />
        <FacebookButton />
        <View style={Styles.horizon}>
          <View style={Styles.horizonLine} />
          <Text>OR</Text>
          <View />
        </View>
        <LoginInputs />
      </View>
    );
  }
}

export default Login;

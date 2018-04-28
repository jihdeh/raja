import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import get from "lodash/get";
import FacebookButton from "../Components/LoginComponents/FacebookLoginButton";
import LoginInputs from "../Components/LoginComponents/LoginInputs";
import Styles from "../Styles/LoginStyle";

class Login extends Component {
  componentWillReceiveProps(props) {
    const { auth } = props;
    const { user: isAuthenticated } = auth.toJS();
    if (get(isAuthenticated, "token")) {
      this.props.navigation.navigate("Home");
    }
  }

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <FacebookButton />
        <View style={Styles.horizon}>
          <View style={Styles.horizonLine}>
            <Text>OR</Text>
          </View>
        </View>
        <LoginInputs navigation={navigation} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.get("auth")
});

export default connect(mapStateToProps)(Login);

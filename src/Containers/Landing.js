import React, { Component } from "react";
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  PanResponder,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import get from "lodash/get";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon } from "native-base";

import Login from "./Login";
import Styles from "../Styles/LoginStyle";

class LandingPage extends Component {
  state = {
    isLoggedIn: ""
  };

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  async componentWillMount() {
    const value = await AsyncStorage.getItem("token");
    if (value) {
      this.setState({
        isLoggedIn: value
      });
      this.props.navigation.navigate("Home");
    } else {
      this.setState({
        isLoggedIn: false
      });
    }
  }

  componentWillReceiveProps(props) {
    const { auth } = props;
    const { user: isAuthenticated } = auth.toJS();
    if (get(isAuthenticated, "token")) {
      AsyncStorage.getItem("token").then(value => {
        if (!value) {
          AsyncStorage.setItem("token", isAuthenticated.token);
        }
      });
    }

    this.setState({
      isLoggedIn: get(isAuthenticated, "token")
    });
    return;
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={Styles.container}>
        <Image
          style={Styles.logo}
          source={{
            uri:
              "https://airshp.com/wp-content/uploads/AL1-LogoSuite2016-v3_MARK-688x688.png"
          }}
        />
        <View>
          <Login {...this.props} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 150,
    height: 150
  }
});

const mapStateToProps = state => ({
  auth: state.get("auth")
});

export default connect(mapStateToProps)(LandingPage);

import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { Icon } from "native-base";
import get from "lodash/get";

import { connect } from "react-redux";

import ErrorModal from "./ErrorModal";

import Styles from "../Styles/MainScreenStyle";
import { clearError } from "../Actions/ErrorAction";

const displayHeader = props => ({
  header: undefined,
  headerLeft: <Icon name="ios-cash-outline" style={{ paddingLeft: 10 }} />,
  headerRight: (
    <View style={Styles.headerRightContainer}>
      <Icon style={Styles.headerRightIcon} name="ios-bookmark-outline" />
      <Icon
        style={Styles.headerRightIcon}
        name="md-mail"
        onPress={() => console.log(props.navigation)}
      />
    </View>
  )
});

class MainScreen extends Component {
  state = {
    isLoggedIn: null
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    hasParams = !params ? { header: null } : params;
    return {
      ...hasParams
    };
  };

  async componentWillMount() {
    const isLoggedIn = await AsyncStorage.getItem("token");
    if (isLoggedIn && !this.props.navigation.getParam("headerRight")) {
      this.props.navigation.setParams({ ...displayHeader(this.props) });
    }
    this.setState({
      isLoggedIn: isLoggedIn
    });
  }

  async componentWillReceiveProps(props) {
    const { auth } = props;
    const { user: isAuthenticated } = auth.toJS();
    const isLoggedIn = await AsyncStorage.getItem("token");

    if (
      get(isAuthenticated, "token") &&
      !this.props.navigation.getParam("headerRight")
    ) {
      this.props.navigation.setParams({ ...displayHeader });
    } else if (
      !get(isAuthenticated, "token") &&
      !isLoggedIn &&
      props.navigation.getParam("headerRight")
    ) {
      props.navigation.setParams({
        headerLeft: undefined,
        headerRight: undefined,
        header: null
      });
    }
  }

  onClose() {
    this.props.dispatch(clearError());
  }

  render() {
    const { isLoggedIn } = this.state;
    const { errorMessage } = this.props;
    const theErrorMessage = errorMessage.toJS();

    return (
      <View style={styles.container}>
        <ErrorModal
          errorMessage={theErrorMessage}
          onClose={() => this.onClose()}
        />
        <Text onPress={() => this.props.navigation.navigate("Notifications")}>
          Helllo
        </Text>
        <AppStackNavigator />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.get("auth"),
  errorMessage: state.get("errorMessage")
});

export default connect(mapStateToProps)(MainScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

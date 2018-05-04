import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { NavigationActions, addNavigationHelpers } from "react-navigation";
import AppNavigator from "../navigator";

import ErrorModal from "../Components/ErrorModal";

// import Styles from "../Styles/MainScreenStyle";
import { clearError } from "../Actions/ErrorAction";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ loading: false });
  }

  onClose() {
    this.props.dispatch(clearError());
  }

  render() {
    const { dispatch, nav, errorMessage, addListener } = this.props;
    const theErrorMessage = errorMessage.toJS();
    const navHelpers = addNavigationHelpers({
      dispatch,
      state: nav,
      addListener
    });

    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <View style={styles.container}>
        <ErrorModal
          errorMessage={theErrorMessage}
          onClose={() => this.onClose()}
        />
        <AppNavigator navigation={navHelpers} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.get("nav"),
  errorMessage: state.get("errorMessage")
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default connect(mapStateToProps)(App);

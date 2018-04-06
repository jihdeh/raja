import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Icon } from "native-base";

import { TabNavigator, StackNavigator } from "react-navigation";
import { connect } from "react-redux";

import HomeTab from "./AppTabNavigator/HomeTab";
import SearchTab from "./AppTabNavigator/SearchTab";
import AddMediaTab from "./AppTabNavigator/AddMediaTab";
import LikesTab from "./AppTabNavigator/LikesTab";
import ProfileTab from "./AppTabNavigator/ProfileTab";

import LoginScreen from "../Containers/Login";
import SignUpScreen from "../Containers/SignUp";

import ErrorModal from "../Components/ErrorModal";
import Styles from "../Styles/MainScreenStyle";
import { clearError } from "../Actions/ErrorAction";

const displayHeader = {
  headerLeft: <Icon name="ios-cash-outline" style={{ paddingLeft: 10 }} />,
  headerRight: (
    <View style={Styles.headerRightContainer}>
      <Icon style={Styles.headerRightIcon} name="ios-bookmark-outline" />
      <Icon style={Styles.headerRightIcon} name="md-mail" />
    </View>
  )
};

class MainScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    hasParams = !params ? { header: null } : params;
    return {
      ...hasParams
    };
  };

  componentWillReceiveProps(props) {
    const { auth } = props;
    const { token: isAuthenticated } = auth.toJS();
    if (isAuthenticated && !props.navigation.getParam("headerRight")) {
      props.navigation.setParams({ ...displayHeader });
    }
  }

  onClose() {
    this.props.dispatch(clearError());
  }

  render() {
    const { auth, errorMessage } = this.props;
    const { token: isAuthenticated } = auth.toJS();
    const theErrorMessage = errorMessage.toJS();

    return (
      <View style={styles.container}>
        <ErrorModal
          errorMessage={theErrorMessage}
          onClose={() => this.onClose()}
        />
        {isAuthenticated ? <AppTabNavigator /> : <AppStackNavigator />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.get("auth"),
  errorMessage: state.get("errorMessage")
});

export default connect(mapStateToProps)(MainScreen);

const AppTabNavigator = TabNavigator(
  {
    HomeTab: {
      screen: HomeTab
    },
    SearchTab: {
      screen: SearchTab
    },
    AddMediaTab: {
      screen: AddMediaTab
    },
    LikesTab: {
      screen: LikesTab
    },
    ProfileTab: {
      screen: ProfileTab
    }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        ...Platform.select({
          android: {
            backgroundColor: "white"
          }
        })
      },
      activeTintColor: "#000",
      inactiveTintColor: "#d1cece",
      showLabel: false,
      showIcon: true
    }
  }
);

const AppStackNavigator = StackNavigator(
  {
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen }
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

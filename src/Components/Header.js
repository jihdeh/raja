import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { Icon } from "native-base";
import get from "lodash/get";
import Styles from "../Styles/MainScreenStyle";

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

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: null };
  }
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    hasParams = !params ? { header: null } : params;
    return {
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
    };
  };

  async componentWillMount() {
    // const isLoggedIn = await AsyncStorage.getItem("token");
    // if (isLoggedIn && !this.props.navigation.getParam("headerRight")) {
    //   this.props.navigation.setParams({ ...displayHeader(this.props) });
    // }
    // this.setState({
    //   isLoggedIn: isLoggedIn
    // });
  }

  async componentWillReceiveProps(props) {
    // const { auth } = props;
    // console.log(props, this.props);
    // const { user: isAuthenticated } = auth.toJS();
    // const isLoggedIn = await AsyncStorage.getItem("token");
    // if (
    //   get(isAuthenticated, "token") &&
    //   !this.props.navigation.getParam("headerRight")
    // ) {
    //   this.props.navigation.setParams({ ...displayHeader });
    // } else if (
    //   !get(isAuthenticated, "token") &&
    //   !isLoggedIn &&
    //   props.navigation.getParam("headerRight")
    // ) {
    //   props.navigation.setParams({
    //     headerLeft: undefined,
    //     headerRight: undefined,
    //     header: null
    //   });
    // }
  }

  headerLeft = () => (
    <Icon name="ios-cash-outline" style={{ paddingLeft: 10 }} />
  );

  headerRight = () => {
    return (
      <View style={Styles.headerRightContainer}>
        <Icon style={Styles.headerRightIcon} name="ios-bookmark-outline" />
        <Icon
          style={Styles.headerRightIcon}
          name="md-mail"
          onPress={() => this.props.navigation.navigate("Notifications")}
        />
      </View>
    );
  };
  render() {
    const { navigation } = this.props;

    return (
      <View style={Styles.header}>
        {this.headerLeft()}
        {this.headerRight()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.get("auth")
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default connect(mapStateToProps)(Header);

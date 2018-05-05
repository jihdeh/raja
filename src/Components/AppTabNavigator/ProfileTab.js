import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Icon } from "native-base";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../../Actions/AuthAction";
import GStyles from "../../Styles/GeneralStyle";

class ProfileTab extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="person" style={{ color: tintColor }} />
      ),
      headerLeft: <Icon name="ios-cash-outline" style={{ paddingLeft: 10 }} />,
      headerRight: (
        <View style={GStyles.headerRightContainer}>
          <Icon style={GStyles.headerRightIcon} name="ios-bookmark-outline" />
          <Icon
            style={GStyles.headerRightIcon}
            name="md-mail"
            onPress={() => navigation.navigate("Notifications")}
          />
        </View>
      )
    };
  };

  onLogout = () => {
    AsyncStorage.clear();
    this.props.logout();
    this.props.navigation.navigate("Landing");
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(logout, dispatch)
});

export default connect(null, mapDispatchToProps)(ProfileTab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

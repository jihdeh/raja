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

class ProfileTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="person" style={{ color: tintColor }} />
    )
  };

  onLogout = () => {
    AsyncStorage.clear();
    this.props.logout();
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

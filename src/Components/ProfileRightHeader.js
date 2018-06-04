import React, { Component } from "react";
import { View, Text, TouchableOpacity, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon } from "native-base";
import { logout } from "../Actions/AuthAction";
import GStyles from "../Styles/GeneralStyle";
import Styles from "../Styles/ProfileStyle";

class RightHeader extends Component {
  state = {
    onSettingGearClicked: false
  };

  onGearClick = () => {
    this.setState({ onSettingGearClicked: !this.state.onSettingGearClicked });
    return;
  };

  onLogout = () => {
    AsyncStorage.clear();
    this.props.logout();
    this.props.navigation.navigate("Landing");
  };

  render() {
    return (
      <View style={GStyles.headerRightContainer}>
        <TouchableOpacity onPress={() => this.onGearClick()}>
          <Icon style={GStyles.headerRightIcon} name="md-settings" />
          {this.state.onSettingGearClicked && (
            <View style={Styles.settingsOption}>
              <Text style={Styles.settingsOptionText}>Profile</Text>
              <TouchableOpacity onPress={this.onLogout}>
                <Text style={Styles.settingsOptionText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(logout, dispatch)
});

export default connect(null, mapDispatchToProps)(RightHeader);

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'native-base';
import { logout } from '../Actions/AuthAction';
import GStyles from '../Styles/GeneralStyle';
import Styles from '../Styles/ProfileStyle';

class RightHeader extends Component {
  state = {
    onSettingGearClicked: false
  };

  onGearClick = () => {
    this.setState({ onSettingGearClicked: !this.state.onSettingGearClicked });
    return;
  };

  onProfileClick = () => {
    const { navigation, user: { userExtended } } = this.props;
    navigation.setParams({
      followingProfile: false,
      username: userExtended.username
    });
  };

  onLogout = () => {
    AsyncStorage.clear();
    this.props.logout();
    this.props.navigation.navigate('Landing');
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={GStyles.headerRightContainer}>
        <TouchableOpacity onPress={() => this.onGearClick()}>
          <Icon style={GStyles.headerRightIcon} name="md-settings" />
          {this.state.onSettingGearClicked && (
            <View style={Styles.settingsOption}>
              <TouchableOpacity onPress={this.onProfileClick}>
                <Text style={Styles.settingsOptionText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('OrderHistoryScreen')}
              >
                <Text style={Styles.settingsOptionText}>Orders</Text>
              </TouchableOpacity>
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

const mapStateToProps = state => ({
  user: state.get('auth').toJS()
});

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(logout, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RightHeader);

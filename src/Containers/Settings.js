import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/get';
import EditProfile from '../Components/SettingsComponents/editProfile';
import UpdatePassword from '../Components/SettingsComponents/updatePassword';
import UpdateAddress from '../Components/SettingsComponents/updateAddress';
import { getLoggedUserProfile, logout } from '../Actions/AuthAction';
import { getFollowers } from '../Actions/SharedAction';
import { getProducts } from '../Actions/ProductAction';

import GStyles from '../Styles/GeneralStyle';
import HStyles from '../Styles/HomeStyle';
import Styles from '../Styles/SettingStyle';

class Settings extends Component {
  state = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    phonenumber: ''
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  onLogout = () => {
    AsyncStorage.clear();
    this.props.logout();
    this.props.navigation.navigate('Landing');
  };

  render() {
    const { navigation, user: { userExtended, updateProfile } } = this.props;
    return (
      <ScrollView>
        <View style={HStyles.hotListHeader}>
          <Text>EDIT PROFILE</Text>
        </View>
        <EditProfile />
        <View style={HStyles.hotListHeader}>
          <Text>CHANGE PASSWORD</Text>
        </View>
        <UpdatePassword />
        <View style={HStyles.hotListHeader}>
          <Text>MY ADDRESSES</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddressScreen')}
          >
            <Text>
              View addresses ({get(updateProfile, 'addresses.length') ||
                get(userExtended, 'addresses.length')})
            </Text>
          </TouchableOpacity>
        </View>
        <UpdateAddress navigation={navigation} />
        <View >
          <TouchableOpacity
            onPress={this.onLogout}
            style={[Styles.btn, GStyles.buttonContainer]}
          >
            <Text style={GStyles.buttonText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  shared: state.get('shared'),
  user: state.get('auth').toJS()
});

const mapDispatchToProps = dispatch => {
  return {
    getFollowers: bindActionCreators(getFollowers, dispatch),
    logout: bindActionCreators(logout, dispatch),
    getProducts: bindActionCreators(getProducts, dispatch),
    getLoggedUserProfile: bindActionCreators(getLoggedUserProfile, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

import React, { Component } from 'react';
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
} from 'react-native';
import get from 'lodash/get';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../Actions/AuthAction';
import { Icon } from 'native-base';

import Login from './Login';
import Styles from '../Styles/LoginStyle';

class LandingPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  async componentWillMount() {
    const value = await AsyncStorage.getItem('token');
    const verifyJwt = value && jwtDecode(value);
    if (verifyJwt && verifyJwt.exp < Date.now() / 1000 && value) {
      // do something
      console.log('exp');
      AsyncStorage.clear();
      this.props.logout().then(() => {
        this.props.navigation.navigate('Landing');
      });
      return;
    }
    if (value) {
      this.props.navigation.navigate('Home');
      return;
    }
  }

  componentWillReceiveProps(props) {
    const { auth } = props;
    const { user: isAuthenticated } = auth.toJS();
    if (get(isAuthenticated, 'token')) {
      AsyncStorage.getItem('token').then(value => {
        if (!value) {
          AsyncStorage.setItem('token', isAuthenticated.token);
        }
      });
    }
    return;
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={Styles.container}>
        <Image
          style={Styles.logo}
          source={{
            uri:
              'https://airshp.com/wp-content/uploads/AL1-LogoSuite2016-v3_MARK-688x688.png'
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
    backgroundColor: '#fff'
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 150,
    height: 150
  }
});

const mapStateToProps = state => ({
  auth: state.get('auth')
});

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(logout, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

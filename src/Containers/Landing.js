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
  state= {}; 

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  async componentWillMount() {
    console.log('mounted')
    const value = await AsyncStorage.getItem('token');
    const verifyJwt = value && jwtDecode(value);
    if (verifyJwt && verifyJwt.exp < Date.now() / 1000 && value) {
      // do something
      console.log('exp');
      AsyncStorage.clear();
      this.props.logout()
      this.setState({ isAuthenticated: false })
      return;
    }
    if (value) {
      this.setState({ isAuthenticated: true })
      this.props.navigation.navigate('Home');
      return;
    } else {
      this.setState({ isAuthenticated: false })
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
      if (!this.state.isAuthenticated) this.setState({ isAuthenticated: true })
    } else {
      if (this.state.isAuthenticated) this.setState({ isAuthenticated: false })
    }
    return;
  }

  render() {
    console.log('auth', this.state.isAuthenticated)
    return (
      <KeyboardAvoidingView behavior="padding" style={Styles.container}>
        <Image
          style={Styles.logo}
          source={{
            uri:
              'https://airshp.com/wp-content/uploads/AL1-LogoSuite2016-v3_MARK-688x688.png'
          }}
        />
        {this.state.isAuthenticated === false &&
          <View>
            <Login {...this.props} />
          </View>
        }
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

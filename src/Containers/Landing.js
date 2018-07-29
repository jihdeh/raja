import React, { Component } from 'react'
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
} from 'react-native'
import get from 'lodash/get'
import jwtDecode from 'jwt-decode'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../Actions/AuthAction'
import { Icon } from 'native-base'

import Login from './Login'
import Styles from '../Styles/LoginStyle'

class LandingPage extends Component {
  state = {
    logged: null,
    routeName: null
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }

  async componentWillMount() {
    const value = await AsyncStorage.getItem('token')
    this.setState({
      logged: value
    })
    const verifyJwt = value && jwtDecode(value)
    if (verifyJwt && verifyJwt.exp < Date.now() / 1000 && value) {
      // do something
      AsyncStorage.clear()
      this.props.logout().then(() => {
        this.props.navigation.navigate('Landing')
      })
      return
    }
    if (value) {
      this.props.navigation.navigate('Home')
      return
    }
  }

  async componentWillReceiveProps(props) {
    const { auth, navigation: { state: { routeName } } } = props
    const { user: isAuthenticated } = auth
    const storageToken = await AsyncStorage.getItem('token')
    if (get(isAuthenticated, 'token')) {
      AsyncStorage.getItem('token').then(value => {
        if (!value) {
          AsyncStorage.setItem('token', isAuthenticated.token)
        }
      })
    }
    if (!storageToken) {
      this.setState({
        routeName: null
      })
      return
    }
    this.setState({
      logged: storageToken,
      routeName
    })

    return
  }

  logoutView() {
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
    )
  }

  render() {
    const { auth, navigation } = this.props
    const { logged, routeName } = this.state
    if (!get(auth, 'user') && !Object.keys(auth).length && !routeName) {
      return this.logoutView()
    }
    return <Expo.AppLoading />
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
})

const mapStateToProps = state => ({
  auth: state.get('auth').toJS()
})

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(logout, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)

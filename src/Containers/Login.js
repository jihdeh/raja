import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import get from 'lodash/get'
import FacebookButton from '../Components/LoginComponents/FacebookLoginButton'
import LoginInputs from '../Components/LoginComponents/LoginInputs'
import Styles from '../Styles/LoginStyle'

class Login extends Component {
  render() {
    const { navigation, shared: { showSpinner } } = this.props

    return (
      <View>
        <Spinner visible={showSpinner} textContent={"Please wait..."} textStyle={{color: '#333'}} />
        <FacebookButton navigate={navigation.navigate} />
        <View style={Styles.horizon}>
          <View style={Styles.horizonLine}>
            <Text>OR</Text>
          </View>
        </View>
        <LoginInputs navigation={navigation} />
      </View>
    )
  }
}

export default connect(state => ({
  shared: state.get('shared').toJS()
}))(Login)

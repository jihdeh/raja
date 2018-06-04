import React, { PureComponent } from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateProfile } from '../../Actions/AuthAction'
import GStyles from '../../Styles/GeneralStyle'
import Styles from '../../Styles/SettingStyle'

class EditProfile extends PureComponent {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    phone: ''
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value
    })
  }

  onSubmit = () => {
    this.props.updateProfile({})
  }

  render() {
    return (
      <View style={{ margin: 10 }}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <Text style={Styles.label_text}>FIRST NAME:</Text>
          <TextInput
            style={GStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Firstname"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize={'none'}
            onChangeText={firstname => this.onChange('firstname', firstname)}
            value={this.state.firstname}
            autoCorrect={false}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <Text style={Styles.label_text}>LAST NAME:</Text>
          <TextInput
            style={GStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Last Name"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize={'none'}
            onChangeText={lastname => this.onChange('lastname', lastname)}
            value={this.state.lastname}
            autoCorrect={false}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <Text style={Styles.label_text}>EMAIL:</Text>
          <TextInput
            style={GStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Email"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize={'none'}
            onChangeText={email => this.onChange('email', email)}
            value={this.state.email}
            autoCorrect={false}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <Text style={Styles.label_text}>USERNAME:</Text>
          <TextInput
            style={GStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Username"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize={'none'}
            onChangeText={username => this.onChange('username', username)}
            value={this.state.username}
            autoCorrect={false}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <Text style={Styles.label_text}>PHONE NUMBER:</Text>
          <TextInput
            style={GStyles.input}
            underlineColorAndroid="transparent"
            placeholder="phone"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            returnKeyType="go"
            keyboardType="numeric"
            onChangeText={phone => this.onChange('phone', phone)}
            value={this.state.phone}
            autoCorrect={false}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={this.onNext}
          style={[Styles.btn, GStyles.buttonContainer]}
        >
          <Text style={GStyles.buttonText}>UPDATE PROFILE</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.get('auth')
})

const mapDispatchToProps = dispatch => ({
  updateProfile: bindActionCreators(updateProfile, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)

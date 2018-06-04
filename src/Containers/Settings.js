import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";
import EditProfile from "../Components/SettingsComponents/editProfile";
import UpdatePassword from "../Components/SettingsComponents/updatePassword";
import UpdateAddress from "../Components/SettingsComponents/updateAddress";
import GStyles from "../Styles/GeneralStyle";
import HStyles from "../Styles/HomeStyle";
import Styles from "../Styles/SettingStyle";

class Settings extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phonenumber: ""
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  render() {
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
        </View>
        <UpdateAddress />
      </ScrollView>
    );
  }
}

export default Settings;

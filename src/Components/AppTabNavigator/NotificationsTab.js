import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "native-base";
import Notifications from "../Notifications";
import GStyles from "../../Styles/GeneralStyle";

class NotificationsTab extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-notifications-outline" style={{ color: tintColor }} />
      ),
      headerLeft: <Icon name="ios-cash-outline" style={{ paddingLeft: 10 }} />,
      headerRight: (
        <View style={GStyles.headerRightContainer}>
          <Icon
            onPress={() => navigation.navigate("BookmarkScreen")}
            style={GStyles.headerRightIcon}
            name="ios-bookmark-outline"
          />
          <Icon onPress={() => navigation.navigate('ChatListScreen')}
            style={GStyles.headerRightIcon} name="md-mail" 
          />
        </View>
      )
    };
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Notifications />
      </View>
    );
  }
}

export default NotificationsTab;

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
      headerLeft: (
        <View style={GStyles.headerRightContainer}>
          <Icon
            name="ios-cart"
            onPress={() => navigation.navigate("CartScreen")}
            style={{ paddingLeft: 10 }}
          />
          <Icon
            name="ios-cash-outline"
            onPress={() => navigation.navigate("WalletScreen")}
            style={{ paddingLeft: 20 }}
          />
        </View>
      ),
      headerRight: (
        <View style={GStyles.headerRightContainer}>
          <Icon
            onPress={() => navigation.navigate("BookmarkScreen")}
            style={GStyles.headerRightIcon}
            name="ios-bookmark-outline"
          />
          <Icon onPress={() => navigation.navigate('ChatListScreen')}
            style={{ paddingRight: 10 }} name="md-mail" 
          />
        </View>
      )
    };
  };

  render() {
    const { navigation} = this.props
    return (
      <View style={{ flex: 1 }}>
        <Notifications navigation={navigation} />
      </View>
    );
  }
}

export default NotificationsTab;

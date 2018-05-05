import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Icon } from "native-base";
import GStyles from "../../Styles/GeneralStyle";

class LikesTab extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-heart" style={{ color: tintColor }} />
      ),
      headerLeft: <Icon name="ios-cash-outline" style={{ paddingLeft: 10 }} />,
      headerRight: (
        <View style={GStyles.headerRightContainer}>
          <Icon style={GStyles.headerRightIcon} name="ios-bookmark-outline" />
          <Icon
            style={GStyles.headerRightIcon}
            name="md-mail"
            onPress={() => navigation.navigate("Notifications")}
          />
        </View>
      )
    };
  };

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text>LikesTab</Text>
        </View>
      </View>
    );
  }
}
export default LikesTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

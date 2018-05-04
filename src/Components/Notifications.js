import React, { Component } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

class Notification extends Component {
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Text>Shay bookmarked your profile</Text>
      </ScrollView>
    );
  }
}

export default Notification;

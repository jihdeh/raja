import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from "react-native";

const dummyData = [
  {
    message: "Ben law bookmarked your item"
  },
  {
    message: "Two of your new products have been purchased"
  }
];

const fetchData = () =>
  new Promise((resolve, reject) => setTimeout(() => resolve(dummyData), 2000));

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }
  _onRefresh() {
    this.setState({ refreshing: true });
    fetchData().then(() => {
      this.setState({ refreshing: false });
    });
  }

  render() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        {dummyData.map((notification, key) => {
          return (
            <View
              key={key}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#d6d7d8",
                padding: 10
              }}
            >
              <Text>
                {notification.message} -{" "}
                <Text style={{ fontSize: 10 }}>3w ago</Text>
              </Text>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

export default Notification;

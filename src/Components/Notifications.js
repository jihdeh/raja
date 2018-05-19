import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image
} from "react-native";
import Pusher from "pusher-js/react-native";
import GStyles from "../Styles/GeneralStyle";

const socket = new Pusher("0a8c0a7646c00d9e3227", {
  cluster: "eu"
});

const channel = socket.subscribe("auction-bid");

const fetchData = () =>
  new Promise((resolve, reject) => setTimeout(() => resolve(dummyData), 2000));

class Notification extends Component {
  state = {
    data: [
      {
        message: "Ben law bookmarked your item"
      },
      {
        message: "Two of your new products have been purchased"
      }
    ]
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Notifications",
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={GStyles.icon}
            source={require("../../assets/backArrow.png")}
          />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  componentWillMount() {
    channel.bind("new-bid", data => {
      console.log(data.message);
      this.setState({
        data: [...this.state.data, data.message]
      });
    });
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
        {data.length ? (
          data.reverse().map((notification, key) => {
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
          })
        ) : (
          <View>
            <Text>No new notifications</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

export default Notification;

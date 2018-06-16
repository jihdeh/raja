import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
  AsyncStorage
} from 'react-native';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import get from 'lodash/get';
import moment from 'moment/moment';
import { bindActionCreators } from 'redux';
import Pusher from 'pusher-js/react-native';
import { getNotifications } from '../Actions/SharedAction';

import GStyles from '../Styles/GeneralStyle';

const socket = new Pusher('0a8c0a7646c00d9e3227', {
  cluster: 'eu'
});

Pusher.logToConsole = true;
const channel = socket.subscribe('auction-bid');
channel.bind('new-bid', data => {
  console.log(data.message, '----notififier');
  // this.setState({
  //   data: [...this.state.data, data.message]
  // })
});

socket.connection.bind('error', function(err) {
  console.log(err);
  if (get(err, 'error.data.code') === 4004) {
    log('Over limit!');
  }
});

console.log(socket);
class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      refreshing: false
    };
  }

  componentWillMount() {
    channel.bind('new-bid', data => {
      console.log(data.message, '----notififier');
      this.setState({
        data: [...this.state.data, data.message]
      });
    });
    this.props.getNotifications();
  }

  componentWillReceiveProps(nextProps) {
    const { shared: { notifications } } = nextProps;
    if (get(notifications, 'length') !== this.state.notifications) {
      this.setState({
        notifications: notifications
      });
    }
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.props.getNotifications().then(() => {
      this.setState({ refreshing: false });
    });
  }

  render() {
    const { notifications } = this.state;

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
        {get(notifications, 'length') ? (
          notifications.reverse().map((notification, key) => {
            return (
              <View
                key={key}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#d6d7d8',
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Text>{notification.actor} followed you </Text>
                <Text style={{ fontSize: 10 }}>
                  {moment(notification.created_at).fromNow(true)}
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

const mapStateToProps = state => ({
  shared: state.get('shared').toJS()
});

const mapDispatchToProps = dispatch => ({
  getNotifications: bindActionCreators(getNotifications, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

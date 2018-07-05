import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { getBookmarks } from '../Actions/SharedAction';

import GStyles from '../Styles/GeneralStyle';
import HStyles from '../Styles/HomeStyle';
import Styles from '../Styles/BookmarkStyle';

class Followers extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  render() {
    const { shared, navigation } = this.props;

    return (
      <ScrollView style={{ flex: 1 }}>
        {get(shared, 'followers') &&
          shared.followers.map((follower, key) => {
            return (
              <TouchableOpacity
                key={key}
                onPress={() =>
                  navigation.navigate('ProfileTab', {
                    following: { ...follower },
                    username: follower.username,
                    followingProfile: false
                  })
                }
              >
                <View style={Styles.section}>
                  <View>
                    <Image
                      style={Styles.image}
                      source={{ uri: follower.photo }}
                    />
                  </View>
                  <View style={Styles.sectionTextLayer}>
                    <Text style={Styles.sectionText}>
                      Username: {follower.username}
                    </Text>
                  </View>
                </View>
                <View style={Styles.divider} />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  shared: state.get('shared').toJS(),
  auth: state.get('auth').toJS()
});

export default connect(mapStateToProps)(Followers);

import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { getBookmarks } from '../Actions/SharedAction';

import GStyles from '../Styles/GeneralStyle';
import HStyles from '../Styles/HomeStyle';
import Styles from '../Styles/BookmarkStyle';

class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    const { getBookmarks } = this.props;
    await getBookmarks();
  }

  componentWillReceiveProps(nextProps) {
    const { shared: { bookmark } } = this.props;
    if (bookmark && bookmark.length) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { shared, navigation } = this.props;

    return (
      <ScrollView style={{ flex: 1 }}>
        {get(shared, 'bookmark') &&
          shared.bookmark.items.map((item, key) => {
            return (
              <TouchableOpacity
                key={key}
                onPress={() => navigation.navigate('ProductInfo', { item })}
              >
                <View style={Styles.section}>
                  <View>
                    <Image
                      style={Styles.image}
                      source={{ uri: item.images[0].url }}
                    />
                  </View>
                  <View style={Styles.sectionTextLayer}>
                    <Text style={Styles.sectionText}>
                      Name: {item.name.substring(0, 35) + '...'}
                    </Text>
                    <Text style={Styles.sectionText}>
                      Desc: {item.description.substring(0, 35) + '...'}
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
  shared: state.get('shared').toJS()
});

const mapDispatchToProps = dispatch => {
  return {
    getBookmarks: bindActionCreators(getBookmarks, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);

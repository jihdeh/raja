import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Index } from 'react-instantsearch-native';

import Hits from './Hits';
import Styles from '../../Styles/SearchStyle';

class SearchResults extends Component {

  renderSuggestionHeader() {
    const { selectedTab, onTabSelect } = this.props;
    return (
      <View>
        <View style={Styles.suggestionContainer}>
          <TouchableOpacity
            style={selectedTab === 'product' && Styles.suggestionHeaderWrapper}
            onPress={() => onTabSelect('product')}
          >
            <Text style={Styles.suggestionHeader}>Products</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedTab === 'user' && Styles.suggestionHeaderWrapper}
            onPress={() => onTabSelect('user')}
          >
            <Text style={Styles.suggestionHeader}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { results, selectedTab } = this.props;
    if (!results) return null;

    return (
      <React.Fragment>
        {results.users && this.renderSuggestionHeader()}
        <View>
          { selectedTab === 'product' ? <Hits /> : <Index indexName="users"><Hits /></Index>}
        </View>
      </React.Fragment>
    );
  }
}
export default SearchResults;

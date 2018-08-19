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
  state = {
    selectedTab: 'product'
  };

  renderSuggestionHeader() {
    const { selectedTab } = this.state;
    return (
      <View>
        <View style={Styles.suggestionContainer}>
          <TouchableOpacity
            style={selectedTab === 'product' && Styles.suggestionHeaderWrapper}
            onPress={() => 
              this.setState({
                selectedTab: 'product'
              })
            }
          >
            <Text style={Styles.suggestionHeader}>Products</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedTab === 'user' && Styles.suggestionHeaderWrapper}
            onPress={() => 
              this.setState({
                selectedTab: 'user'
              })
            }
          >
            <Text style={Styles.suggestionHeader}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { selectedTab } = this.state;    
    const { results } = this.props;
    if (!results) return null;

    return (
      <React.Fragment>
        {this.renderSuggestionHeader()}
        <View>
          { selectedTab === 'product' ? <Hits /> : <Index indexName="users"><Hits /></Index>}
        </View>
      </React.Fragment>
    );
  }
}
export default SearchResults;

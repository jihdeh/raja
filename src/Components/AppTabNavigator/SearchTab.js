import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import { InstantSearch, Configure, Index, createConnector } from 'react-instantsearch-native';
import Styles from '../../Styles/SearchStyle';
import GStyles from '../../Styles/GeneralStyle';
import Hits from './Hits';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import DummyProductList from '../../utils/dummySearchCategoryJson';
import { Icon } from 'native-base';


const Suggestions = createConnector({
  displayName: 'CustomResults',
  getProvidedProps(props, searchState, searchResults) {
		let status = 'initial';
		if (searchResults.searching) { status = 'pending';}
		else if (searchResults.results && !searchResults.results.products.nbHits && !searchResults.results.users.nbHits) status = 'empty'
		else if (searchResults.results && (searchResults.results.products.nbHits || searchResults.results.users.nbHits)) status = 'data'
		
		return { query: searchState.query, status, results: searchResults.results };
  }
})(({ status, query, results, ...props }) => {
	if (!status || status === 'initial' || !query || query.length < 2) return null;

	return (
		<SearchResults {...props} status={status} results={results} query={query}/>
	)
});

class SearchTab extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-search" style={{ color: tintColor }} />
      ),
      headerLeft: <Icon name="ios-cash-outline" style={{ paddingLeft: 10 }} />,
      headerRight: (
        <View style={GStyles.headerRightContainer}>
          <Icon
            onPress={() => navigation.navigate('BookmarkScreen')}
            style={GStyles.headerRightIcon}
            name="ios-bookmark-outline"
          />
          <Icon onPress={() => navigation.navigate('ChatListScreen')}
            style={GStyles.headerRightIcon} name="md-mail" 
          />
        </View>
      )
    };
  };

  constructor(props) {
    super(props);

    this.suggestionCountArray = [];
    this.onChangeText = this.onChangeText.bind(this);
  }

  state = {
    searchInput: '',
  };

  renderList(list, key) {
    return (
      <View key={key} style={Styles.searchList}>
        <Text style={Styles.searchList__category}>{list.category}</Text>
        {this.renderSubList(list.products)}
      </View>
    );
  }

  renderSubList(products) {
    return products.map((product, key) => {
      return (
        <View style={Styles.searchList__category_product} key={key}>
          <TouchableOpacity>
            <Text>{product.name}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  }

  onChangeText(text) {
    this.setState({ searchInput: text })
  }

  onSearchStateChange(search) {
	}

  render() {
    const { searchInput } = this.state;
    const { products, profiles } = DummyProductList;

    return (
      <InstantSearch
        appId="1IEICQZOWX"
        apiKey="4d3c510ccdc37b9795824befc4d29dde"
        indexName="products"
        onSearchStateChange={this.onSearchStateChange}
        >
        <Index indexName="users" />
        <Configure 
					hitsPerPage={20} 
					facets={['category']}
					maxValuesPerFacet={3}
					attributesToHighlight={['name', 'description']}
				/>
      <View>
        <View style={Styles.searchSection}>
          <SearchBox onChangeText={this.onChangeText}/>
          <Icon
            style={Styles.searchIcon}
            name="ios-search"
            size={20}
            color="#000"
          />
        </View>
        {!searchInput && products.map((list, key) => this.renderList(list, key)) }
        <Suggestions />
      </View>
      </InstantSearch>
    );
  }
}
export default SearchTab;

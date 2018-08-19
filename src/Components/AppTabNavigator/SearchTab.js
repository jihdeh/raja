import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import { InstantSearch, Configure, Index, createConnector, connectRefinementList } from 'react-instantsearch-native';
import Styles from '../../Styles/SearchStyle';
import GStyles from '../../Styles/GeneralStyle';
import Hits from './Hits';
import SearchBox from './SearchBox';
import Categories from './RefinementModal';
import SearchResults from './SearchResults';
import DummyProductList from '../../utils/dummySearchCategoryJson';
import { Icon } from 'native-base';


const VirtualRefinementList = connectRefinementList(() => null);

const Suggestions = createConnector({
  displayName: 'CustomResults',
  getProvidedProps(props, searchState, searchResults) {
    let status = 'initial';
    
    if (searchResults.searching) { status = 'pending';}
    else if (searchResults.results) {
      if (searchResults.results.users) {
        // multiple index search
        if (!searchResults.results.products.nbHits && !searchResults.results.users.nbHits) status = 'empty'
		    else if ((searchResults.results.products.nbHits || searchResults.results.users.nbHits)) status = 'data'
      } else {
        // single index search
        if (!searchResults.results.nbHits) status = 'empty'
        else if (searchResults.results.nbHits) status = 'data'
      }
    }
		
		return { query: searchState.query, status, results: searchResults.results };
  }
})(({ status, query, results, ...props }) => {
	if (!status || status === 'initial' || props.hidden) return null;

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
    this.onIconPress = this.onIconPress.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.onSearchStateChange = this.onSearchStateChange.bind(this);
  }
  
  defaultConfiguration = {
    hitsPerPage: 20,
    facets: ['category'],
    maxValuesPerFacet: 3,
    attributesToHighlight: ['name', 'description']
  }

  state = {
    searchInput: '',
    selectedCategory: '',
    configuration: this.defaultConfiguration,
    modalVisible: false,
    searchState: {}
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
          <TouchableOpacity onPress={() => this.searchCategory(product.name)}>
            <Text>{product.name}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  }

  onChangeText(text) {
    const { searchInput, configuration, selectedCategory } = this.state;
    console.log('chanege text', text)
    const newState = { searchInput: text, selectedCategory: '' }
    
    // clear category selection and reset to default configuration
    if (configuration.restrictSearchableAttributes) {
      newState.configuration = this.defaultConfiguration
    }
    
    this.setState(newState)
  }

  onIconPress() {
    const { searchInput } = this.state;
    if (searchInput) this.setState({ searchInput: '', selectedCategory: '' }) 
  }

  getDefaultConfigure() {
    return {
      hitsPerPage: 20,
      facets: ['category'],
      maxValuesPerFacet: 3,
      attributesToHighlight: ['name', 'description']
    }
  }

  searchCategory(category) {
    console.log('setting category', category)
    this.setState({
      selectedCategory: category,
      searchInput: category,
      configuration: {
        ...this.defaultConfiguration,
        restrictSearchableAttributes: ['category'],
        disableTypoToleranceOnAttributes: ['category']
      } 
    })
  }

  onSearchStateChange(searchState) {
    console.log('chammm', searchState);
    this.setState({ searchState });
  }
  
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  
  render() {
    const { searchInput, configuration, selectedCategory } = this.state;
    const { products, profiles } = DummyProductList;

    console.log('rendersss', this.state)

    return (
      <InstantSearch
        appId="1IEICQZOWX"
        apiKey="4d3c510ccdc37b9795824befc4d29dde"
        indexName="products"
        onSearchStateChange={this.onSearchStateChange}
        searchState={this.state.searchState}
        >
        {!selectedCategory && <Index indexName="users" /> }
        <Configure {...configuration} />
      <View>
        <View style={Styles.searchSection}>
          <SearchBox onChangeText={this.onChangeText} text={searchInput}/>
          <Icon
            style={Styles.searchIcon}
            onPress={this.onIconPress}
            name={searchInput ? "ios-close" : "ios-search"}
            size={20}
            color="#000"
          />
        </View>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Categories</Text>
        </TouchableHighlight>
        {!searchInput && !selectedCategory && products.map((list, key) => this.renderList(list, key)) }
        <Suggestions hidden={!selectedCategory && (!searchInput || searchInput.length < 2)}/>
      </View>
      <VirtualRefinementList attribute="category" />
      <Categories
        setModalVisible={this.setModalVisible}
        modalVisible={this.state.modalVisible}
        onSearchStateChange={this.onSearchStateChange}
        searchState={this.state.searchState}
      />
      </InstantSearch>
    );
  }
}
export default SearchTab;

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Styles from '../../Styles/SearchStyle';
import GStyles from '../../Styles/GeneralStyle';
import DummyProductList from '../../utils/dummySearchCategoryJson';

import { Icon } from 'native-base';

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

  constructor() {
    super();

    this.suggestionCountArray = [];
  }

  state = {
    searchInput: '',
    searchResultCount: 0,
    selectedTab: 'product' //product && profile
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

  renderSuggestionHeader(products, profiles) {
    const { selectedTab, searchResultCount } = this.state;
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
            style={selectedTab === 'profile' && Styles.suggestionHeaderWrapper}
            onPress={() =>
              this.setState({
                selectedTab: 'profile'
              })
            }
          >
            <Text style={Styles.suggestionHeader}>Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.suggestionTextContainer}>
          <Text style={Styles.suggestionText}>SUGGESTIONS (...)</Text>
        </View>
        <View>
          {selectedTab === 'product'
            ? products.map(({ products }, key) =>
                this.renderSuggestionList(products)
              )
            : this.renderSuggestionList(profiles)}
        </View>
      </View>
    );
  }

  renderSuggestionList(suggestions) {
    const { selectedTab, searchInput } = this.state;
    const cleanInput = searchInput.trim().toLowerCase();
    if (selectedTab === 'product') {
      const result = suggestions.filter(
        (product, key) => product.name.toLowerCase().indexOf(cleanInput) > -1
      );

      return result.map((product, key) => (
        <Text key={key}>{product.name}</Text>
      ));
    } else if (selectedTab == 'profile') {
      const result = suggestions.filter(
        (profile, key) => profile.name.toLowerCase().indexOf(cleanInput) > -1
      );

      return result.length ? (
        result.map((profile, key) => <Text key={key}>{profile.name}</Text>)
      ) : (
        <Text>No results found</Text>
      );
    }
  }

  render() {
    const { searchInput } = this.state;
    const { products, profiles } = DummyProductList;

    return (
      <View>
        <View style={Styles.searchSection}>
          <TextInput
            style={Styles.searchInput}
            underlineColorAndroid="transparent"
            placeholder="What are you looking for?"
            placeholderTextColor="rgba(45, 45, 45, 0.3)"
            returnKeyType="search"
            onChangeText={searchInput => this.setState({ searchInput })}
            value={this.state.searchInput}
          />
          <Icon
            style={Styles.searchIcon}
            name="ios-search"
            size={20}
            color="#000"
          />
        </View>
        {!searchInput
          ? products.map((list, key) => this.renderList(list, key))
          : this.renderSuggestionHeader(products, profiles)}
      </View>
    );
  }
}
export default SearchTab;

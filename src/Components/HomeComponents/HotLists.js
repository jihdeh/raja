import React, { Component } from 'react';
import get from 'lodash/get';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Styles from '../../Styles/HomeStyle';

const _keyExtractor = (item, index) => item.id;

class HotLists extends Component {
  renderItem = item => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductInfo', { item })}
      >
        <View style={Styles.listsContainer}>
          <Image
            style={Styles.saleImage}
            source={{ uri: get(item, 'images[0].url') }}
          />
          <Text style={Styles.saleTitle}>{item.name.toUpperCase()}</Text>
          {item.saleFormat !== 'auction' && (
            <Text style={Styles.saleAmount}>{item.salePrice}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const { hotListsItems } = this.props;
    return (
      <View>
        <View style={Styles.hotListHeader}>
          <Text>Editor's Pick</Text>
          <Text>View All</Text>
        </View>
        {get(hotListsItems, 'productFeatured.items.length') ? (
          <FlatList
            horizontal
            data={get(hotListsItems, 'productFeatured.items')}
            keyExtractor={_keyExtractor}
            renderItem={({ item }) => this.renderItem(item)}
          />
        ) : (
          <View>
            {!get(hotListsItems, 'productOnSale.items') ? (
              <Text style={Styles.noAvailableText}> Loading...</Text>
            ) : (
              <Text style={Styles.noAvailableText}>
                We're sorry, no available featured products at this time.
              </Text>
            )}
          </View>
        )}
        <View style={Styles.hotListHeader}>
          <Text>On Sale</Text>
          <Text>View All</Text>
        </View>
        {get(hotListsItems, 'productOnSale.items.length') ? (
          <FlatList
            horizontal
            data={get(hotListsItems, 'productOnSale.items')}
            keyExtractor={_keyExtractor}
            renderItem={({ item }) => this.renderItem(item)}
          />
        ) : (
          <View>
            {!get(hotListsItems, 'productOnSale.items') ? (
              <Text style={Styles.noAvailableText}> Loading...</Text>
            ) : (
              <Text style={Styles.noAvailableText}>
                We're sorry, no products on sale at this time.
              </Text>
            )}
          </View>
        )}
      </View>
    );
  }
}

export default HotLists;

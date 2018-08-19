import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import {
  connectRefinementList,
} from 'react-instantsearch-native';

const RefinementList = connectRefinementList(({ refine, items }) =>
  <FlatList
    data={items}
    keyExtractor={(item, index) => item.label}
    ListHeaderComponent={() =>
      <Text style={{ marginTop: 20, height: 50, alignSelf: 'center' }}>
        Categories
      </Text>}
    renderItem={({ item }) => {
      return (
        <View style={{ height: 30 }}>
          <TouchableHighlight
            onPress={() => {
              refine(item.value);
            }}
          >
            <Text style={item.isRefined ? { fontWeight: 'bold' } : {}}>
              {item.label} ({item.count})
            </Text>
          </TouchableHighlight>
        </View>
      );
    }}
  />
);

export default RefinementList
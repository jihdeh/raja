import React, { Component } from 'react';
import {
  TextInput,
} from 'react-native';
import Styles from '../../Styles/SearchStyle';
import { connectInfiniteHits, connectSearchBox } from 'react-instantsearch-native';

const SearchBox = connectSearchBox(({ refine, currentRefinement, ...props }) => {
  console.log('xxin searchbox top', props)
  return (
    <TextInput
      underlineColorAndroid="transparent"
      style={Styles.searchInput}
      onChangeText={text => {
        refine(text);
        props.onChangeText(text);
      }}
      value={currentRefinement}
      placeholder={'Search products or users..'}
      clearButtonMode={'always'}
      spellCheck={false}
      autoCorrect={false}
      autoCapitalize={'none'}
    />
  );
});

export default SearchBox;
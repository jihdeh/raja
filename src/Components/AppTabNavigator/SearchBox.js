import React, { Component } from 'react';
import {
  TextInput,
} from 'react-native';
import Styles from '../../Styles/SearchStyle';
import { connectSearchBox } from 'react-instantsearch-native';
import Reactotron, { trackGlobalErrors } from 'reactotron-react-native';


const SearchBox = connectSearchBox(({ refine, currentRefinement, ...props }) => {
  if (props.text && currentRefinement !== props.text) {
    console.log('refining text')
    refine(props.text)
  }

  return (
    <TextInput
      underlineColorAndroid="transparent"
      style={Styles.searchInput}
      onChangeText={text => {
        if (text) { refine(text); }
        props.onChangeText(text);
      }}
      value={props.text}
      placeholder={'Search products or users..'}
      clearButtonMode={'always'}
      spellCheck={false}
      autoCorrect={false}
      autoCapitalize={'none'}
    />
  );
});

export default SearchBox;
import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  Modal,
} from 'react-native';
import { InstantSearch } from 'react-instantsearch-native';
import RefinementList from './RefinementList';
import PriceRefinement from './PriceRefinement';


class RefinementModal extends React.Component {
  render() {
    return (
      <View style={{ marginTop: 22, padding: 20 }}>
        <Modal
          animationType={'none'}
          transparent={false}
          visible={this.props.modalVisible}
        >
          <View style={{ marginTop: 22 }}>
            <InstantSearch
              appId="1IEICQZOWX"
              apiKey="4d3c510ccdc37b9795824befc4d29dde"
              indexName="products"
              onSearchStateChange={this.props.onSearchStateChange}
              searchState={this.props.searchState}
            >
              <PriceRefinement attribute="salePrice"/>
              <RefinementList attribute="category" />
              <TouchableHighlight
                onPress={() => {
                  this.props.setModalVisible(!this.props.modalVisible);
                }}
              >
                <Text
                  style={{ marginTop: 20, height: 50, alignSelf: 'center' }}
                >
                  Close
                </Text>
              </TouchableHighlight>
            </InstantSearch>
          </View>
        </Modal>
      </View>
    );
  }
}

export default RefinementModal
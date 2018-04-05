import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import Styles from "../../Styles/HomeStyle";

const _keyExtractor = (item, index) => item.id;

const renderItem = item => (
  <View style={Styles.listsContainer}>
    <Image style={Styles.saleImage} source={{ uri: item.image }} />
    <Text style={Styles.saleTitle}>{item.title}</Text>
    <Text style={Styles.saleAmount}>{item.amount}</Text>
  </View>
);

const HotLists = ({ hotListsItems }) => (
  <View>
    <View style={Styles.hotListHeader}>
      <Text>Editor's Pick</Text>
      <Text>View All</Text>
    </View>
    <FlatList
      horizontal
      data={hotListsItems}
      keyExtractor={_keyExtractor}
      renderItem={({ item }) => renderItem(item)}
    />
    <View style={Styles.hotListHeader}>
      <Text>On Sale</Text>
      <Text>View All</Text>
    </View>
    <FlatList
      horizontal
      data={hotListsItems}
      keyExtractor={_keyExtractor}
      renderItem={({ item }) => renderItem(item)}
    />
  </View>
);

export default HotLists;

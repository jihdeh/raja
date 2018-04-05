import React from "react";
import { View, Text, FlatList, Image, TouchableHighlight } from "react-native";
import Styles from "../../Styles/HomeStyle";

const _keyExtractor = (feed, index) => feed.id;

const renderItem = ({ profile, itemForSale }) => (
  <View style={Styles.userFeedContainer}>
    <View style={Styles.profileContainer}>
      <TouchableHighlight style={Styles.imageContainer}>
        <Image
          style={Styles.profileImage}
          source={{ uri: profile.image }}
          resizeMode="cover"
        />
      </TouchableHighlight>
      <View style={Styles.textWrapper}>
        <Text style={Styles.profileName}>{profile.name}</Text>
      </View>
    </View>
    <View style={Styles.itemForSaleContainer}>
      <Image
        style={Styles.itemForSaleImage}
        source={{ uri: itemForSale.image }}
      />
      <Text style={Styles.saleTitle}>{itemForSale.title}</Text>
      <Text style={Styles.saleAmount}>{itemForSale.amount}</Text>
    </View>
  </View>
);

const UserFeeds = ({ userFeedsList }) => (
  <View>
    <View style={Styles.hotListHeader}>
      <Text>Your Feeds</Text>
    </View>
    <FlatList
      data={userFeedsList}
      numColumns={2}
      keyExtractor={_keyExtractor}
      renderItem={({ item }) => renderItem(item)}
    />
  </View>
);

export default UserFeeds;

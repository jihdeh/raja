import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import get from "lodash/get";
import Styles from "../../Styles/HomeStyle";

const _keyExtractor = (feed, index) => feed.id;

const renderItem = (profile, navigation) => (
  <View style={Styles.userFeedContainer}>
    <TouchableOpacity
      style={Styles.profileContainer}
      onPress={() =>
        navigation.navigate("ProfileTab", {
          following: { ...profile },
          username: profile.username,
          followingProfile: true
        })
      }
    >
      <TouchableHighlight style={Styles.imageContainer}>
        <Image
          style={Styles.profileImage}
          source={{ uri: profile.photo }}
          resizeMode="cover"
        />
      </TouchableHighlight>
      <View style={Styles.textWrapper}>
        <Text style={Styles.profileName}>{profile.username}</Text>
      </View>
    </TouchableOpacity>
    <View style={Styles.itemForSaleContainer}>
      <Image
        style={Styles.itemForSaleImage}
        source={{
          uri:
            get(profile, "image") ||
            "https://i.pinimg.com/736x/69/8d/97/698d97fb72fa05f36f63b9c66402d367--sorority-house-decor-sorority-houses.jpg"
        }}
      />
      <Text style={Styles.saleTitle}>
        {get(profile, "title") || "House decor on fleek"}
      </Text>
      <Text style={Styles.saleAmount}>{get(profile, "amount") || "$20"}</Text>
    </View>
  </View>
);

const UserFeeds = ({ userFeedsList, navigation }) => (
  <View>
    <View style={Styles.hotListHeader}>
      <Text>Your Feeds</Text>
    </View>
    {userFeedsList ? (
      get(userFeedsList, "length") ? (
        <FlatList
          data={userFeedsList}
          numColumns={2}
          keyExtractor={_keyExtractor}
          renderItem={({ item }) => renderItem(item, navigation)}
        />
      ) : (
        <Text>You're not following anyone</Text>
      )
    ) : (
      <Text>..Loading</Text>
    )}
  </View>
);

export default UserFeeds;

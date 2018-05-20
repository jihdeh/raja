import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { sliderWidth, itemWidth } from "../../Styles/SliderEntry.style";
import SliderEntry from "../../Components/SliderEntry";
import styles, { colors } from "../../Styles/SliderEntry.index";

import Styles from "../../Styles/HomeStyle";
import PStyles from "../../Styles/ProductStyle";

class ProductInfo extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const { params } = state;
    const { item } = params;
    return {
      headerTitle: item.name
    };
  };

  _renderLightItem({ item, index }) {
    return <SliderEntry data={item} even={false} />;
  }

  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  render() {
    const isTinder = "tinder";
    const { navigation } = this.props;
    const { state } = navigation;
    const { params } = state;
    const { item } = params;
    console.log(item);
    return (
      <View style={{ flex: 1 }}>
        <View style={Styles.profileContainer}>
          <TouchableHighlight style={Styles.imageContainer}>
            <Image
              style={PStyles.profileImage}
              source={{ uri: item.images[0].url }}
              resizeMode="cover"
            />
          </TouchableHighlight>
          <View style={PStyles.textWrapper}>
            <Text style={PStyles.profileName}>{item.owner.displayName}</Text>
            {item.owner.isFollowing ? (
              <TouchableHighlight>
                <Text style={PStyles.followBtn}>Unfollow</Text>
              </TouchableHighlight>
            ) : (
              <TouchableHighlight>
                <Text style={PStyles.followBtn}>Follow</Text>
              </TouchableHighlight>
            )}
          </View>
        </View>
        <View>
          <Text>Location | 100% rating</Text>
        </View>
        <View
          style={[
            styles.exampleContainer,
            isTinder
              ? styles.exampleContainerDark
              : styles.exampleContainerLight
          ]}
        >
          <Text style={[styles.title, isTinder ? {} : styles.titleDark]}>
            {item.name}
          </Text>
          <Text style={[styles.subtitle, isTinder ? {} : styles.titleDark]}>
            {item.summary}
          </Text>
          <Carousel
            data={item.images}
            renderItem={isTinder ? this._renderLightItem : this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            layout={"default"}
            loop={true}
          />
        </View>
      </View>
    );
  }
}

export default ProductInfo;

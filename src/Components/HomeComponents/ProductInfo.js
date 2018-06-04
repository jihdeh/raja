import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  AsyncStorage
} from "react-native";
import jwtDecode from "jwt-decode";
import moment from "moment/moment";
import { Icon } from "native-base";
import Carousel from "react-native-snap-carousel";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getBookmarks, bookmarkProduct } from "../../Actions/SharedAction";
import SliderEntry from "../../Components/SliderEntry";

import { sliderWidth, itemWidth } from "../../Styles/SliderEntry.style";
import styles, { colors } from "../../Styles/SliderEntry.index";
import Styles from "../../Styles/HomeStyle";
import GStyles from "../../Styles/GeneralStyle";
import PStyles from "../../Styles/ProductStyle";

class ProductInfo extends Component {
  state = {
    comment: ""
  };
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const { params } = state;
    const { item } = params;
    return {
      headerTitle: item.name
    };
  };

  async componentWillMount() {
    const { getBookmarks } = this.props;
    const value = await AsyncStorage.getItem("token");
    const decoded = jwtDecode(value);
    if (decoded) {
      getBookmarks(value);
    }
  }

  _renderLightItem({ item, index }) {
    return <SliderEntry data={item} even={false} />;
  }

  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  _submitComment() {
    // console.log(target.value);
  }

  _buyProduct() {
    //trigger buy
  }

  _bookmarkProduct = async productSlug => {
    const value = await AsyncStorage.getItem("token");
    const decoded = jwtDecode(value);
    if (decoded) {
      this.props.bookmarkProduct(productSlug, value);
    }
  };

  render() {
    const isTinder = "tinder";
    const { navigation } = this.props;
    const { state } = navigation;
    const { params } = state;
    const { item } = params;

    console.log(this.props.shared);

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={Styles.profileContainer}>
          <TouchableHighlight style={Styles.imageContainer}>
            <Image
              style={PStyles.profileImage}
              source={{ uri: item.images[0].url }}
              resizeMode="cover"
            />
          </TouchableHighlight>
          <View style={PStyles.textWrapper}>
            <View style={{ flex: 1, flexDirection: "column", margin: 10 }}>
              <Text>{item.owner.displayName}</Text>
              <Text>Location | 100% rating</Text>
            </View>
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
        <View
          style={{
            margin: 10
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text style={{ paddingTop: 10 }}>{item.name.toUpperCase()}</Text>
            <TouchableOpacity onPress={() => this._bookmarkProduct(item.slug)}>
              <Icon name="ios-bookmark-outline" />
            </TouchableOpacity>
          </View>
          {item.onSale ? (
            <Text>
              Price "On SALE": Rp{item.salePrice}{" "}
              <Text
                style={{
                  textDecorationLine: "line-through",
                  textDecorationStyle: "solid"
                }}
              >
                Rp{item.originalPrice}
              </Text>
            </Text>
          ) : (
            <Text>Price : Rp{item.originalPrice}</Text>
          )}

          <View style={PStyles.hr} />

          <View>
            <Text>Description:</Text>
            <Text style={PStyles.productInfoMore}> {item.description}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text>Information:</Text>
            <View style={PStyles.productInfoMore}>
              <View style={PStyles.productInfoMoreX}>
                <Text>Uploaded:</Text>
                <Text>{moment(item.createdAt).format("MMMM Do YYYY")}</Text>
              </View>
              <View style={PStyles.productInfoMoreX}>
                <Text>Condition:</Text>
                <Text>{item.condition}</Text>
              </View>

              <View style={PStyles.productInfoMoreX}>
                <Text>Weight:</Text>
                <Text>{item.weight}kg</Text>
              </View>

              <View style={PStyles.productInfoMoreX}>
                <Text>Delivery:</Text>
                <Text>Location to </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={this._buyProduct}
            style={[Styles.btn, GStyles.buttonContainer]}
          >
            <Text style={GStyles.buttonText}>BUY</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 20 }}>
            <Text>Comments</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={PStyles.commentInput}
              onChangeText={comment => this.setState({ comment })}
              value={this.state.comment}
            />
            <Button title="Post" onPress={this._submitComment} />
          </View>
          <View style={PStyles.hr} />
          <View style={{ marginTop: 15 }}>
            <Text>No comments yet</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  shared: state.get("shared").toJS()
});

const mapDispatchToProps = dispatch => ({
  getBookmarks: bindActionCreators(getBookmarks, dispatch),
  bookmarkProduct: bindActionCreators(bookmarkProduct, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);

import React, { Component } from 'react';
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
} from 'react-native';
import jwtDecode from 'jwt-decode';
import moment from 'moment/moment';
import { Icon } from 'native-base';
import get from 'lodash/get';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getBookmarks,
  bookmarkProduct,
  unBookmarkProduct,
  followUser,
  unFollowUser,
  successHandler,
  getFollowings
} from '../../Actions/SharedAction';
import { getCartItem, addToCart } from '../../Actions/ProductAction';
import SliderEntry from '../../Components/SliderEntry';

import { sliderWidth, itemWidth } from '../../Styles/SliderEntry.style';
import styles, { colors } from '../../Styles/SliderEntry.index';
import Styles from '../../Styles/HomeStyle';
import GStyles from '../../Styles/GeneralStyle';
import PStyles from '../../Styles/ProductStyle';

class ProductInfo extends Component {
  state = {
    comment: '',
    isLoading: false,
    isFollowing: false,
    followTrigger: false,
    isBookmarked: false
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
    const { getBookmarks, navigation } = this.props;
    const { state } = navigation;
    const { params } = state;
    const { item } = params;
    if (item.owner.isFollowing) {
      this.setState({
        isFollowing: true
      });
    }
    getBookmarks();
  }

  componentWillReceiveProps(nextProps) {
    const {
      successHandler,
      shared: { requestSuccess },
      getFollowings,
      navigation,
      shared: { bookmark }
    } = nextProps;

    const { state } = navigation;
    const { params } = state;
    const { item } = params;

    if (requestSuccess && this.state.followTrigger) {
      this.setState({
        isLoading: false,
        followTrigger: false,
        isFollowing: !this.state.isFollowing
      });
      successHandler(null, false).then(() => getFollowings());
    }
    const hasBookmark = get(bookmark, 'items');
    this._isBookmark(item, hasBookmark);
    return;
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

  _isBookmark(item, items) {
    const isBookmarked = items && items.find(bm => bm.id == item.id);
    this.setState({
      isBookmarked
    });
  }

  _buyProduct({ id: productId }) {
    //trigger buy
    const { navigation, addToCart, product: { getCart } } = this.props;
    const { state } = navigation;
    const { params } = state;
    const { item } = params;
    const isInCart =
      getCart && get(getCart, 'items').find(p => p.id === item.id);
    const newProductAddQuantity = isInCart ? null : 1;
    addToCart(getCart.id, productId, newProductAddQuantity);
    navigation.navigate('CartScreen');
  }

  _followUser(id) {
    this.setState({
      isLoading: true,
      followTrigger: true
    });
    this.props.followUser(id);
  }

  _unFollowUser(id) {
    this.setState({
      isLoading: true,
      followTrigger: true
    });
    this.props.unFollowUser(id);
  }

  _bookmarkProduct = productID => {
    this.props.bookmarkProduct(productID);
  };

  _unBookmarkProduct = productID => {
    this.props.unBookmarkProduct(productID);
  };

  render() {
    const isTinder = 'tinder';
    const {
      navigation,
      product,
      user: { userExtended: { addresses } }
    } = this.props;
    const { isBookmarked } = this.state;
    const { state } = navigation;
    const { params } = state;
    const { item } = params;
    const isInCart =
      get(product, 'getCart') &&
      get(product, 'getCart.items').find(p => p.id === item.id);
    const getDefaultAddy =
      addresses.length && addresses.find(addy => addy.isDefault);

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={Styles.profileContainer}>
          <TouchableHighlight style={Styles.imageContainer}>
            <Image
              style={PStyles.profileImage}
              source={{ uri: item.owner.photo }}
              resizeMode="cover"
            />
          </TouchableHighlight>
          <View style={PStyles.textWrapper}>
            <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
              <Text>{item.owner.displayName}</Text>
              <Text>
                {get(item, 'owner.location.address') || 'No Location'} |{' '}
                {item.meta.averageRating}% rating
              </Text>
            </View>
            {this.state.isFollowing ? (
              <TouchableHighlight
                onPress={() => this._unFollowUser(item.owner.id)}
              >
                <Text style={PStyles.followBtn}>Unfollow</Text>
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                onPress={() => this._followUser(item.owner.id)}
              >
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
            layout={'default'}
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
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{ paddingTop: 10 }}>{item.name.toUpperCase()}</Text>
            {isBookmarked ? (
              <TouchableOpacity
                onPress={() => this._unBookmarkProduct(item.id)}
              >
                <Icon name="md-bookmark" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this._bookmarkProduct(item.id)}>
                <Icon name="ios-bookmark-outline" />
              </TouchableOpacity>
            )}
          </View>
          {item.onSale ? (
            <Text>
              Price "On SALE": Rp{item.salePrice}{' '}
              <Text
                style={{
                  textDecorationLine: 'line-through',
                  textDecorationStyle: 'solid'
                }}
              >
                Rp{item.originalPrice}
              </Text>
            </Text>
          ) : (
            <Text>Price : Rp{item.salePrice}</Text>
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
                <Text>{moment(item.createdAt).format('MMMM Do YYYY')}</Text>
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
                <Text>
                  {item.owner.location.cityName} to {getDefaultAddy.cityName}
                </Text>
              </View>
            </View>
          </View>
          {!item.auction && (
            <TouchableOpacity
              onPress={() => this._buyProduct(item)}
              style={[Styles.btn, GStyles.buttonContainer]}
            >
              <Text style={GStyles.buttonText}>
                {isInCart ? 'UPDATE CART' : 'ADD TO CART'}
              </Text>
            </TouchableOpacity>
          )}
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
  shared: state.get('shared').toJS(),
  product: state.get('product').toJS(),
  user: state.get('auth').toJS()
});

const mapDispatchToProps = dispatch => ({
  getBookmarks: bindActionCreators(getBookmarks, dispatch),
  followUser: bindActionCreators(followUser, dispatch),
  unFollowUser: bindActionCreators(unFollowUser, dispatch),
  getFollowings: bindActionCreators(getFollowings, dispatch),
  getCartItem: bindActionCreators(getCartItem, dispatch),
  addToCart: bindActionCreators(addToCart, dispatch),
  successHandler: bindActionCreators(successHandler, dispatch),
  bookmarkProduct: bindActionCreators(bookmarkProduct, dispatch),
  unBookmarkProduct: bindActionCreators(unBookmarkProduct, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);

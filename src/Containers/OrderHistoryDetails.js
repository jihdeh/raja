import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Button,
  AsyncStorage
} from 'react-native'
import { bindActionCreators } from 'redux'
import Carousel from 'react-native-snap-carousel'
import moment from 'moment/moment'
import { connect } from 'react-redux'
import get from 'lodash/get'
import StarRating from 'react-native-star-rating'
import SliderEntry from '../Components/SliderEntry'
import { reviewProduct } from '../Actions/ProductAction'
import styles, { colors } from '../Styles/SliderEntry.index'
import { sliderWidth, itemWidth } from '../Styles/SliderEntry.style'
import Styles from '../Styles/OrderHistoryStyle'
import GStyles from '../Styles/GeneralStyle'
import PStyles from '../Styles/ProductStyle'

class OrderHistoryDetail extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'bought', title: 'Bought Items' },
      { key: 'sold', title: 'Sold Items' }
    ],
    starCount: 1,
    comment: '',
    isLoading: null
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isLoading: false })
  }

  _renderLightItem({ item, index }) {
    return <SliderEntry data={item} even={false} />
  }

  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />
  }

  async _submitReview({ id }) {
    const { starCount, comment } = this.state
    const { reviewProduct, user } = this.props
    this.setState({ isLoading: true })
    const { user: isAuthenticated } = user
    const token = (await AsyncStorage.getItem('token')) || isAuthenticated.token
    reviewProduct(id, { rating: starCount, comment }, token)
    // console.log(target.value);
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    })
  }

  render() {
    const isTinder = 'tinder'
    const { navigation: { state: { params: { item } } } } = this.props
    const { isLoading } = this.state
    return (
      <ScrollView>
        <Carousel
          data={[{ url: item.image }]}
          renderItem={isTinder ? this._renderLightItem : this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          layout={'default'}
          loop={true}
        />
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
          </View>
          <Text>Price : Rp{item.price}</Text>
          <Text>Quantity : {item.quantity}</Text>

          <View style={PStyles.hr} />

          <View>
            <View style={PStyles.productInfoMore}>
              <Text>Seller Name: {item.seller.username}</Text>
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text>Rating</Text>
          </View>
          <StarRating
            disabled={false}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            halfStarEnabled
            maxStars={7}
            rating={this.state.starCount}
            selectedStar={rating => this.onStarRatingPress(rating)}
            fullStarColor={'red'}
          />
          <View style={{ marginTop: 20 }}>
            <Text>Comments</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              maxLength={250}
              style={PStyles.commentInput}
              onChangeText={comment => this.setState({ comment })}
              value={this.state.comment}
            />
            <View style={{ margin: 20 }} />
            {!isLoading ? (
              <TouchableOpacity
                onPress={() => !isLoading && this._submitReview(item)}
                style={GStyles.buttonContainer}
              >
                <Text style={GStyles.buttonText}>SUBMIT REVIEW</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={GStyles.buttonContainer}>
                <ActivityIndicator size="small" color="#ffffff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  product: state.get('product').toJS(),
  user: state.get('auth').toJS()
})

const mapDispatchToProps = dispatch => ({
  reviewProduct: bindActionCreators(reviewProduct, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryDetail)

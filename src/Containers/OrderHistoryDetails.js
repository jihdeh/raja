import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions
} from 'react-native'
import { bindActionCreators } from 'redux'
import Carousel from 'react-native-snap-carousel'
import moment from 'moment/moment'
import { connect } from 'react-redux'
import get from 'lodash/get'
import SliderEntry from '../Components/SliderEntry'
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
    ]
  }

  componentDidMount() {
    console.log(this.props)
  }

  _renderLightItem({ item, index }) {
    return <SliderEntry data={item} even={false} />
  }

  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />
  }

  render() {
    const isTinder = 'tinder'
    const { navigation: { state: { params: { item } } } } = this.props
    return (
      <View>
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

          <View style={{ flex: 1 }}>
            <View style={PStyles.productInfoMore}>
              <Text>Seller Name: {item.seller.username}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default OrderHistoryDetail

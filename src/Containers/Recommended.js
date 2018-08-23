import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  AsyncStorage,
  Button
} from 'react-native'
const width = Dimensions.get('window').width
import { Icon } from 'native-base'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import get from 'lodash/get'
import RecommendedFeeds from '../Components/HomeComponents/RecommendedFeeds'

import GStyles from '../Styles/GeneralStyle'
import Styles from '../Styles/WalletStyle'

const dummyData = [
  {
    displayName: 'ladmerc',
    email: 'ladna_mekelive@yahoo.com',
    id: '5ac94d1d3359b90004ab9756',
    isFeatured: false,
    isFollowing: false,
    location: {
      isDefault: true,
      _id: '5b3ea53bf1cd600004f19a64',
      firstName: 'asm',
      lastName: 'masm',
      phone: '0292912801381830'
    },
    meta: { averageRating: 0, sellCount: 0 },
    photo: 'https://s3.eu-west-2.amazonaws.com/juli-test/profile-icon.png',
    username: 'ladmerc'
  },
  {
    displayName: 'rogers',
    email: 'jide2@gmail.com',
    id: '5b16f79378420800040c08f5',
    isFeatured: false,
    isFollowing: false,
    location: {
      isDefault: true,
      _id: '5b2ac7638f6fcd00043bbeec',
      firstName: 'Awonpere',
      lastName: 'Suffery',
      phone: '8069790405'
    },
    meta: { averageRating: 0, sellCount: 0 },
    photo: 'https://s3.eu-west-2.amazonaws.com/juli-test/profile-icon.png',
    username: 'rogers'
  }
]

class Recommended extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state

    hasParams = !params ? { header: null } : params
    return {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" style={{ color: tintColor }} />
      ),
      headerLeft: null,
      title: 'Recommended'
    }
  }

  state = {
    hasFollowedAtleast: false
  }

  async componentDidMount() {
    const { user } = this.props
    const { user: isAuthenticated } = user
  }

  hasFollowedAtleast = () => {
    this.setState({
      hasFollowedAtleast: true
    })
  }

  render() {
    const {
      user: { userExtended },
      shared: { recommendations },
      navigation
    } = this.props
    const { hasFollowedAtleast } = this.state
    console.log('--', recommendations)

    return (
      <View style={Styles.container}>
        <ScrollView>
          <View style={Styles.subContainer}>
            <View style={Styles.labelHeader}>
              <Text>
                You will need to follow at least 3 people, before you can move
                onto the next screen.
              </Text>
            </View>
          </View>
          <RecommendedFeeds
            hasFollowedAtleast={this.hasFollowedAtleast}
            recommendedFeedsList={dummyData}
          />
        </ScrollView>
        <TouchableOpacity
          onPress={() => hasFollowedAtleast && navigation.navigate('Home')}
          style={[
            Styles.topUpButton,
            {
              width: '100%',
              position: 'absolute',
              bottom: 0,
              right: 0
            }
          ]}
        >
          {hasFollowedAtleast ? (
            <Text style={GStyles.buttonText}>Go to home</Text>
          ) : (
            <Text style={GStyles.buttonText}>Follow someone atleast</Text>
          )}
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  product: state.get('product').toJS(),
  user: state.get('auth').toJS(),
  shared: state.get('shared').toJS()
})

export default connect(
  mapStateToProps,
  null
)(Recommended)

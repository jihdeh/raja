import React, { Component, Fragment } from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import get from 'lodash/get'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { selectedRecommendation, followUser } from '../../Actions/SharedAction'
const width = Dimensions.get('window').width
import Styles from '../../Styles/HomeStyle'

const _keyExtractor = (feed, index) => feed.id

class RecommendedList extends Component {
  state = {
    selection: []
  }

  onSelect = (username, id) => {
    const {
      shared: { selectedRecommendations = [] },
      onFollowUser
    } = this.props
    // let xsec = [...selectedRecommendations]
    //follow user
    // let u = xsec.concat(username)
    this.setState(({ selection }) => ({
      selection: selection.concat(username)
    }))
    onFollowUser(id)
    // this.props.onSelectRecommendations(u)
  }

  renderItem = (profile, key, selection = []) => {
    console.log(profile)
    return (
      <View
        key={key}
        style={[
          Styles.userFeedContainer,
          {
            width: width / 2 - 15,
            marginLeft: 10,
            marginTop: 10
          },
          selection.indexOf(profile.username) > -1 && {
            borderWidth: 1,
            borderColor: 'black'
          }
        ]}
      >
        <TouchableOpacity
          style={Styles.profileContainer}
          onPress={() => this.onSelect(profile.username, profile._id)}
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
        <TouchableOpacity onPress={() => this.onSelect(profile.username, profile._id)}>
          <View style={Styles.itemForSaleContainer}>
            <Image
              style={Styles.itemForSaleImage}
              source={{
                uri:
                  get(profile, 'image') ||
                  'https://i.pinimg.com/736x/69/8d/97/698d97fb72fa05f36f63b9c66402d367--sorority-house-decor-sorority-houses.jpg'
              }}
            />
            <Text style={Styles.saleTitle}>
              {get(profile, 'title') || 'House decor on fleek'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const {
      recommendedFeedsList,
      shared: { selectedRecommendations }
    } = this.props
    const { selection } = this.state
    // console.log(this.props.shared.selectedRecommendations, '-as')
    return (
      <View>
        <View style={Styles.hotListHeader}>
          <Text>Recommended people to follow</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}
        >
          {recommendedFeedsList ? (
            get(recommendedFeedsList, 'length') ? (
              <Fragment>
                {recommendedFeedsList.map((rec, key) => {
                  return this.renderItem(rec, key, selection)
                })}
              </Fragment>
            ) : (
              <Text>..Loading</Text>
            )
          ) : null}
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  shared: state.get('shared').toJS()
})

const mapDispatchToProps = dispatch => ({
  onSelectRecommendations: bindActionCreators(selectedRecommendation, dispatch), // selectedRecommendations
  onFollowUser: bindActionCreators(followUser, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendedList)

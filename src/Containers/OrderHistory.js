import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  AsyncStorage
} from 'react-native'
import { bindActionCreators } from 'redux'
import moment from 'moment/moment'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import { boughtOrderHistory, soldOrderHistory } from '../Actions/ProductAction'
import FirstRoute from '../Components/OrderHistoryComponents/FirstRoute'
import SecondRoute from '../Components/OrderHistoryComponents/SecondRoute'

import Styles from '../Styles/OrderHistoryStyle'

class OrderHistory extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'bought', title: 'Bought Items' },
      { key: 'sold', title: 'Sold Items' }
    ]
  }

  async componentDidMount() {
    const { getBoughtOrderHistory, getSoldOrderHistory, user } = this.props
    const { user: isAuthenticated } = user
    const token = (await AsyncStorage.getItem('token')) || isAuthenticated.token
    getBoughtOrderHistory(token).then(() => getSoldOrderHistory(token))
  }

  render() {
    const {
      product: { boughtOrderHistory, soldOrderHistory },
      user: { userExtended },
      navigation
    } = this.props

    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          bought: () => (
            <FirstRoute
              navigation={navigation}
              orderHistory={boughtOrderHistory}
            />
          ),
          sold: () => (
            <SecondRoute
              navigation={navigation}
              orderHistory={soldOrderHistory}
            />
          )
        })}
        renderTabBar={props => (
          <TabBar {...props} tabStyle={{ backgroundColor: '#515151' }} />
        )}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  product: state.get('product').toJS(),
  user: state.get('auth').toJS()
})

const mapDispatchToProps = dispatch => ({
  getBoughtOrderHistory: bindActionCreators(boughtOrderHistory, dispatch),
  getSoldOrderHistory: bindActionCreators(soldOrderHistory, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)

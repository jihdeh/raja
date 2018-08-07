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
const width = Dimensions.get("window").width;
import { Icon } from 'native-base';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { boughtOrderHistory, soldOrderHistory } from '../Actions/ProductAction'

import GStyles from '../Styles/GeneralStyle'
import Styles from '../Styles/WalletStyle'


class Wallet extends Component {
  state = {
  }

  async componentDidMount() {
    const { getBoughtOrderHistory, getSoldOrderHistory, user } = this.props
    const { user: isAuthenticated } = user
  }

  render() {
    const {
      user: { userExtended },
      navigation
    } = this.props

    return (
      <View style={Styles.container}>
        <View style={Styles.subContainer}>
          <View style={Styles.labelHeader}>
            <Text>Hello</Text>
            <Text>Hello</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <View style={Styles.sectionOneCurrContainer}>
              <Text style={{fontWeight: 'bold', fontSize: 30}}>1.00</Text>
              <Text>Rp</Text>
            </View>
            <TouchableOpacity style={Styles.topUpButton}>
              <Text style={GStyles.buttonText}>Top Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{borderWidth: 3, borderColor: '#e4e4e4'}} />
        <View style={{padding: 30}}>
          <View style={{width: width/2}}>
            <View style={Styles.sectionTwoMenu}>
              <Icon style={Styles.sectionTwoMenuIcon} name="md-mail" />
              <Text style={Styles.sectionTwoMenuText}>Transaction History</Text>
            </View>
            <View style={Styles.sectionTwoMenu}>
              <Icon style={Styles.sectionTwoMenuIcon} name="md-mail" />
              <Text style={Styles.sectionTwoMenuText}>Reset Juli Pin</Text>
            </View>
            <View style={Styles.sectionTwoMenu}>
              <Icon style={Styles.sectionTwoMenuIcon} name="md-mail" />
              <Text style={Styles.sectionTwoMenuText}>Top Up History</Text>
            </View>
          </View>
        </View>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)

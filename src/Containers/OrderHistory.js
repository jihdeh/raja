import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions
} from 'react-native';
import { bindActionCreators } from 'redux';
import moment from 'moment/moment';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { boughtOrderHistory, soldOrderHistory } from '../Actions/ProductAction';
import FirstRoute from '../Components/OrderHistoryComponents/FirstRoute';
import SecondRoute from '../Components/OrderHistoryComponents/SecondRoute';

import Styles from '../Styles/OrderHistoryStyle';

class OrderHistory extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'bought', title: 'Bought Items' },
      { key: 'sold', title: 'Sold Items' }
    ]
  };

  componentDidMount() {
    const { getBoughtOrderHistory, getSoldOrderHistory } = this.props;
    getBoughtOrderHistory().then(() => getSoldOrderHistory());
  }

  render() {
    const {
      product: { boughtOrderHistory, soldOrderHistory },
      user: { userExtended },
      navigation
    } = this.props;

    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          bought: () => <FirstRoute orderHistory={boughtOrderHistory} />,
          sold: () => <SecondRoute orderHistory={soldOrderHistory} />
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
    );
  }
}

const mapStateToProps = state => ({
  product: state.get('product').toJS(),
  user: state.get('auth').toJS()
});

const mapDispatchToProps = dispatch => ({
  getBoughtOrderHistory: bindActionCreators(boughtOrderHistory, dispatch),
  getSoldOrderHistory: bindActionCreators(soldOrderHistory, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);

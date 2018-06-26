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
import Accordion from 'react-native-collapsible/Accordion';
import { boughtOrderHistory, soldOrderHistory } from '../Actions/ProductAction';

import Styles from '../Styles/OrderHistoryStyle';

class FirstRoute extends Component {
  _renderHeader(section) {
    return (
      <View style={Styles.header}>
        <Text style={Styles.headerTimeTitle}>
          {moment(section.createdAt).format('MMMM Do YYYY, h:mm')}
        </Text>
        <Text>Delivery To: {get(section, 'address.address')}</Text>
        <Text>Subtotal: RP {section.totalPrice}</Text>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <ScrollView style={{ backgroundColor: '#ffffff' }}>
        {section.items.map((tlItem, key) => {
          const { name, image, price, quantity } = tlItem;
          return (
            <View key={key}>
              <View style={Styles.listOrder}>
                <View>
                  <Image source={{ uri: image }} style={Styles.logo} />
                </View>
                <View>
                  <Text>Product:= {name}</Text>
                  <Text>Amount:= Rp {price}</Text>
                  <Text>Quantity:= {quantity}</Text>
                </View>
              </View>
              <View style={Styles.horizon}>
                <View style={Styles.horizonLine} />
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  }

  render() {
    const { orderHistory } = this.props;

    return (
      <ScrollView>
        {orderHistory && orderHistory.items.length ? (
          <Accordion
            sections={orderHistory.items}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <Text>You haven't bought anything.</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

class SecondRoute extends Component {
  _renderHeader(section) {
    return (
      <View style={Styles.header}>
        <Text style={Styles.headerTimeTitle}>
          {moment(section.createdAt).format('MMMM Do YYYY, h:mm')}
        </Text>
        <Text>Delivery To: {get(section, 'address.address')}</Text>
        <Text>Subtotal: RP {section.totalPrice}</Text>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <ScrollView style={{ backgroundColor: '#ffffff' }}>
        {section.items.map((tlItem, key) => {
          const { name, image, price, quantity } = tlItem;
          return (
            <View key={key}>
              <View style={Styles.listOrder}>
                <View>
                  <Image source={{ uri: image }} style={Styles.logo} />
                </View>
                <View>
                  <Text>Product:= {name}</Text>
                  <Text>Amount:= Rp {price}</Text>
                  <Text>Quantity:= {quantity}</Text>
                </View>
              </View>
              <View style={Styles.horizon}>
                <View style={Styles.horizonLine} />
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  }

  render() {
    const { orderHistory } = this.props;
    return (
      <ScrollView>
        {orderHistory && orderHistory.items.length ? (
          <Accordion
            sections={orderHistory.items}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <Text>No sold items</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

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

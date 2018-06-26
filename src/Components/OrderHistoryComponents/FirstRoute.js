import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { bindActionCreators } from 'redux';
import moment from 'moment/moment';
import get from 'lodash/get';

import Styles from '../../Styles/OrderHistoryStyle';

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

export default FirstRoute;

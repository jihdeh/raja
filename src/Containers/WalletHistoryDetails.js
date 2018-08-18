import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Dimensions,
  Fragment,
  AsyncStorage,
  Button
} from "react-native";
const width = Dimensions.get("window").width;
import moment from "moment/moment";
import { Icon } from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import get from "lodash/get";
import { displayError } from "../Actions/ErrorAction";

import GStyles from "../Styles/GeneralStyle";
import FStyles from "../Styles/CheckoutStyle";
import LStyles from "../Styles/LoginStyle";
import Styles from "../Styles/WalletStyle";

class Wallet extends Component {

  state = {
    togglePayment: false,
    isLoading: false,
    amount: "0"
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    hasParams = !params ? { header: null } : params;
    return {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" style={{ color: tintColor }} />
      ),
      title: "TopUp History"
    };
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.shared.requestSuccess) {
      this.setState({
        togglePayment: !this.state.togglePayment
      });
    }
  }

  trunc(text) {
    return text.length > 20 ? `${text.substr(0, 20)}...` : text;
  }

  render() {
    const {
      user: { userExtended },
      navigation: {
        state: {
          params: { hasMore, items = [] }
        }
      },
      shared: { showSpinner, walletAmount }
    } = this.props;

    return (
      <ScrollView style={Styles.container}>
        {items.length ? items.map((item, key) => {
          return (
            <View key={key}>
              <View style={Styles.detailsAlign}>
                <Text>Title:</Text>
                <Text>{item.name}</Text>
              </View>
              <View style={Styles.detailsAlign}>
                <Text>Amount:</Text>
                <Text>{item.amount}</Text>
              </View>
              <View style={Styles.detailsAlign}>
                <Text>Payment Verified:</Text>
                <Text>{item.isPaid ? "Yes" : "No"}</Text>
              </View>
              <View style={Styles.detailsAlign}>
                <Text>Payment Info:</Text>
                <Text>{this.trunc(item.paymentInfo)}</Text>
              </View>
              <View style={Styles.detailsAlign}>
                <Text>Payment Type:</Text>
                <Text>{item.paymentType}</Text>
              </View>
              <View style={Styles.detailsAlign}>
                <Text>Payment Method:</Text>
                <Text>{item.paymentMethod}</Text>
              </View>
              <View style={Styles.detailsAlign}>
                <Text>
                  Created:
                </Text>
                <Text>{moment(item.createdAt)
                    .startOf("hour")
                    .fromNow()}</Text>
              </View>
              <View style={{ borderWidth: 0.5, borderColor: "#e4e4e4" }} />
            </View>
          );
        }) : <View><Text>Nothing to show yet, try again.</Text></View>}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  shared: state.get("shared").toJS(),
  user: state.get("auth").toJS()
});

const mapDispatchToProps = dispatch => ({
  displayError: bindActionCreators(displayError, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);

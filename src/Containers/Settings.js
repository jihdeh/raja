import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Switch,
  Image,
  StyleSheet,
  TextInput,
  AsyncStorage
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import get from "lodash/get";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { logout } from "../Actions/AuthAction";

class Settings extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    hasParams = !params ? { header: null } : params;
    return {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" style={{ color: tintColor }} />
      ),
      title: "Overview"
    };
  };

  onLogout = () => {
    AsyncStorage.clear();
    this.props.logout();
    this.props.navigation.navigate("Landing");
  };

  render() {
    const {
      navigation,
      user: { userExtended, updateProfile }
    } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.stage}>
        <TableView>
          <Section header="SETTINGS & MORE" footer="Juli mobile. &copy;2018">
            <Cell
              cellStyle="Basic"
              title="Order History"
              accessory="DisclosureIndicator"
              onPress={() => navigation.navigate("OrderHistoryScreen")}
            />
            {(get(updateProfile, "addresses.length") ||
              get(userExtended, "addresses.length")) && (
              <Cell
                cellStyle="Basic"
                title="View Addresses"
                accessory="DisclosureIndicator"
                onPress={() => navigation.navigate("AddressScreen")}
              />
            )}
            <Cell
              cellStyle="Basic"
              title="Edit Profile"
              accessory="DisclosureIndicator"
              onPress={() => navigation.navigate("EditProfile")}
            />
            <Cell
              cellStyle="Basic"
              title="Update Password"
              accessory="DisclosureIndicator"
              onPress={() => navigation.navigate("UpdatePassword")}
            />
            <Cell
              cellStyle="Basic"
              title="Update Address"
              accessory="DisclosureIndicator"
              onPress={() => navigation.navigate("UpdateAddress")}
            />

            <Cell cellStyle="Basic" title="Logout" onPress={this.onLogout} />
          </Section>
        </TableView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  stage: {
    backgroundColor: "#EFEFF4",
    paddingBottom: 20
  }
});

const mapStateToProps = state => ({
  user: state.get("auth").toJS()
});

const mapDispatchToProps = dispatch => {
  return {
    logout: bindActionCreators(logout, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);

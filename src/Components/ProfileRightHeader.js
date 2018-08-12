import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Icon } from "native-base";
import GStyles from "../Styles/GeneralStyle";

class RightHeader extends Component {
  onProfileClick = () => {
    const {
      navigation,
      user: { userExtended }
    } = this.props;
    navigation.setParams({
      followingProfile: false,
      username: userExtended.username
    });
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={GStyles.headerRightContainer}>
        <TouchableOpacity onPress={this.onProfileClick}>
          <Icon style={GStyles.headerRightIcon} name="ios-contact-outline" />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.get("auth").toJS()
});

export default connect(mapStateToProps)(RightHeader);

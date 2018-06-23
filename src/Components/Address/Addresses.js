import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import CheckBox from "react-native-check-box";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import LStyles from "../../Styles/AddressStyle";

export default class Addresses extends Component {
  state = {
    edit: false,
    selected: false,
    location: this.props.location
  };
  render() {
    const { edit, selected, location } = this.state;
    return (
      <View style={LStyles.itemCont}>
        <View style={LStyles.check}>
          <View style={LStyles.divis}>
            <CheckBox
              style={LStyles.myCheckBox}
              onClick={() => this.setState({ selected: !selected })}
              isChecked={selected}
              checkedImage={
                <FontAwesome name="dot-circle-o" size={30} color="#6c63c0" />
              }
              unCheckedImage={
                <FontAwesome name="circle-o" size={30} color="#6c63c0" />
              }
            />
          </View>
          {edit ? null : (
            <View style={LStyles.divis}>
              <Ionicons name="ios-home" size={40} color="grey" />
            </View>
          )}
          <View style={LStyles.moreDetails}>
            <Text style={LStyles.loc}>SEND TO</Text>
            {edit ? (
              <TextInput
                placeholder={location}
                value={location}
                onChange={location => this.setState({ location })}
                numberOfLines={4}
                editable={true}
                multiline={true}
              />
            ) : (
              <Text numberOfLines={1} style={selected ? LStyles.lbl : {}}>
                {location}
              </Text>
            )}
          </View>
        </View>

        <View style={LStyles.editor}>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                edit: !edit
              })
            }
          >
            <MaterialIcons name="edit" size={22} color="grey" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Addresses.defaultProps = {
  location: "Alma 2,Richmond Gate,Estate"
};

import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from 'react-native';
import CheckBox from 'react-native-check-box';
import get from 'lodash/get';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProfile, getLoggedUserProfile } from '../../Actions/AuthAction';
import LStyles from '../../Styles/AddressStyle';

class Addresses extends Component {
  state = {
    edit: false,
    addyId: null,
    location: this.props.location
  };

  componentWillReceiveProps(nextProps) {
    const { user, address } = nextProps;
    const { addyId } = this.state;
    const getUpdatedAddy =
      (get(user, 'updateProfile') &&
        get(user, 'updateProfile.addresses').find(addy => addy.isDefault)) ||
      address;
    if (addyId !== getUpdatedAddy.address) {
      this.setState({
        addyId: getUpdatedAddy
      });
    }
  }

  onSelect({ id }) {
    const { onUpdateProfile } = this.props;
    onUpdateProfile({ address: { isDefault: true, id } });
  }

  dumfunc = () => true;

  render() {
    const { edit, addyId, location } = this.state;
    const { address } = this.props;

    return (
      <View>
        <TouchableOpacity onPress={() => this.onSelect(address)}>
          <View style={LStyles.itemCont}>
            <View style={LStyles.check}>
              <View style={LStyles.divis}>
                {get(addyId, 'isDefault') &&
                get(addyId, 'address') === address.address ? (
                  <CheckBox
                    style={LStyles.myCheckBox}
                    onClick={this.dumfunc}
                    isChecked={addyId.isDefault}
                    disabled
                    checkedImage={
                      <FontAwesome
                        name="dot-circle-o"
                        size={30}
                        color="#6c63c0"
                      />
                    }
                    unCheckedImage={
                      <FontAwesome name="circle-o" size={30} color="#6c63c0" />
                    }
                  />
                ) : (
                  <CheckBox
                    style={LStyles.myCheckBox}
                    onClick={this.dumfunc}
                    disabled
                    checkedImage={
                      <FontAwesome
                        name="dot-circle-o"
                        size={30}
                        color="#6c63c0"
                      />
                    }
                    unCheckedImage={
                      <FontAwesome name="circle-o" size={30} color="#6c63c0" />
                    }
                  />
                )}
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
                    placeholder={address.address}
                    value={address.address}
                    onChange={location => this.setState({ location })}
                    numberOfLines={4}
                    editable={true}
                    multiline={true}
                  />
                ) : (
                  <Text
                    numberOfLines={1}
                    style={
                      get(addyId, 'isDefault') &&
                      get(addyId, 'address') === address.address
                        ? LStyles.lbl
                        : {}
                    }
                  >
                    {address.address}
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
        </TouchableOpacity>
      </View>
    );
  }
}

Addresses.defaultProps = {
  location: 'Alma 2,Richmond Gate,Estate'
};

const mapStateToProps = state => ({
  user: state.get('auth').toJS()
});

const mapDispatchToProps = dispatch => ({
  onUpdateProfile: bindActionCreators(updateProfile, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Addresses);

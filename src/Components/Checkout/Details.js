import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import FStyles from '../../Styles/CheckoutStyle';

const Details = ({ addresses, navigation }) => {
  const getDefaultAddy =
    addresses.length && addresses.find(addy => addy.isDefault);
  console.log(getDefaultAddy);

  return (
    <View style={FStyles.contOne}>
      {addresses.length ? (
        <View>
          <View style={FStyles.detailOne}>
            <View style={FStyles.lblHeader}>
              <Text style={FStyles.lbltitle}>Receiver Name</Text>
            </View>
            <Text style={FStyles.lbl}>
              {getDefaultAddy.firstName} {getDefaultAddy.lastName}
            </Text>
          </View>
          <View style={FStyles.detailOne}>
            <View style={FStyles.lblHeader}>
              <Text style={FStyles.lbltitle}>Address</Text>
              <TouchableOpacity>
                <Text style={FStyles.lblevnt}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text style={FStyles.lbl}>{getDefaultAddy.address}</Text>
            <Text style={FStyles.lbl}>
              {getDefaultAddy.cityName}, {getDefaultAddy.provinceName}
            </Text>
          </View>
        </View>
      ) : (
        <View style={FStyles.detailOne}>
          <View>
            <View style={FStyles.lblHeader}>
              <Text style={FStyles.lbltitle}>Address</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SettingsScreen')}
              >
                <Text style={FStyles.lblevnt}>Click to Add new</Text>
              </TouchableOpacity>
            </View>
            <Text style={FStyles.lbl}>You have no Address</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Details;

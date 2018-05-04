import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Styles from "../../Styles/ProductOverview";
import GStyles from "../../Styles/GeneralStyle";

class ProductOverview extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Product Overview",
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={GStyles.icon}
            source={require("../../../assets/backArrow.png")}
          />
        </TouchableOpacity>
      )
    };
  };

  renderImage(item, i) {
    return <Image style={Styles.image} source={{ uri: item.file }} key={i} />;
  }

  render() {
    const { navigation } = this.props;
    const { state } = navigation;
    const { params } = state;
    console.log(navigation.state.params);
    return (
      <ScrollView>
        <View style={GStyles.hotListHeader}>
          <Text>Product Image(s)</Text>
        </View>
        <View style={Styles.imageContainer}>
          {params.photos.map((item, i) => this.renderImage(item, i))}
        </View>
        <View style={GStyles.hotListHeader}>
          <Text>Product Information</Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>Title:</Text>
          <Text style={Styles.rightEnd}>{params.titleInput}</Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>Description:</Text>
          <Text style={Styles.rightEnd}>{params.descriptionInput}</Text>
        </View>
      </ScrollView>
    );
  }
}

export default ProductOverview;

import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import moment from "moment/moment";
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
        <View style={Styles.productInformation}>
          <Text>Category:</Text>
          <Text style={Styles.rightEnd}>{params.productCategory}</Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>Sub Category:</Text>
          <Text style={Styles.rightEnd}>{params.productSubCategory}</Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>Product Condition:</Text>
          <Text style={Styles.rightEnd}>{params.productQualityType}</Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>Product Weight:</Text>
          <Text style={Styles.rightEnd}>{params.productWeight}kg</Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>Selling at:</Text>
          <Text style={Styles.rightEnd}>
            ${params.selectedSellType === "fixed"
              ? params.fixedPrice
              : params.targetPrice}
          </Text>
        </View>
        {params.selectedSellType === "auction" && (
          <View style={Styles.productInformation}>
            <Text>Auction Ends on:</Text>
            <Text style={Styles.rightEnd}>
              {moment(params.targetDate).format("MMMM Do YYYY, h:mm:ss a")}
            </Text>
          </View>
        )}
        <View style={Styles.productInformation}>
          <Text>Delivery Method:</Text>
          <Text style={Styles.rightEnd}>{params.deliveryMethod}</Text>
        </View>
        <TouchableOpacity onPress={this.onNext} style={GStyles.buttonContainer}>
          <Text style={GStyles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default ProductOverview;

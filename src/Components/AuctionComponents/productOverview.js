import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from "react-native";
import moment from "moment/moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createProduct } from "../../Actions/ProductAction";
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

  onSubmit = async () => {
    const { navigation } = this.props;
    const { state } = navigation;
    const { params } = state;
    const token = await AsyncStorage.getItem("token");
    console.log(token);

    this.props.createProduct({ ...params }, token);
  };

  render() {
    const { navigation } = this.props;
    const { state } = navigation;
    const { params } = state;
    return (
      <ScrollView>
        <View style={GStyles.hotListHeader}>
          <Text>Product Image(s)</Text>
        </View>
        <View style={Styles.imageContainer}>
          {params.images.map((item, i) => this.renderImage(item, i))}
        </View>
        <View style={GStyles.hotListHeader}>
          <Text>Product Information</Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>Title:</Text>
          <Text style={Styles.rightEnd}>{params.name}</Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>Description:</Text>
          <Text style={Styles.rightEnd}>{params.description}</Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>Category:</Text>
          <Text style={Styles.rightEnd}>{params.category}</Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>Sub Category:</Text>
          <Text style={Styles.rightEnd}>{params.productSubCategory}</Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>Product Condition:</Text>
          <Text style={Styles.rightEnd}>{params.condition}</Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>Product Weight:</Text>
          <Text style={Styles.rightEnd}>{params.productWeight}kg</Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>Selling at:</Text>
          <Text style={Styles.rightEnd}>
            ${params.saleFormat === "fixed"
              ? params.salePrice
              : params.targetPrice}
          </Text>
        </View>
        {params.saleFormat === "auction" && (
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
        <TouchableOpacity
          onPress={this.onSubmit}
          style={GStyles.buttonContainer}
        >
          <Text style={GStyles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  product: state.get("product")
});

const mapDispatchToProps = dispatch => ({
  createProduct: bindActionCreators(createProduct, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductOverview);

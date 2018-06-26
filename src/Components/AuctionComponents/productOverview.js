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
          <Text>Image(s)</Text>
        </View>
        <View style={Styles.imageContainer}>
          {params.images.map((item, i) => this.renderImage(item, i))}
        </View>
        <View style={GStyles.hotListHeader}>
          <Text>Information</Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>Title:</Text>
          <Text style={Styles.rightEnd}>{params.name}</Text>
        </View>
        {/* <View style={Styles.productInformation}>
          <Text>Summary:</Text>
          <Text style={Styles.rightEnd}>{params.summary}</Text>
        </View> */}
        <View style={Styles.productInformation}>
          <Text>Description:</Text>
          <Text style={Styles.rightEnd}>{params.description}</Text>
        </View>
        {/* <View style={Styles.productInformation}>
          <Text>Brand:</Text>
          <Text style={Styles.rightEnd}>{params.brand || 'Generic' }</Text>
        </View> */}
        <View style={Styles.productInformation}>
          <Text>Category:</Text>
          <Text style={Styles.rightEnd}>{params.category}</Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>Condition:</Text>
          <Text style={Styles.rightEnd}>{params.condition}</Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>Weight:</Text>
          <Text style={Styles.rightEnd}>{params.weight}kg</Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>Quantity:</Text>
          <Text style={Styles.rightEnd}>{params.quantity}kg</Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>{params.saleFormat === "fixed" ? 
            'Sale Price' : 'Target Price'}:</Text>
          <Text style={Styles.rightEnd}>
            Rp{params.saleFormat === "fixed"
              ? params.salePrice
              : params.targetPrice}
          </Text>
        </View>
        {/* params.saleFormat === "fixed" &&
          <React.Fragment>
            <View style={Styles.productInformation}>
              <Text>On Sale:</Text>
              <Text style={Styles.rightEnd}>
                Yes
              </Text>
            </View>
            { params.onSale && 
              <View style={Styles.productInformation}>
                <Text>Original Price:</Text>
                <Text style={Styles.rightEnd}>
                  {params.originalPrice}
                </Text>
              </View>
            }
          </React.Fragment>
        */}
        
        {params.saleFormat === "auction" && (
          <React.Fragment>
            <View style={Styles.productInformation}>
              <Text>Auction Ends:</Text>
              <Text style={Styles.rightEnd}>
                {moment(params.auctionEnd).format("MMMM Do YYYY, h:mm a")}
              </Text>
            </View>

            <View style={Styles.productInformation}>
              <Text>Show Auction Target:</Text>
              <Text style={Styles.rightEnd}>
                {params.showAuctionTarget ? 'Yes': 'No'}
              </Text>
            </View>
          </React.Fragment>
        )}
        {/* {
          params.isBundle &&
          <View style={Styles.productInformation}>
            <Text>This is a bundle:</Text>
            <Text style={Styles.rightEnd}>Yes</Text>
          </View>
        }
        <View style={Styles.productInformation}>
          <Text>Active:</Text>
          <Text style={Styles.rightEnd}>{params.isActive ? 'Yes' : 'No'}</Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>In Stock:</Text>
          <Text style={Styles.rightEnd}>{params.inStock ? 'Yes' : 'No'}</Text>
        </View> */}
        <View style={Styles.productInformation}>
          <Text>Delivery Method:</Text>
          <Text style={Styles.rightEnd}>
            {params.courierDelivery ? 'Courier' : ''} 
            {params.courierDelivery && params.selfDelivery ? ', ' : ''}
            {params.selfDelivery  ?  'Self' : ''} 
          </Text>
        </View>
        <View style={Styles.productInformation}>
          <Text>Product Location:</Text>
          <Text style={Styles.rightEnd}>
            {''}
          </Text>
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

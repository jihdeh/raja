import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment/moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createProduct, clearProduct } from '../../Actions/ProductAction';
import Styles from '../../Styles/ProductOverview';
import GStyles from '../../Styles/GeneralStyle';

class ProductOverview extends Component {
  state = {
    isLoading: false
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Product Overview',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={GStyles.icon}
            source={require('../../../assets/backArrow.png')}
          />
        </TouchableOpacity>
      )
    };
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.product.product && !this.props.product.product) {
      this.props.navigation.navigate('ProductInfo', {
        item: nextProps.product.product
      });
      this.props.clearProduct()
    }
  }

  renderImage(item, i) {
    return <Image style={Styles.image} source={{ uri: item.file }} key={i} />;
  }

  onSubmit = async () => {
    const { navigation } = this.props;
    const { state } = navigation;
    const { params } = state;
    const token = await AsyncStorage.getItem('token');

    this.props.createProduct({ ...params }, token);
  };

  getLocationText = id => {
    if (!this.props.user) return '';
    const location = this.props.user.userExtended.addresses.find(
      a => a.id === id
    );
    if (location) return location.address;
  };

  render() {
    const { navigation, shared: { showSpinner } } = this.props;
    const { state } = navigation;
    const { params } = state;

    return (
      <ScrollView>
        <Spinner visible={showSpinner} textContent={"Please wait..."} textStyle={{color: '#333'}} />
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
          <Text>
            {params.saleFormat === 'fixed' ? 'Sale Price' : 'Target Price'}:
          </Text>
          <Text style={Styles.rightEnd}>
            Rp{params.saleFormat === 'fixed'
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

        {params.saleFormat === 'auction' && (
          <React.Fragment>
            <View style={Styles.productInformation}>
              <Text>Auction Ends:</Text>
              <Text style={Styles.rightEnd}>
                {moment(params.auctionEnd).format('MMMM Do YYYY, h:mm a')}
              </Text>
            </View>

            <View style={Styles.productInformation}>
              <Text>Show Auction Target:</Text>
              <Text style={Styles.rightEnd}>
                {params.showAuctionTarget ? 'Yes' : 'No'}
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
            {params.selfDelivery ? 'Self' : ''}
          </Text>
        </View>
        {params.courierDelivery && (
          <View style={Styles.productInformation}>
            <Text>Couriers:</Text>
            <Text style={Styles.rightEnd}>
              {params.couriers.map(c => c.name).join(', ')}
            </Text>
          </View>
        )}
        <View style={Styles.productInformation}>
          <Text>Product Location:</Text>
          <Text style={Styles.rightEnd}>
            {this.getLocationText(params.location)}
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
  product: state.get('product').toJS(),
  shared: state.get('shared').toJS(),
  user: state.get('auth').toJS()
});

const mapDispatchToProps = dispatch => ({
  createProduct: bindActionCreators(createProduct, dispatch),
  clearProduct: bindActionCreators(clearProduct, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductOverview);

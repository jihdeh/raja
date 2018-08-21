import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';
import {
  RkText,
  RkButton,
  RkModalImg
} from 'react-native-ui-kitten';
import HStyles from '../../Styles/HomeStyle'
import { formatPrice } from '../../utils/formatter';
// import {Ellipsis} from './ellipsis';
// import {SocialBar} from './socialBar'

export class ProductList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  _renderHeader(options) {
    return (
      <View style={styles.header}>
        <RkButton rkType='clear contrast' onPress={options.closeImage}>Close</RkButton>
        <RkText rkType='header4'>{`${options.pageNumber}/${options.totalPages}`}</RkText>
        <RkButton rkType='clear'>
          {/* <Ellipsis/> */}
        </RkButton>
      </View>
    );
  }

  _renderFooter(options) {
    return (
      <SocialBar/>
    );
  }

  emptyProducts() {
    return (
      <View>
        <Text>You have not uploaded any product</Text>
        {/* TODO: tap here */}
      </View>
    )
  }

  progressIndicator() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 50
      }}>
        <ActivityIndicator size='large' color='#6c757d'/>
      </View>
    )
  }

  render() {
    const { products, navigation } = this.props;
    if (!products || !products.items) return this.progressIndicator();
    if (!products.items.length) return this.emptyProducts();

    const numColumns = 2;

    const size = (Dimensions.get('window').width - 12 ) / numColumns;


    return (
      <View style={styles.products}>
        <FlatList
          data={products.items}
          keyExtractor={item => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.products}
          renderItem={({ item, index }) => {
            return (
              <View style={{ flex: 1}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProductInfo', { item })}>
                  <View>
                  {/* <View style={HStyles.listsContainer}> */}
                    <Image
                      resizeMethod="resize"
                      style={{width: size, height: size}}
                      source={{ uri: item.images[0].url }}
                    />

                    <Text
                      style={HStyles.saleTitle}
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                    >
                      {item.name}
                    </Text>
                    {item.saleFormat !== 'auction' && (
                      <Text style={HStyles.saleAmount}>{formatPrice(item.salePrice)}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              // <RkModalImg
              //   style={{width: size, height: size}}
              //   renderHeader={this._renderHeader}
              //   // renderFooter={this._renderFooter}
              //   source={{ uri: item }}
              //   index={index}/>
            )
          }}/>
      </View>)
  }
}

let styles = StyleSheet.create({
  products: {
    paddingHorizontal: 0.5
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default ProductList;
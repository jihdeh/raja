import React from 'react';
import { connect } from "react-redux";
import {
  View,
  ScrollView,
  Image
} from 'react-native';
import {
  RkText,
  RkButton, RkStyleSheet
} from 'react-native-ui-kitten';
import { Icon } from 'native-base';
import Avatar from './Avatar';
import ProductList from './ProductList';
import { formatNumber } from '../../utils/formatter';

export class ProfileV1 extends React.Component {
  static navigationOptions = {
    title: 'User Profile'.toUpperCase()
  };

  constructor(props) {
    super(props);
    // let {params} = this.props.navigation.state;
    // let id = params ? params.id : 1;
    this.user = this.props.user;
  }

  render() {
    const { user, products, navigation } = this.props;
    const currentUser = user || { meta: {}};
    let name = `${currentUser.firstName} ${currentUser.lastName}`;
    let images = currentUser.images;
    return (
      <ScrollView style={styles.root}>
        <View style={[styles.header, styles.bordered]}>
          <View style={[styles.row]}>
            <View style={[styles.buttons]}>
              <Icon style={[styles.button]}
                onPress={() => navigation.navigate("BookmarkScreen")}
                name="ios-bookmark"
              />
            </View>
            <Avatar img={currentUser.photo} rkType='small' style={{flex: 1, textAlign: 'center'}}/>
            <View style={[styles.buttons]}>
              <Icon style={[styles.button]} 
                onPress={() => navigation.navigate('ChatListScreen')}
                name="md-mail" 
              />
            
            </View>
          </View>
          <View style={[styles.section]}>
            <RkText rkType='xlarge' style={{fontSize: 20, fontWeight: 'bold'}}>{currentUser.username || '-'}</RkText>
          </View>
        </View>
        <View style={[styles.userInfo, styles.bordered]}>
          <View style={styles.section}>
            <RkText rkType='header' style={styles.space}>{currentUser.productsCount || '-'}</RkText>
            <RkText rkType='secondary1 hintColor subtitle small'>Listings</RkText>
          </View>
          <View style={styles.section}>
            <RkText rkType='header' style={styles.space}>{formatNumber(currentUser.followersCount) || '-'}</RkText>
            {/* <RkText rkType='header' style={styles.space}>{formatNumber(currentUser.followersCount)}</RkText> */}
            <RkText rkType='secondary1 hintColor subtitle small'>Followers</RkText>
          </View>
          <View style={styles.section}>
            <RkText rkType='header' style={styles.space}>
              {currentUser.meta.averageRating ? currentUser.meta.averageRating + '%' : '-'}
            </RkText>
            <RkText rkType='secondary1 hintColor subtitle small'>Rating</RkText>
          </View>
        </View>
        {/* <View style={styles.buttons}>
        </View> */}
        <View >
          <ProductList products={products} navigation={navigation}/>
        </View>
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  header: {
    paddingTop: 25,
    // alignItems: 'center',
    paddingBottom: 17
  },
  row: {
    flexDirection: 'row',
  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base
  },
  section: {
    flex: 1,
    alignItems: 'center'
  },
  space: {
    marginBottom: 3
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 0,
    width: 1,
    height: 42
  },
  buttons: {
    flex: 1
  },
  button: {
    marginTop: 27.5,
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: 'bold'
  }
}));


const mapStateToProps = state => ({
  products: state.get("product").toJS().profileProducts,
  user: state.get("auth").toJS().userExtended,
  shared: state.get("shared").toJS()
});

export default connect(
  mapStateToProps
)(ProfileV1);

import React, { Component } from "react";
import { View, Text, FlatList, Image, ScrollView } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getCategories } from "../../Actions/SharedAction";
import { getProducts } from "../../Actions/ProductAction";

import { Container, Content, Icon } from "native-base";
import HotLists from "../HomeComponents/HotLists";
import UserFeeds from "../HomeComponents/UserFeeds";
import Styles from "../../Styles/HomeStyle";
import GStyles from "../../Styles/GeneralStyle";

const userFeedsList = [
  {
    id: 1,
    profile: {
      name: "Josh",
      image:
        "https://vignette.wikia.nocookie.net/gumball/images/f/fc/Gumball.png/revision/latest?cb=20140110222931&path-prefix=pl"
    },
    itemForSale: {
      image:
        "https://i.pinimg.com/736x/69/8d/97/698d97fb72fa05f36f63b9c66402d367--sorority-house-decor-sorority-houses.jpg",
      amount: "$20",
      title: "House decor on fleek"
    }
  },
  {
    id: 2,
    profile: {
      name: "Saleem",
      image:
        "https://vignette.wikia.nocookie.net/elincreiblemundodegumball/images/2/2b/Anais_3.png/revision/latest?cb=20161221204441&path-prefix=es"
    },
    itemForSale: {
      image:
        "https://i.pinimg.com/736x/69/8d/97/698d97fb72fa05f36f63b9c66402d367--sorority-house-decor-sorority-houses.jpg",
      amount: "$20",
      title: "House decor on fleek"
    }
  },
  {
    id: 3,
    profile: {
      name: "Kaaleed",
      image:
        "https://vignette.wikia.nocookie.net/theregularshow/images/d/dd/Rigby.png/revision/latest?cb=20150806170856"
    },
    itemForSale: {
      image:
        "http://www.cuttingedgestencils.com/images/big/Coral-beach-house-decor-stencil.jpg",
      amount: "$220",
      title: "House decor on fleek"
    }
  },
  {
    id: 4,
    profile: {
      name: "Fresh",
      image:
        "https://vignette.wikia.nocookie.net/theregularshow/images/a/a7/250px-Mordecai_Character_Original.png/revision/latest?cb=20150806171309"
    },
    itemForSale: {
      image:
        "https://i.pinimg.com/736x/69/8d/97/698d97fb72fa05f36f63b9c66402d367--sorority-house-decor-sorority-houses.jpg",
      amount: "$420",
      title: "House decor on fleek"
    }
  }
];

class HomeTab extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    hasParams = !params ? { header: null } : params;
    return {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" style={{ color: tintColor }} />
      ),
      headerLeft: <Icon name="ios-cash-outline" style={{ paddingLeft: 10 }} />,
      headerRight: (
        <View style={GStyles.headerRightContainer}>
          <Icon style={GStyles.headerRightIcon} name="ios-bookmark-outline" />
          <Icon style={GStyles.headerRightIcon} name="md-mail" />
        </View>
      )
    };
  };

  componentDidMount() {
    this.props.getCategories();
    this.props
      .getProducts("onSale")
      .then(() => this.props.getProducts("isTrending"))
      .then(() => this.props.getProducts("isFeatured"));
  }

  render() {
    const { navigation, products } = this.props;
    const hasFetchedProducts = products && products.toJS();

    return (
      <View>
        <ScrollView>
          <HotLists
            hotListsItems={hasFetchedProducts}
            navigation={navigation}
          />
          <UserFeeds userFeedsList={userFeedsList} navigation={navigation} />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  shared: state.get("shared"),
  products: state.get("product")
});

const mapDispatchToProps = dispatch => {
  return {
    getCategories: bindActionCreators(getCategories, dispatch),
    getProducts: bindActionCreators(getProducts, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab);

import React, { Component } from "react";
import { View, Text, FlatList, Image, ScrollView } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Container, Content, Icon } from "native-base";
import HotLists from "../HomeComponents/HotLists";
import UserFeeds from "../HomeComponents/UserFeeds";
import Styles from "../../Styles/HomeStyle";

const hotListsItems = [
  {
    id: 1,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Lhasa_scene.jpg/200px-Lhasa_scene.jpg",
    title: "McLauren Stops Caux",
    amount: "$1200"
  },
  {
    id: 2,
    image:
      "https://render.fineartamerica.com/images/images-new-artwork/images/artworkimages/medium/1/the-inexplicable-ignition-of-time-expanding-into-free-space-phase-two-number-18-m-mellon.jpg",
    title: "Gucci Rompers",
    amount: "$200"
  },
  {
    id: 3,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Lhasa_scene.jpg/200px-Lhasa_scene.jpg",
    title: "Versace coveralls",
    amount: "$1092"
  },
  {
    id: 4,
    image:
      "https://render.fineartamerica.com/images/images-new-artwork/images/artworkimages/medium/1/the-inexplicable-ignition-of-time-expanding-into-free-space-phase-two-number-18-m-mellon.jpg",
    title: "McLauren Stops Caux Elements",
    amount: "$300"
  },
  {
    id: 5,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Lhasa_scene.jpg/200px-Lhasa_scene.jpg",
    title: "McLauren Stops Caux",
    amount: "$1029"
  },
  {
    id: 6,
    image:
      "https://render.fineartamerica.com/images/images-new-artwork/images/artworkimages/medium/1/the-inexplicable-ignition-of-time-expanding-into-free-space-phase-two-number-18-m-mellon.jpg",
    title: "McLauren Stops Caux",
    amount: "$120"
  }
];

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
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ color: tintColor }} />
    )
  };

  render() {
    return (
      <ScrollView>
        <HotLists hotListsItems={hotListsItems} />
        <UserFeeds userFeedsList={userFeedsList} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  user: state
});

export default connect(mapStateToProps)(HomeTab);

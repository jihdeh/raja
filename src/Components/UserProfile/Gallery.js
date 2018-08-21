import React from 'react';
import {
  View,
  Text,
  ListView,
  FlatList,
  Dimensions,
  StyleSheet
} from 'react-native';
import {
  RkText,
  RkButton,
  RkModalImg
} from 'react-native-ui-kitten';
// import {Ellipsis} from './ellipsis';
// import {SocialBar} from './socialBar'

export class Gallery extends React.Component {

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

  render() {
    const images = [
      'https://juli-test.s3.eu-west-2.amazonaws.com/5ac94d1d3359b90004ab9756/images/products/-1532867128280-7t8rb0.png',
      'https://juli-test.s3.eu-west-2.amazonaws.com/5ac94d1d3359b90004ab9756/images/products/-1530711080882-ke222t.png',
      'https://juli-test.s3.eu-west-2.amazonaws.com/5ac94d1d3359b90004ab9756/images/products/-1532866767086-qxq34z.png',
      'https://juli-test.s3.eu-west-2.amazonaws.com/5ac94d1d3359b90004ab9756/images/products/-1530709445408-h0oq9n.png'
    ]
    let size = (Dimensions.get('window').width - 12 ) / 3;
    return (
      <View style={styles.images}>
        <FlatList
          data={images}
          keyExtractor={(item, index) => index}
          numColumns={3}
          contentContainerStyle={styles.images}
          renderItem={({ item, index }) => {
            return (
              <RkModalImg
                style={{width: size, height: size}}
                renderHeader={this._renderHeader}
                // renderFooter={this._renderFooter}
                source={{ uri: item }}
                index={index}/>
            )
          }}/>
      </View>)
  }
}

let styles = StyleSheet.create({
  images: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 0.5
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
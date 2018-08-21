import React from 'react';
import {
  Image,
  View
} from 'react-native';
import {
  RkComponent,
  RkText,
  RkTheme
} from 'react-native-ui-kitten';
// import {FontAwesome} from '../../assets/icons';

export class Avatar extends RkComponent {
  componentName = 'Avatar';
  typeMapping = {
    container: {},
    image: {},
    badge: {},
    badgeText: {}
  };

  constructor(props) {
    super(props);
  }

  renderImg(styles) {
    let {image, badge, badgeText} = styles;
    return (
      <View>
        <Image style={
          {
            alignSelf: 'flex-start',
            width: 80,
            height: 80,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            borderRadius: 50
          }
        }
          source={{ uri: this.props.img }}/>
        {/* { this.props.badge && this.renderBadge(badge, badgeText)} */}
      </View>
    )
  }

  renderBadge(style, textStyle) {
    let symbol;
    let backgroundColor;
    let color;

    switch (this.props.badge) {
      case 'like':
        symbol = FontAwesome.heart;
        backgroundColor = RkTheme.current.colors.badge.likeBackground;
        color = RkTheme.current.colors.badge.likeForeground;
        break;
      case 'follow':
        symbol = FontAwesome.plus;
        backgroundColor = RkTheme.current.colors.badge.plusBackground;
        color = RkTheme.current.colors.badge.plusForeground;
        break;
    }

    return (
      <View style={[style, {backgroundColor}]}>
        <RkText rkType='awesome' style={[textStyle, {color}]}>
          {symbol}
        </RkText>
      </View>
    )
  };

  render() {
    let {container, ...other} = this.defineStyles();
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
        {this.renderImg(other)}
      </View>
    )
  }
}

export default Avatar;
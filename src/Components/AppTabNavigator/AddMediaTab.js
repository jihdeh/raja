import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base';
import Picker from 'react-native-picker-select';
import CheckBox from 'react-native-checkbox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { displayError } from '../../Actions/ErrorAction';
import ImageBrowser from '../ImageBrowser';

import GStyles from '../../Styles/GeneralStyle';
import Styles from '../../Styles/AddMediaStyle';
import {
  findCategoryBySlug,
  findCategoryByName
} from '../../utils/categoryHelpers';

class AddMediaTab extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-add-circle" style={{ color: tintColor }} />
      ),
      headerLeft: <Icon name="ios-cash-outline" style={{ paddingLeft: 10 }} />,
      headerRight: (
        <View style={GStyles.headerRightContainer}>
          <Icon
            onPress={() => navigation.navigate('BookmarkScreen')}
            style={GStyles.headerRightIcon}
            name="ios-bookmark-outline"
          />
          <Icon style={GStyles.headerRightIcon} name="md-mail" />
        </View>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      imageBrowserOpen: false,
      categoryOptions: [
        {
          label: 'Electronics & Gadgets',
          value: 'electronics',
          key: 'electronics'
        },
        {
          label: 'Clothings',
          value: 'clothings',
          key: 'clothings'
        }
      ],
      gotoNext: false,
      product: {
        images: [],
        name: '',
        description: '',
        summary: '',
        brand: '',
        sku: ''
      }
    };

    // bind events
    this.handleCategoryChange1 = this.handleCategoryChange1.bind(this);
    this.handleCategoryChange2 = this.handleCategoryChange2.bind(this);
    this.handleCategoryChange3 = this.handleCategoryChange3.bind(this);
  }

  componentDidMount() {
    // if (!this.props.categories && !this.props.categoriesLoading) {
    // }
  }

  imageBrowserCallback = callback => {
    callback
      .then(images => {
        this.setState({
          imageBrowserOpen: false,
          product: { ...this.state.product, images }
        });
      })
      .catch(e => console.log(e));
  };

  renderImage(item, i) {
    return <Image style={Styles.image} source={{ uri: item.file }} key={i} />;
  }

  validate() {
    const { images, name, description, category } = this.state.product;
    if (!images.length) {
      this.props.displayError('Please upload images');
      return false;
    }
    if (!name.trim() || !description.trim() || !category) {
      this.props.displayError('All fields are required');
      return false;
    }
    return true;
  }

  onNext = () => {
    if (this.validate()) {
      this.props.navigation.navigate('BidSelection', { ...this.state.product });
    }
  };

  handleCategoryChange1(selectedValue, itemIndex) {
    this.handleCategoryChange(selectedValue, itemIndex, 1);
  }
  handleCategoryChange2(selectedValue, itemIndex) {
    this.handleCategoryChange(selectedValue, itemIndex, 2);
  }
  handleCategoryChange3(selectedValue, itemIndex) {
    this.handleCategoryChange(selectedValue, itemIndex, 3);
  }

  handleCategoryChange(selectedValue, itemIndex, level) {
    if (!selectedValue) {
      // clear child selections
      if (level === 1) {
        this.setState({
          selectedCategory: null,
          selectedSubCategory: null
        });
      } else if (level === 2) {
        this.setState({
          selectedSubCategory: null
        });
      }
      this.setState({ product: { ...this.state.product, category: '' } });
      return false;
    }

    const categories = this.props.shared.toJS
      ? this.props.shared.toJS().categories
      : [];

    const category = findCategoryByName(categories, selectedValue);
    if (!category) return;

    if (level === 3 || !category.subs || !category.subs.length) {
      this.setState({
        product: { ...this.state.product, category: category.name }
      });
    } else {
      this.setState({ product: { ...this.state.product, category: '' } });
    }
    if (level === 1) {
      this.setState(
        {
          selectedCategory: null,
          selectedSubCategory: null
        },
        // hack to force sub categories to reset
        () => this.setState({ selectedCategory: category })
      );
    }
    if (level === 2) {
      this.setState(
        {
          selectedSubCategory: null
        }, // hack to force sub categories to reset
        () => this.setState({ selectedSubCategory: category })
      );
    }
  }

  render() {
    const categories = this.props.shared.toJS()
      ? this.props.shared.toJS().categories
      : null;
    if (!categories) {
      return <Expo.AppLoading />;
    }

    if (this.state.imageBrowserOpen) {
      return <ImageBrowser max={6} callback={this.imageBrowserCallback} />;
    }

    const subItems = this.state.selectedCategory
      ? this.state.selectedCategory.subs
      : null;
    const subSubItems = this.state.selectedSubCategory
      ? this.state.selectedSubCategory.subs
      : null;

    return (
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
          <View style={GStyles.hotListHeader}>
            <Text>Sell Product</Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end'
              }}
              onPress={() => this.setState({ imageBrowserOpen: true })}
            >
              <Icon name="ios-add-circle-outline" style={{ fontSize: 20 }} />
              <Text>Add Image</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.imageContainer}>
            {this.state.product.images.map((item, i) =>
              this.renderImage(item, i)
            )}
          </View>
          <View style={Styles.afterLayer}>
            <Text style={Styles.product_text}>Product Name:</Text>
            <TextInput
              style={GStyles.input}
              underlineColorAndroid="transparent"
              placeholder="Name of product"
              placeholderTextColor="rgba(45, 45, 45, 0.3)"
              returnKeyType="next"
              onSubmitEditing={() => this.description.focus()}
              keyboardType="default"
              autoCapitalize={'none'}
              onChangeText={name =>
                this.setState({
                  product: { ...this.state.product, name }
                })
              }
              value={this.state.product.name}
              autoCorrect={false}
            />

            <Text style={Styles.product_text}>Description:</Text>
            <TextInput
              style={[GStyles.input, Styles.description]}
              underlineColorAndroid="transparent"
              placeholder="Description of product"
              multiline={true}
              placeholderTextColor="rgba(45, 45, 45, 0.3)"
              ref={input => {
                this.description = input;
              }}
              onChangeText={description =>
                this.setState({
                  product: { ...this.state.product, description }
                })
              }
              value={this.state.product.description}
            />

            {/* <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={64}
            >
              <Text style={Styles.product_text}>Summary:</Text>
              <TextInput
                style={[GStyles.input, Styles.description]}
                underlineColorAndroid="transparent"
                placeholder="Summary of product"
                multiline={true}
                placeholderTextColor="rgba(45, 45, 45, 0.3)"
                onChangeText={summary =>
                  this.setState({
                    product: { ...this.state.product, summary }
                  })
                }
                value={this.state.product.summary}
              />
            </KeyboardAvoidingView> */}
            <Text style={Styles.product_text}>Category:</Text>
            <View style={GStyles.dropDownSelection_input}>
              <Picker
                items={categories}
                hideIcon
                onValueChange={this.handleCategoryChange1}
                placeholder={{
                  label: 'Select a category...',
                  value: null
                }}
                value={
                  this.state.selectedCategory
                    ? this.state.selectedCategory.name
                    : this.state.product.category
                }
              />
            </View>
            <View>
              <CheckBox
                label="Use last category"
                checked={this.state.useLastCategory}
                onChange={checked =>
                  this.setState({
                    useLastCategory: !this.state.useLastCategory
                  })
                }
              />
            </View>
            {subItems &&
              subItems.length > 0 && (
                <React.Fragment>
                  <Text style={Styles.product_text}>Select Sub-Category: </Text>
                  <View style={GStyles.dropDownSelection_input}>
                    <Picker
                      items={this.state.selectedCategory.subs}
                      hideIcon
                      onValueChange={this.handleCategoryChange2}
                      placeholder={{
                        label: 'Select a sub category...',
                        value: null
                      }}
                      value={
                        this.state.selectedSubCategory
                          ? this.state.selectedSubCategory.name
                          : this.state.product.category
                      }
                    />
                  </View>
                </React.Fragment>
              )}

            {subSubItems &&
              subSubItems.length > 0 && (
                <React.Fragment>
                  <Text style={Styles.product_text}>Select Sub-Category:</Text>
                  <View style={GStyles.dropDownSelection_input}>
                    <Picker
                      items={this.state.selectedSubCategory.subs}
                      hideIcon
                      onValueChange={this.handleCategoryChange3}
                      placeholder={{
                        label: 'Select a sub-sub category...',
                        value: null
                      }}
                      value={this.state.product.category}
                    />
                  </View>
                </React.Fragment>
              )}
            <Text style={Styles.product_text}>Quantity:</Text>
            <TextInput
              style={GStyles.input}
              underlineColorAndroid="transparent"
              placeholder="Quantity"
              keyboardType="numeric"
              placeholderTextColor="rgba(45, 45, 45, 0.3)"
              onChangeText={quantity =>
                this.setState({
                  product: { ...this.state.product, quantity }
                })
              }
              value={this.state.product.quantity}
            />
            {/* <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={64}
            >
              <Text style={Styles.product_text}>Brand:</Text>
              <TextInput
                style={GStyles.input}
                underlineColorAndroid="transparent"
                placeholder="Brand"
                keyboardType="default"
                placeholderTextColor="rgba(45, 45, 45, 0.3)"
                onChangeText={brand =>
                  this.setState({
                    product: { ...this.state.product, brand }
                  })
                }
                value={this.state.product.brand}
              />
            </KeyboardAvoidingView>

            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={64}
            >
              <Text style={Styles.product_text}>Sku:</Text>
              <TextInput
                style={GStyles.input}
                underlineColorAndroid="transparent"
                placeholder="Sku"
                keyboardType="default"
                placeholderTextColor="rgba(45, 45, 45, 0.3)"
                onChangeText={sku =>
                  this.setState({
                    product: { ...this.state.product, sku }
                  })
                }
                value={this.state.product.sku}
              />
            </KeyboardAvoidingView> */}

            <TouchableOpacity
              onPress={this.onNext}
              style={[Styles.btn, GStyles.buttonContainer]}
            >
              <Text style={GStyles.buttonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  shared: state.get('shared')
});

const mapDispatchToProps = dispatch => ({
  displayError: bindActionCreators(displayError, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMediaTab);

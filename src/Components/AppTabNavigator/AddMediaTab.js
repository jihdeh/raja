import React, { Component } from "react";
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
} from "react-native";
import { Icon } from "native-base";
import Picker from "react-native-picker-select";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { displayError } from "../../Actions/ErrorAction";
import ImageBrowser from "../ImageBrowser";

import GStyles from "../../Styles/GeneralStyle";
import Styles from "../../Styles/AddMediaStyle";

class AddMediaTab extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-add-circle" style={{ color: tintColor }} />
      ),
      headerLeft: <Icon name="ios-cash-outline" style={{ paddingLeft: 10 }} />,
      headerRight: (
        <View style={GStyles.headerRightContainer}>
          <Icon style={GStyles.headerRightIcon} name="ios-bookmark-outline" />
          <Icon
            style={GStyles.headerRightIcon}
            name="md-mail"
            onPress={() => navigation.navigate("Notifications")}
          />
        </View>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      imageBrowserOpen: false,
      photos: [],
      gotoNext: false,
      titleInput: "",
      descriptionInput: "",
      items: [
        {
          label: "Orange",
          value: "orange",
          key: "orange"
        },
        {
          label: "Blue",
          value: "blue",
          key: "blue"
        }
      ]
    };
  }

  imageBrowserCallback = callback => {
    callback
      .then(photos => {
        this.setState({
          imageBrowserOpen: false,
          photos
        });
      })
      .catch(e => console.log(e));
  };

  renderImage(item, i) {
    return <Image style={Styles.image} source={{ uri: item.file }} key={i} />;
  }

  validate() {
    const {
      photos,
      titleInput,
      descriptionInput,
      productCategory,
      productSubCategory
    } = this.state;
    if (!photos.length) {
      this.props.displayError("Please upload images");
      return false;
    }
    if (
      !titleInput.trim() ||
      !descriptionInput.trim() ||
      !productCategory ||
      !productSubCategory
    ) {
      this.props.displayError("All fields are required");
      return false;
    }
    return true;
  }

  onNext = () => {
    if (this.validate()) {
      this.props.navigation.navigate("BidSelection", { ...this.state });
    }
  };

  render() {
    if (this.state.imageBrowserOpen) {
      return <ImageBrowser max={6} callback={this.imageBrowserCallback} />;
    }

    return (
      <View>
        <View style={GStyles.hotListHeader}>
          <Text>Sell Product</Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
            onPress={() => this.setState({ imageBrowserOpen: true })}
          >
            <Icon name="ios-add-circle-outline" style={{ fontSize: 20 }} />
            <Text>Add Image</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={Styles.imageContainer}>
            {this.state.photos.map((item, i) => this.renderImage(item, i))}
          </View>
          <View style={Styles.afterLayer}>
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={64}
            >
              <Text style={Styles.product_text}>Enter title:</Text>
              <TextInput
                style={GStyles.input}
                underlineColorAndroid="transparent"
                placeholder="Title"
                placeholderTextColor="rgba(45, 45, 45, 0.3)"
                returnKeyType="next"
                onSubmitEditing={() => this.descriptionInput.focus()}
                keyboardType="default"
                autoCapitalize={"none"}
                onChangeText={titleInput => this.setState({ titleInput })}
                value={this.state.titleInput}
                autoCorrect={false}
              />
              <Text style={Styles.product_text}>Enter Description:</Text>
              <TextInput
                style={[GStyles.input, Styles.description]}
                underlineColorAndroid="transparent"
                placeholder="Description of product"
                multiline={true}
                placeholderTextColor="rgba(45, 45, 45, 0.3)"
                ref={input => {
                  this.descriptionInput = input;
                }}
                onChangeText={descriptionInput =>
                  this.setState({ descriptionInput })
                }
                value={this.state.descriptionInput}
              />
            </KeyboardAvoidingView>
            <Text style={Styles.product_text}>Select Category:</Text>
            <View style={GStyles.dropDownSelection_input}>
              <Picker
                items={this.state.items}
                hideIcon
                onValueChange={(selectedValue, itemIndex) =>
                  this.setState({ productCategory: selectedValue })
                }
                placeholder={{
                  label: "Select a category...",
                  value: null
                }}
                value={this.state.productCategory}
              />
            </View>
            <Text style={Styles.product_text}>Select Sub-Category:</Text>
            <View style={GStyles.dropDownSelection_input}>
              <Picker
                items={this.state.items}
                hideIcon
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ productSubCategory: itemValue })
                }
                placeholder={{
                  label: "Select a sub category...",
                  value: null
                }}
                value={this.state.productSubCategory}
              />
            </View>
            <TouchableOpacity
              onPress={this.onNext}
              style={[Styles.btn, GStyles.buttonContainer]}
            >
              <Text style={GStyles.buttonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 40 }} />
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  displayError: bindActionCreators(displayError, dispatch)
});

export default connect(null, mapDispatchToProps)(AddMediaTab);

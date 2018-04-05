import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";

export default class ErrorModal extends Component {
  render() {
    const { errorMessage, onClose } = this.props;
    const toggleModal = errorMessage && errorMessage.error ? true : false;

    return (
      <Modal
        transparent={true}
        visible={toggleModal}
        animationType={"slide"}
        onRequestClose={() => onClose()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.text}>
              {errorMessage && errorMessage.error}
            </Text>
            <TouchableOpacity
              onPress={() => onClose()}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>ALRIGHT!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center"
  },
  innerContainer: {
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontSize: 18,
    paddingHorizontal: 20
  },
  buttonContainer: {
    backgroundColor: "#fff",
    marginTop: 40,
    padding: 10,
    height: 50,
    width: "90%",
    justifyContent: "center"
  },
  buttonText: {
    textAlign: "center",
    color: "#515151",
    fontWeight: "700",
    fontSize: 16
  }
});

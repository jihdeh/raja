import React, { Component } from "react";
import { Provider } from "react-redux";
import App from "./Containers/App";
import configureStore from "./configureStore";
import { createReduxBoundAddListener } from "react-navigation-redux-helpers";
// import App from "./Containers/Cart";
const addListener = createReduxBoundAddListener("root");

const store = configureStore();

export default class RootComponent extends Component {
  render() {
    return (
      <Provider store={store}>
        <App addListener={addListener} />
      </Provider>
    );
  }
}

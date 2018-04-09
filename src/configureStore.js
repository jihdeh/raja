/* eslint global-require: 0 */

import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { Map } from 'immutable';
import thunk from 'redux-thunk';
import reducer from './Reducers';

if (__DEV__) {
  // Use it if Remote debugging with RNDebugger, otherwise use remote-redux-devtools
  /* eslint-disable no-underscore-dangle */
  composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    require('remote-redux-devtools').composeWithDevTools)({
    name: Platform.OS,
    ...require('../package.json').remotedev
  });
  /* eslint-enable no-underscore-dangle */
}

const enhancer = compose(applyMiddleware(thunk));

export default function configureStore(initialState = new Map()) {
  const store = createStore(reducer, initialState, enhancer);
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./Reducers').default);
    });
  }
  return store;
}
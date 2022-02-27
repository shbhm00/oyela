import * as React from 'react';

import HomeScreen from './src/homeScreen';
import Router from './src/router';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store';
import {View} from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
    // <View style={{flex: 1}}>
    //   <Router />
    // </View>
  );
};

export default App;

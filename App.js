import {View, Text, LogBox} from 'react-native';
import React from 'react';
import MainRoutes from './src/Router/MainRoutes';
import {Provider} from 'react-redux';
import {store} from './src/Redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native']);
  AsyncStorage.clear();
  return (
    <Provider store={store}>
      <MainRoutes />
    </Provider>
  );
};

export default App;

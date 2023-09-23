import {View, Text, LogBox} from 'react-native';
import React from 'react';
import MainRoutes from './src/Router/MainRoutes';

const App = () => {
  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native']);
  return (
    <>
      <MainRoutes />
    </>
  );
};

export default App;

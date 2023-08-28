//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Fonts} from './src/Theme/Fonts';

// create a component
const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome To HiHello App.</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    fontFamily: Fonts.extraLight,
  },
});

//make this component available to the app
export default App;

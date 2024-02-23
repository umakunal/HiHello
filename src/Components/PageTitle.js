//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {verticalScale} from '../Theme/Dimentions';
import {COLORS} from '../Theme/Color';
import {Fonts} from '../Theme/Fonts';

// create a component
const PageTitle = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(20),
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: COLORS.textColor,
    letterSpacing: 0.3,
  },
});

//make this component available to the app
export default PageTitle;

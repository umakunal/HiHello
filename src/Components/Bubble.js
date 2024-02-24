//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../Theme/Color';
import {Fonts} from '../Theme/Fonts';
import {moderateScale, verticalScale} from '../Theme/Dimentions';

// create a component
const Bubble = props => {
  const {message, type} = props;
  const bubbleStyles = {...styles.container};
  const textStyles = {...styles.textStyle};
  const wrapperStyle = {...styles.wrapperStyle};

  switch (type) {
    case 'system':
      textStyles.color = '#65644a';
      bubbleStyles.backgroundColor = COLORS.beige;
      bubbleStyles.alignItems = 'center';
      bubbleStyles.marginTop = verticalScale(10);
      break;
    case 'error':
      textStyles.color = COLORS.white;
      bubbleStyles.backgroundColor = COLORS.red;
      bubbleStyles.alignItems = 'center';
      bubbleStyles.marginTop = verticalScale(10);
      break;

    case 'own':
      wrapperStyle.justifyContent = 'flex-end';
      bubbleStyles.backgroundColor = COLORS.primaryLight;
      bubbleStyles.maxWidth = '90%';
      break;
    case 'other':
      wrapperStyle.justifyContent = 'flex-start';
      bubbleStyles.maxWidth = '90%';
      break;

    default:
      break;
  }
  return (
    <View style={wrapperStyle}>
      <View style={bubbleStyles}>
        <Text style={textStyles}>{message}</Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  wrapperStyle: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(6),
    padding: moderateScale(5),
    marginBottom: moderateScale(10),
    borderWidth: 1,
    borderColor: COLORS.grey,
  },
  textStyle: {
    color: COLORS.textColor,
    fontFamily: Fonts.regular,
    fontSize: moderateScale(16),
    letterSpacing: 0.3,
  },
});

//make this component available to the app
export default Bubble;

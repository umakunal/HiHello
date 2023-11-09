//import liraries
import React, {Component} from 'react';
import {HeaderButton, Item} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../Theme/Color';

// create a component
const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={25}
      color={props?.color ?? COLORS.primary}
    />
  );
};

// define your styles

//make this component available to the app
export default CustomHeaderButton;

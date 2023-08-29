import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {horizontalScale} from '../Theme/Dimentions';
import {COLORS} from '../Theme/Color';

const PageContainer = props => {
  return (
    <View style={{...styles.container, ...props.style}}>{props.children}</View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
    backgroundColor: COLORS.white,
  },
});

export default PageContainer;

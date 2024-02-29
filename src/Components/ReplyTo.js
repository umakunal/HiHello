//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Fonts} from '../Theme/Fonts';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../Theme/Dimentions';
import {COLORS} from '../Theme/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';

// create a component
const ReplyTo = props => {
  const {text, user, onCancel} = props;
  const name = user?.firstName + ' ' + user?.lastName;
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.name}>
          {name}
        </Text>
        <Text numberOfLines={1} style={styles.textMessage}>
          {text}
        </Text>
      </View>
      <TouchableOpacity onPress={onCancel}>
        <AntDesign name="closecircleo" size={20} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.extraLightGrey,
    padding: moderateScale(10),
    borderLeftColor: COLORS.primary,
    borderLeftWidth: 8,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontFamily: Fonts.medium,
    letterSpacing: 0.3,
    color: COLORS.primary,
  },
  textMessage: {
    fontFamily: Fonts.regular,
    fontSize: moderateScale(12),
    marginTop: verticalScale(5),
  },
});

//make this component available to the app
export default ReplyTo;

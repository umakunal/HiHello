//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../Theme/Dimentions';
import {COLORS} from '../Theme/Color';
import {Fonts} from '../Theme/Fonts';
import ProfileImage from './ProfileImage';

// create a component
const imageSize = 40;
const DataItem = props => {
  const {title, subTitle, image, onPress, type, isChecked, icon, dataKey} =
    props;
  return (
    <TouchableWithoutFeedback
      key={dataKey}
      onPress={() => {
        onPress();
      }}>
      <View style={styles.container}>
        {!icon && <ProfileImage uri={image} size={imageSize} />}
        {icon && (
          <View style={styles.leftIconContainer}>
            <AntDesign name={icon} size={20} color={COLORS.secondary} />
          </View>
        )}
        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              {color: type === 'button' ? COLORS.secondary : COLORS.textColor},
            ]}>
            {title}
          </Text>
          {subTitle && (
            <Text numberOfLines={1} style={styles.subTitle}>
              {subTitle}
            </Text>
          )}
        </View>

        {type === 'chatBox' && (
          <View
            style={{
              ...styles.iconContainer,
              ...(isChecked && styles.checkedStyle),
            }}>
            <Ionicons name="checkmark" size={18} color={COLORS.white} />
          </View>
        )}
        {type === 'link' && (
          <View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.grey} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: verticalScale(10),
    borderBottomColor: COLORS.extraLightGrey,
    borderBottomWidth: 1,
    alignItems: 'center',
    minHeight: verticalScale(50),
    marginLeft: horizontalScale(5),
  },
  textContainer: {
    flex: 1,
    marginLeft: horizontalScale(14),
  },
  title: {
    fontFamily: Fonts.medium,
    fontSize: moderateScale(16),
    letterSpacing: 0.3,
  },
  subTitle: {
    fontFamily: Fonts.regular,
    color: COLORS.grey,
    letterSpacing: 0.3,
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: COLORS.lightGrey,
    backgroundColor: COLORS.white,
  },
  checkedStyle: {
    backgroundColor: COLORS.primary,
    borderColor: 'transparent',
  },
  leftIconContainer: {
    backgroundColor: COLORS.secondaryLight,
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    height: imageSize,
    width: imageSize,
  },
});

//make this component available to the app
export default DataItem;

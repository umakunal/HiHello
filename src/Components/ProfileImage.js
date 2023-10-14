//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ImagePath} from '../Theme/ImagePath';
import {moderateScale} from '../Theme/Dimentions';
import {COLORS} from '../Theme/Color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// create a component
const ProfileImage = props => {
  const pickImage = () => {};
  return (
    <TouchableOpacity onPress={pickImage}>
      <Image
        source={ImagePath.empty}
        style={{
          ...styles.image,
          ...{width: props.size, height: props.size},
        }}
      />
      <View style={styles.edit}>
        <FontAwesome
          name="pencil"
          size={moderateScale(15)}
          color={COLORS.grey}
        />
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  image: {
    borderRadius: moderateScale(50),
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: COLORS.lightGrey,
  },
  edit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.lightGrey,
    borderRadius: moderateScale(20),
    padding: moderateScale(8),
  },
});

//make this component available to the app
export default ProfileImage;

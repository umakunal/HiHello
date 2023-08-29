//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../Theme/Color';
import {Fonts} from '../../Theme/Fonts';
import {useNavigation} from '@react-navigation/native';
import {ScreenName} from '../../Constants/ScreenName';

// create a component
const ChatList = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>ChatList</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(ScreenName.chat)}>
        <Text style={styles.btnText}>Go to Chat </Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    width: 200,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    padding: 10,
  },
  btnText: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: Fonts.regular,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

//make this component available to the app
export default ChatList;

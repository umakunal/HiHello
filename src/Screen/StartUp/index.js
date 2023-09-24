//import liraries
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import CommonStyle from '../../Constants/CommonStyle';
import {COLORS} from '../../Theme/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {authenticate, setDidTryAutoLogin} from '../../Redux/authSlice';
import {getUserData} from '../../Utils/Actions/UserAction';

// create a component
const StartUp = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const storedAuthInfo = await AsyncStorage.getItem('userData');
      console.log('storedAuthInfo', storedAuthInfo);
      console.log('I am here');
      if (!storedAuthInfo) {
        dispatch(setDidTryAutoLogin());
        return;
      }
      const parseData = JSON.parse(storedAuthInfo);
      console.log('parseData', parseData);
      const {token, userId, expiryDate: expiryDateString} = parseData;
      const expiryDate = new Date(expiryDateString);
      console.log('expiryDate', expiryDate);
      if (expiryDate <= new Date() || !token || !userId) {
        dispatch(setDidTryAutoLogin());
        return;
      }
      const userData = await getUserData(userId);
      console.log('getUserData==>', userData);
      dispatch(authenticate({token: token, userData}));
    };
    tryLogin();
  }, [dispatch]);
  return (
    <View style={CommonStyle.center}>
      <ActivityIndicator size={'large'} color={COLORS.primary} />
    </View>
  );
};

//make this component available to the app
export default StartUp;

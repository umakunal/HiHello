import {View, Text} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Input from './Input';
import SubmitButton from './SubmitButton';
import {verticalScale} from '../Theme/Dimentions';

const SignInForm = () => {
  return (
    <View>
      <Input
        id="email"
        label="Email"
        icon={'mail'}
        iconPack={Feather}
        keyboardType="email-address"
        autoCapitalize="none"
        // onInputChanged={inputChangedHandler}
        // errorText={FormState.inputValidities['email']}
      />
      <Input
        id="password"
        label="Password"
        icon={'lock'}
        iconPack={Feather}
        autoCapitalize="none"
        secureTextEntry
        // onInputChanged={inputChangedHandler}
        // errorText={FormState.inputValidities['password']}
      />
      <SubmitButton
        // disabled={!FormState.formIsValid}
        style={{marginTop: verticalScale(20)}}
        title="Sign up"
        onPress={() => {
          // AuthHandler();
        }}
      />
    </View>
  );
};

export default SignInForm;

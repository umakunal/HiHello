import {View, Text, Alert, ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect, useReducer, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Input from './Input';
import SubmitButton from './SubmitButton';
import {verticalScale} from '../Theme/Dimentions';
import {validateInput} from '../Utils/Actions/FormActions';
import {formReducer} from '../Utils/Reducer/FormReducer';
import {signIn} from '../Utils/Actions/AuthAction';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../Theme/Color';

const isTestMode = true;
const initialState = {
  inputValues: {
    email: isTestMode ? 'samratkunal@mail.com' : '',
    password: isTestMode ? '123456' : '',
  },
  inputValidities: {
    email: isTestMode,
    password: isTestMode,
  },
  formIsValid: isTestMode,
};
const SignInForm = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);
  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({
        inputId,
        validationResult: result,
        inputValue,
      });
    },
    [dispatchFormState],
  );
  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error, [{text: 'Okay'}]);
    }
  }, [error]);
  const authHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const action = signIn(
        formState.inputValues.email,
        formState.inputValues.password,
      );
      setError(null);
      await dispatch(action);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [dispatch, formState]);
  return (
    <View>
      <Input
        id="email"
        label="Email"
        icon={'mail'}
        value={formState.inputValues.email}
        iconPack={Feather}
        keyboardType="email-address"
        autoCapitalize="none"
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities['email']}
      />
      <Input
        id="password"
        label="Password"
        icon={'lock'}
        value={formState.inputValues.password}
        iconPack={Feather}
        autoCapitalize="none"
        secureTextEntry
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities['password']}
      />
      {isLoading ? (
        <ActivityIndicator
          size={'small'}
          color={COLORS.primary}
          style={{marginTop: verticalScale(10)}}
        />
      ) : (
        <SubmitButton
          disabled={!formState.formIsValid}
          style={{marginTop: verticalScale(20)}}
          title="Sign in"
          onPress={() => {
            authHandler();
          }}
        />
      )}
    </View>
  );
};

export default SignInForm;

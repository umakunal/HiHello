import {View, Text, Alert, ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect, useReducer, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Input from './Input';
import SubmitButton from './SubmitButton';
import {verticalScale} from '../Theme/Dimentions';
import {validate} from 'validate.js';
import {validateInput} from '../Utils/Actions/FormActions';
import {formReducer} from '../Utils/Reducer/FormReducer';
import {signUp} from '../Utils/Actions/AuthAction';
import {getFirebaseApp} from '../Utils/FirebaseHelper';
import {COLORS} from '../Theme/Color';
import {useDispatch, useSelector} from 'react-redux';

const initialState = {
  inputValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};
const SignUpForm = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  // console.log('auth Data', auth);
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
      const action = signUp(
        formState.inputValues.firstName,
        formState.inputValues.lastName,
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
        id="firstName"
        label="First name"
        icon={'user-o'}
        iconPack={FontAwesome}
        // autoCapitalize="none"
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities['firstName']}
      />
      <Input
        id="lastName"
        label="Last name"
        icon={'user-o'}
        iconPack={FontAwesome}
        // autoCapitalize="none"
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities['lastName']}
      />
      <Input
        id="email"
        label="Email"
        icon={'mail'}
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
          title="Sign up"
          onPress={() => {
            authHandler();
          }}
        />
      )}
    </View>
  );
};

export default SignUpForm;

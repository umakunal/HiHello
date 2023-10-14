//import liraries
import React, {useCallback, useReducer, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import PageTitle from '../../Components/PageTitle';
import PageContainer from '../../Components/PageContainer';
import Input from '../../Components/Input';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {validateInput} from '../../Utils/Actions/FormActions';
import {useDispatch, useSelector} from 'react-redux';
import {formReducer} from '../../Utils/Reducer/FormReducer';
import SubmitButton from '../../Components/SubmitButton';
import {moderateScale, verticalScale} from '../../Theme/Dimentions';
import {COLORS} from '../../Theme/Color';
import {
  updateSignedInUserData,
  userLogout,
} from '../../Utils/Actions/AuthAction';
import {updateLoggedInUserData} from '../../Redux/authSlice';
import ProfileImage from '../../Components/ProfileImage';

// create a component

const Settings = () => {
  const userData = useSelector(state => state.auth?.userData);
  const firstName = userData.firstName || '';
  const lastName = userData.lastName || '';
  const email = userData.email || '';
  const about = userData.about || '';
  const initialState = {
    inputValues: {
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      email: userData?.email || '',
      about: userData?.about || '',
    },
    inputValidities: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      about: undefined,
    },
    formIsValid: false,
  };
  console.log('userData++++++++', userData);
  const dispatch = useDispatch();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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
  const saveHandler = useCallback(async () => {
    const updatedValues = formState.inputValues;
    console.log('updatedValues Data', updatedValues);
    try {
      setIsLoading(true);
      await updateSignedInUserData(userData.userId, updatedValues);
      dispatch(updateLoggedInUserData({newData: updatedValues}));
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.log('error occurred while updating userDetails', error);
    } finally {
      setIsLoading(false);
    }
  }, [formState, dispatch]);
  const hasChanges = () => {
    const currentValues = formState.inputValues;
    return (
      currentValues.firstName != firstName ||
      currentValues.lastName != lastName ||
      currentValues.email != email ||
      currentValues.about != about
    );
  };
  return (
    <PageContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.formContainer}>
        <PageTitle>Settings</PageTitle>
        <ProfileImage
          size={moderateScale(80)}
          uri={userData?.profilePicture}
          userId={userData?.userId}
        />
        <Input
          id="firstName"
          label="First name"
          icon={'user-o'}
          iconPack={FontAwesome}
          // autoCapitalize="none"
          value={userData?.firstName}
          onInputChanged={inputChangedHandler}
          errorText={formState.inputValidities['firstName']}
        />
        <Input
          id="lastName"
          label="Last name"
          icon={'user-o'}
          iconPack={FontAwesome}
          // autoCapitalize="none"
          value={userData?.lastName}
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
          value={userData?.email}
          onInputChanged={inputChangedHandler}
          errorText={formState.inputValidities['email']}
        />
        <Input
          id="about"
          label="About"
          icon={'info'}
          iconPack={Feather}
          // autoCapitalize="none"
          value={userData?.about}
          onInputChanged={inputChangedHandler}
          errorText={formState.inputValidities['about']}
        />

        <View style={{marginTop: verticalScale(20)}}>
          {showSuccessMessage && <Text>Saved!!!</Text>}

          {isLoading ? (
            <ActivityIndicator
              size={'small'}
              color={COLORS.primary}
              style={{marginTop: verticalScale(10)}}
            />
          ) : (
            hasChanges() && (
              <SubmitButton
                disabled={!formState?.formIsValid}
                style={{marginTop: verticalScale(20)}}
                title="Save"
                onPress={() => {
                  saveHandler();
                }}
              />
            )
          )}
        </View>
        <SubmitButton
          color={COLORS.red2}
          style={{marginTop: verticalScale(20)}}
          title="Logout"
          onPress={() => {
            dispatch(userLogout());
          }}
        />
      </ScrollView>
    </PageContainer>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    alignItems: 'center',
  },
});

//make this component available to the app
export default Settings;

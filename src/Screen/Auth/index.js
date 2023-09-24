//import liraries
import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import PageContainer from '../../Components/PageContainer';
import {SafeAreaView} from 'react-native-safe-area-context';
import SignUpForm from '../../Components/SignUpForm';
import SignInForm from '../../Components/SignInForm';
import {moderateScale, verticalScale} from '../../Theme/Dimentions';
import {COLORS} from '../../Theme/Color';
import {Fonts} from '../../Theme/Fonts';
import {ImagePath} from '../../Theme/ImagePath';

// create a component
const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <PageContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={100}
            style={styles.keyboardAvoidingView}>
            <View style={styles.imageContainer}>
              <Image source={ImagePath.logo} style={styles.logo} />
            </View>
            {isSignUp ? <SignUpForm /> : <SignInForm />}
            <TouchableOpacity
              style={styles.linkContainer}
              onPress={() => setIsSignUp(prevState => !prevState)}>
              <Text style={styles.link}>{`Switch to ${
                isSignUp ? 'Sign in' : 'Sign up'
              }`}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(15),
  },
  link: {
    color: COLORS.primary,
    letterSpacing: 0.3,
    fontFamily: Fonts.medium,
  },
  imageContainer: {
    marginVertical: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: moderateScale(150),
    height: moderateScale(150),
    resizeMode: 'contain',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
  },
});

//make this component available to the app
export default Auth;

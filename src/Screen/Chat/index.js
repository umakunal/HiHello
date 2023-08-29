//import liraries
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {ImagePath} from '../../Theme/ImagePath';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../Theme/Dimentions';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../Theme/Color';

// create a component
const Chat = () => {
  const [messageText, setMessageText] = useState('');
  const sendMessage = useCallback(() => {
    setMessageText('');
  }, [messageText]);
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}>
        <ImageBackground
          source={ImagePath.background}
          style={styles.backgroundImage}></ImageBackground>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Feather name="plus" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TextInput
            style={styles.textBox}
            value={messageText}
            onChangeText={setMessageText}
            onSubmitEditing={sendMessage}
          />
          {messageText === '' && (
            <TouchableOpacity onPress={() => {}} style={styles.mediaButton}>
              <Feather name="camera" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          )}
          {messageText !== '' && (
            <TouchableOpacity
              onPress={() => {
                sendMessage(messageText);
              }}
              style={{...styles.mediaButton, ...styles.sendButton}}>
              <Feather name="send" size={20} color={COLORS.white} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screen: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(10),
    height: moderateScale(50),
    alignItems: 'center',
  },
  textBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: moderateScale(50),
    borderColor: COLORS.lightGrey,
    marginHorizontal: horizontalScale(15),
    paddingHorizontal: horizontalScale(12),
  },
  mediaButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(35),
  },
  sendButton: {
    width: horizontalScale(35),
    height: horizontalScale(35),
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(8),
    backgroundColor: COLORS.primary,
    borderRadius: moderateScale(50),
  },
});

//make this component available to the app
export default Chat;

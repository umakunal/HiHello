//import liraries
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../Theme/Color';
import {Fonts} from '../../Theme/Fonts';
import {useNavigation} from '@react-navigation/native';
import {ScreenName} from '../../Constants/ScreenName';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../Components/CustomHeaderButton';
import {useSelector} from 'react-redux';

// create a component
const ChatList = props => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.auth?.userData);
  const selectedUser = props?.route?.params?.selectedUserId;
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="New Chat"
            iconName="create-outline"
            onPress={() => {
              navigation.navigate(ScreenName.newChat);
            }}
          />
        </HeaderButtons>
      ),
    });
  }, []);
  useEffect(() => {
    if (!selectedUser) {
      return;
    }
    const chatUsers = [selectedUser, userData.userId];
    const navigationProps = {newChatData: {users: chatUsers}};
    navigation.navigate(ScreenName.chat, navigationProps);
  }, [props?.route?.params]);
  return (
    <View style={styles.container}>
      <Text>ChatList</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate(ScreenName.chat);
        }}>
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

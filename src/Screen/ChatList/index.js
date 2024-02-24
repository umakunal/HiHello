//import liraries
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {COLORS} from '../../Theme/Color';
import {Fonts} from '../../Theme/Fonts';
import {useNavigation} from '@react-navigation/native';
import {ScreenName} from '../../Constants/ScreenName';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../Components/CustomHeaderButton';
import {useSelector} from 'react-redux';
import DataItem from '../../Components/DataItem';
import PageContainer from '../../Components/PageContainer';
import PageTitle from '../../Components/PageTitle';

// create a component
const ChatList = props => {
  const navigation = useNavigation();
  const selectedUser = props?.route?.params?.selectedUserId;
  const userData = useSelector(state => state.auth?.userData);
  const storedUser = useSelector(state => state.users.storedUsers);
  const userChats = useSelector(state => {
    const chatsData = state.chats?.chatsData;
    return Object.values(chatsData).sort((a, b) => {
      return new Date(b?.updatedAt) - new Date(a?.updatedAt);
    });
  });

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
    <PageContainer>
      <PageTitle title="Chats" />
      <FlatList
        data={userChats}
        renderItem={itemData => {
          const chatData = itemData?.item;
          const chatId = chatData?.key;
          const otherUserId = chatData?.users?.find(
            userId => userId !== userData.userId,
          );
          const otherUser = storedUser[otherUserId];
          if (!otherUser) return;
          const title = otherUser?.firstName + ' ' + otherUser?.lastName;
          const subTitle = chatData?.latestMessage || 'New Chat';
          const image = otherUser?.profilePicture;
          return (
            <DataItem
              title={title}
              subTitle={subTitle}
              image={image}
              onPress={() => navigation.navigate(ScreenName.chat, {chatId})}
            />
          );
        }}
      />
    </PageContainer>
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

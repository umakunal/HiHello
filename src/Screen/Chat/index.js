//import liraries
import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
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
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Bubble from '../../Components/Bubble';
import PageContainer from '../../Components/PageContainer';
import {createChat, sendTextMessage} from '../../Utils/Actions/ChatAction';

// create a component
const Chat = props => {
  const navigation = useNavigation();
  const [chatUsers, setChatUsers] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [chatId, setChatId] = useState(props?.route.params?.chatId);
  const [errorBannerText, setErrorBannerText] = useState('');
  const storedUsers = useSelector(state => state.users.storedUsers);
  const storedChats = useSelector(state => state.chats.chatsData);
  const ChatMessages = useSelector(state => {
    if (!chatId) return [];
    const chatMessagesData = state.messages.messagesData[chatId];
    if (!chatMessagesData) return [];

    const messageList = [];

    for (const key in chatMessagesData) {
      const message = chatMessagesData[key];
      messageList.push({
        key,
        ...message,
      });
    }
    console.log('messageList', messageList);
    return messageList;
  });

  const userData = useSelector(state => state.auth?.userData);
  const chatData =
    (chatId && storedChats[chatId]) || props?.route?.params?.newChatData;
  const getChatTitleFromName = () => {
    const otherUserId = chatUsers.find(uid => uid !== userData?.uid);
    const otherUser = storedUsers[otherUserId];
    return otherUser && `${otherUser?.firstName} ${otherUser?.lastName}`;
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle: getChatTitleFromName(),
    });
    setChatUsers(chatData?.users);
  }, [chatUsers]);
  const sendMessage = useCallback(async () => {
    try {
      let id = chatId;
      if (!id) {
        //No Chat Id. Create new chat
        id = await createChat(
          userData.userId,
          props?.route.params?.newChatData,
        );
        setChatId(id);
      }
      //Send message
      await sendTextMessage(id, userData.userId, messageText);
      setMessageText('');
    } catch (error) {
      console.log('error ocurred while sending message', error);
      setErrorBannerText('Message failed to send.');
      setTimeout(() => {
        setErrorBannerText('');
      }, 3000);
    }
  }, [messageText, chatId]);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}>
        <ImageBackground
          source={ImagePath.background}
          style={styles.backgroundImage}>
          <PageContainer style={{backgroundColor: 'transparent'}}>
            {!chatId && (
              <Bubble message={'This is a new chat.'} type="system" />
            )}
            {errorBannerText != '' && (
              <Bubble message={errorBannerText} type="error" />
            )}
            {chatId && (
              <FlatList
                data={ChatMessages}
                renderItem={itemData => {
                  const message = itemData?.item;
                  const isOwnMessage = message?.sentBy === userData?.userId;
                  console.log('isOwnMessage', isOwnMessage);
                  const messageType = isOwnMessage ? 'own' : 'other';
                  return (
                    <Bubble
                      type={messageType}
                      message={message?.text}
                      messageId={message?.key}
                      userId={userData?.userId}
                      chatId={chatId}
                      date={message?.sendAt}
                    />
                  );
                }}
              />
            )}
          </PageContainer>
        </ImageBackground>
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
    height: moderateScale(58),
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

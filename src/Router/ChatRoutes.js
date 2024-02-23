import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import {Chat, ChatSettings, Contact, NewChat} from '../Screen';
import {ScreenName} from '../Constants/ScreenName';
import TabRoutes from './TabRoutes';
import {useDispatch, useSelector} from 'react-redux';
import {getFirebaseApp} from '../Utils/FirebaseHelper';
import {child, get, getDatabase, off, onValue, ref} from 'firebase/database';
import {setChatsData} from '../Redux/chatSlice';
import {ActivityIndicator, View} from 'react-native';
import {COLORS} from '../Theme/Color';
import CommonStyle from '../Constants/CommonStyle';
import {setStoredUsers} from '../Redux/userSlice';

const ChatRoutes = () => {
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector(state => state.auth.userData);
  const storedUser = useSelector(state => state.users.storedUsers);

  useEffect(() => {
    console.log('Subscribing to firebase listeners');
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const userChatsRef = child(dbRef, `userChats/${userData.userId}`);
    const refs = [userChatsRef];
    onValue(userChatsRef, querySnapshot => {
      const chatIdData = querySnapshot.val() || {};
      const chatIds = Object.values(chatIdData);
      const chatsData = {};
      let chatsFoundCount = 0;
      for (let i = 0; i < chatIds.length; i++) {
        const chatId = chatIds[i];
        const chatsRef = child(dbRef, `chats/${chatId}`);
        refs.push(chatsRef);
        onValue(chatsRef, chatSnapshot => {
          chatsFoundCount++;
          const data = chatSnapshot.val();
          if (data) {
            console.log('Data FOUND===>', data);
            data.key = chatSnapshot.key;
            data?.users.forEach(userId => {
              if (storedUser[userId]) return;
              const userRef = child(dbRef, `users/${userId}`);
              get(userRef).then(userSnapshot => {
                const userSnapshotData = userSnapshot.val();
                dispatch(setStoredUsers({newUsers: {userSnapshotData}}));
              });
              refs.push(userRef);
            });
            chatsData[chatSnapshot.key] = data;
          }
          if (chatsFoundCount >= chatIds.length) {
            dispatch(setChatsData({chatsData}));
            setIsLoading(false);
          }
        });

        if (chatsFoundCount == 0) {
          setIsLoading(false);
        }
      }
    });
    return () => {
      console.log('Unsubscribing to firebase listner');
      refs.forEach(ref => off(ref));
    };
  }, []);

  if (isLoading) {
    return (
      <View style={CommonStyle.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Group>
        <Stack.Screen
          name={'Home'}
          component={TabRoutes}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenName.chat}
          component={Chat}
          options={{
            headerTitle: 'Chat',
          }}
        />
        <Stack.Screen
          name={ScreenName.chatSettings}
          component={ChatSettings}
          options={{
            headerTitle: '',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name={ScreenName.contact}
          component={Contact}
          options={{
            headerTitle: 'Contact Info',
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'containedModal'}}>
        <Stack.Screen
          name={ScreenName.newChat}
          component={NewChat}
          options={{
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ChatRoutes;

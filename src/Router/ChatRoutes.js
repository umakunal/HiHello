import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Chat, ChatSettings, Contact, NewChat} from '../Screen';
import {ScreenName} from '../Constants/ScreenName';
import TabRoutes from './TabRoutes';

const ChatRoutes = () => {
  const Stack = createNativeStackNavigator();
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

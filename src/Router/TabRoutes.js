import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {ChatList, Settings} from '../Screen';
import {ScreenName} from '../Constants/ScreenName';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../Theme/Color';

const TabRoutes = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: '',
        headerShadowVisible: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey,
      }}>
      <Tab.Screen
        name={ScreenName.chatList}
        component={ChatList}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenName.settings}
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;

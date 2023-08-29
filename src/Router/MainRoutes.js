import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import ChatRoutes from './ChatRoutes';
import {Auth} from '../Screen';

const MainRoutes = () => {
  const isAuth = false;
  return (
    <NavigationContainer>
      {isAuth && <ChatRoutes />}
      {!isAuth && <Auth />}
    </NavigationContainer>
  );
};

export default MainRoutes;

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import ChatRoutes from './ChatRoutes';
import {Auth} from '../Screen';
import {useSelector} from 'react-redux';
import StartUp from '../Screen/StartUp';

const MainRoutes = () => {
  const isAuth = useSelector(
    state => state.auth.token !== null && state.auth.token !== '',
  );
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

  console.log('isAuth', isAuth);
  console.log('didTryAutoLogin', didTryAutoLogin);
  return (
    <NavigationContainer>
      {isAuth && <ChatRoutes />}
      {!isAuth && didTryAutoLogin && <Auth />}
      {!isAuth && !didTryAutoLogin && <StartUp />}
    </NavigationContainer>
  );
};

export default MainRoutes;

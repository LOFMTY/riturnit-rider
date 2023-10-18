import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';

import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {useAuthContext} from '../../context/AuthContext';
import {COLORS} from '../../constants';
import {PushNotifications} from '../../utilities';
import NoInternet from '../OtherComponents/NoInternet';

const AppNav = ({onBoarded}: any) => {
  const netInfo = useNetInfo();
  // console.log('network state', netInfo.isConnected?.toString());

  const {authUser, isLoading}: any = useAuthContext();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={COLORS.gradient2} />
      </View>
    );
  }

  if (netInfo.isConnected === false) {
    return <NoInternet />;
  }

  return (
    <NavigationContainer>
      <PushNotifications />
      {!authUser ? <AuthStack onBoarded={onBoarded} /> : <AppStack />}
    </NavigationContainer>
  );
};

export default AppNav;

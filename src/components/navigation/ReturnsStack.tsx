import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ReturnsStackNavigatorParamList} from '../../type/navigation';
import {ReturnLiveUpdates, Returns} from '../../screens';

const Stack = createNativeStackNavigator<ReturnsStackNavigatorParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Returns"
        component={Returns}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="ReturnLiveUpdates"
        component={ReturnLiveUpdates}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

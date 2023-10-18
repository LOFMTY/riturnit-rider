import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeStackNavigatorParamList} from '../../type/navigation';
import {Home} from '../../screens';

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

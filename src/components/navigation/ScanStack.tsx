import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Scan, ScanDetails} from '../../screens';
import {ScanStackNavigatorParamList} from '../../type/navigation';

const Stack = createNativeStackNavigator<ScanStackNavigatorParamList>();

const UploadStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Scan"
        component={Scan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ScanDetails"
        component={ScanDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default UploadStack;

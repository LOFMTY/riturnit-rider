import React from 'react';
import {Easing} from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {
  Store,
  InviteFriends,
  AccountDetails,
  TripList,
  AddressWork,
  AddressHome,
  Help,
  TripDetails,
  ContactList,
  AboutUs,
  ContactUs,
  PrivacyPolicy,
  ReturnCompleted,
  PaymentHistory,
  Notifications,
  ViewItems,
  Receipts,
  ReturnCreated,
  TripCart,
  AllReceipts,
  DestinationSearch,
  RouteDestination,
  ItemShipment,
  ReturnLiveUpdates,
  Wallet,
  AddToBalance,
  Success,
  AutoRefill,
} from '../../screens';
import BottomTabs from './BottomTabs';
import PaymentMethod from '../../screens/Profile/PaymentMethod';
import AddCard from '../../screens/Profile/AddCard';

const Stack = createSharedElementStackNavigator();
const options: any = {
  gestureEnabled: true,
  unmountOnBlur: true,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {duration: 300, easing: Easing.inOut(Easing.ease)},
    },
    close: {
      animation: 'timing',
      config: {duration: 300, easing: Easing.inOut(Easing.ease)},
    },
  },
  cardStyleInterpolator: ({current: {progress}}: any) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      detachInactiveScreens={false}>
      <Stack.Screen
        name="Home"
        component={BottomTabs}
        options={() => options}
      />
      <Stack.Screen name="Store" component={Store} options={() => options} />
      <Stack.Screen
        name="TripCart"
        component={TripCart}
        options={() => options}
      />
      <Stack.Screen
        name="ItemShipment"
        component={ItemShipment}
        options={() => options}
      />
      <Stack.Screen
        name="DestinationSearch"
        component={DestinationSearch}
        options={() => options}
      />
      <Stack.Screen
        name="RouteDestination"
        component={RouteDestination}
        options={() => options}
      />
      <Stack.Screen
        name="ReturnCreated"
        component={ReturnCreated}
        options={() => options}
      />
      <Stack.Screen
        name="ReturnCompleted"
        component={ReturnCompleted}
        options={() => options}
      />
      <Stack.Screen
        name="AccountDetails"
        component={AccountDetails}
        options={() => options}
      />
      <Stack.Screen
        name="AddressHome"
        component={AddressHome}
        options={() => options}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={() => options}
      />
      <Stack.Screen
        name="AddressWork"
        component={AddressWork}
        options={() => options}
      />
      <Stack.Screen
        name="TripList"
        component={TripList}
        options={() => options}
      />
      <Stack.Screen
        name="TripDetails"
        component={TripDetails}
        options={() => options}
      />
      <Stack.Screen name="Help" component={Help} options={() => options} />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={() => options}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={() => options}
      />
      <Stack.Screen
        name="Receipts"
        component={Receipts}
        options={() => options}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={() => options}
      />
      <Stack.Screen
        name="PaymentHistory"
        component={PaymentHistory}
        options={() => options}
      />
      <Stack.Screen
        name="AllReceipts"
        component={AllReceipts}
        options={() => options}
      />
      <Stack.Screen
        name="ReturnLiveUpdates"
        component={ReturnLiveUpdates}
        options={() => options}
      />
      <Stack.Screen
        name="InviteFriends"
        component={InviteFriends}
        options={() => options}
      />
      <Stack.Screen
        name="ContactList"
        component={ContactList}
        options={() => options}
      />
      <Stack.Screen name="Wallet" component={Wallet} options={() => options} />
      <Stack.Screen
        name="AutoRefill"
        component={AutoRefill}
        options={() => options}
      />
      <Stack.Screen
        name="AddToBalance"
        component={AddToBalance}
        options={() => options}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={() => options}
      />
      <Stack.Screen
        name="ViewItems"
        component={ViewItems}
        options={() => options}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
        options={() => options}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCard}
        options={() => options}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

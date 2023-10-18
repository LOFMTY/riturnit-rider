import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootNavigatorParamList = {
  reset: any;
  navigate: any;
  Auth: undefined;
  Home: undefined;
};

export type BottomTabNavigatorParamList = {
  navigate: any;
  HomeStack: undefined;
  Points: undefined;
  Upload: undefined;
  Returns: undefined;
  MyProfile: undefined;
};

export type HomeStackNavigatorParamList = {
  replace: any;
  push: any;
  dispatch: any;
  reset: any;
  goBack: any;
  navigate: any;
  Home: undefined;
  Store: { selectedStoreId: string; storeName: string; storeImage: string };
  TripCart: { selectedStoreId: string; storeName: string; storeImage: string };
  ItemShipment: undefined;
  DestinationSearch: undefined;
  RouteDestination: {
    userAddressCoords: number;
    storeDestinationCoords: number;
  };
  ReturnCreated: undefined;
  CancelRequest: undefined;
  ViewItems: { tripId: string };
  ReturnCompleted: {
    trip: string;
  };
  Returns: NavigatorScreenParams<ReturnsStackNavigatorParamList>;
};

export type ScanStackNavigatorParamList = {
  reset: any;
  navigate: any;
  HomeStack: undefined;
  Scan: undefined;
  ScanDetails: {
    image: string;
    name: string;
    description: string;
    price: any;
  };
};

export type ReturnsStackNavigatorParamList = {
  goBack: any;
  dispatch: any;
  reset: any;
  navigate: any;
  HomeStack: undefined;
  Returns: NavigatorScreenParams<BottomTabNavigatorParamList>;
  ReturnLiveUpdates: { trip: string };
};

export type ProfileStackNavigatorParamList = {
  navigate: any;
  goBack: any;
  Trips: undefined;
  Receipts: undefined;
  Profile: undefined;
  Account: { userId: string };
  AboutUs: undefined;
  InviteFriends: undefined;
  ContactUs: undefined;
  Notifications: undefined;
  ContactList: { inviteCode: string };
  Help: undefined;
  Wallet: NavigatorScreenParams<WalletStackNavigatorParamList>;
  TripList: undefined;
  TripDetails: {
    tripDetail?: string;
  };
  AllReceipts: {
    selectedStoreId: string;
    storeName: string;
  };
};

export type WalletStackNavigatorParamList = {
  goBack: any;
  reset: any;
  navigate: any;
  PaymentHistory: undefined;
  Wallet: undefined;
  AddToBalance: undefined;
  AutoRefill: undefined;
  GiftCard: undefined;
  Success: undefined;
};

export type AuthStackNavigatorParamList = {
  replace(arg0: string): unknown;
  goBack: any;
  navigate: any;
  OnBoarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ConfirmEmail: { email?: string };
  ForgotPassword: undefined;
  NewPassword: undefined;
};

// ---------NAVIGATION PROP------------

export type ReturnsNavigationProp = NativeStackNavigationProp<
  ReturnsStackNavigatorParamList,
  'Returns'
>;

export type MyProfileNavigationProp = BottomTabNavigationProp<
  BottomTabNavigatorParamList,
  'MyProfile'
>;

export type ProfiledNavigationProp = NativeStackNavigationProp<
  ProfileStackNavigatorParamList,
  'Account'
>;

export type SignInNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'SignIn'
>;

export type SignUpNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'SignUp'
>;

export type ConfirmEmailNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'ConfirmEmail'
>;

export type ForgotPasswordNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'ForgotPassword'
>;

export type NewPasswordNavigationProp = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  'NewPassword'
>;

export type ScanNavigationProp = NativeStackNavigationProp<
  ScanStackNavigatorParamList,
  'Scan'
>;

export type ScanDetailsNavigationProp = NativeStackNavigationProp<
  ScanStackNavigatorParamList,
  'ScanDetails'
>;

export type RouteDestinationNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'RouteDestination'
>;

export type TripDetailsNavigationProp = NativeStackNavigationProp<
  ProfileStackNavigatorParamList,
  'TripDetails'
>;

export type TripCartNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'TripCart'
>;

export type StoreNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'Store'
>;

export type AllReceiptsNavigationProp = NativeStackNavigationProp<
  ProfileStackNavigatorParamList,
  'AllReceipts'
>;

export type ReturnLiveUpdatesNavigationProp = NativeStackNavigationProp<
  ReturnsStackNavigatorParamList,
  'ReturnLiveUpdates'
>;

export type ReturnCompletedNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'ReturnCompleted'
>;

export type ContactListNavigationProp = NativeStackNavigationProp<
  ProfileStackNavigatorParamList,
  'ContactList'
>;

export type ViewItemsNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'ViewItems'
>;

// ----------ROUTE PROPS -----------

export type ScanDetailsRouteProp = RouteProp<
  ScanStackNavigatorParamList,
  'ScanDetails'
>;

export type ConfirmEmailRouteProp = RouteProp<
  AuthStackNavigatorParamList,
  'ConfirmEmail'
>;

export type RouteDestinationRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'RouteDestination'
>;

export type MyProfileRouteProp = RouteProp<
  BottomTabNavigatorParamList,
  'MyProfile'
>;

export type TripDetailsRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'TripDetails'
>;

export type StoreRouteProp = RouteProp<HomeStackNavigatorParamList, 'Store'>;
export type AllReceiptsRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'AllReceipts'
>;
export type TripCartRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'TripCart'
>;
export type ReturnCompletedRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'ReturnCompleted'
>;

export type ReturnLiveUpdatesRouteProp = RouteProp<
  ReturnsStackNavigatorParamList,
  'ReturnLiveUpdates'
>;

export type ContactListRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  'ContactList'
>;

export type ViewItemsRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'ViewItems'
>;

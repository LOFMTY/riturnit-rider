import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  View,
  StyleSheet,
  AppState,
  NativeModules,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {useQuery} from '@apollo/client';
import NetInfo from '@react-native-community/netinfo';

import {COLORS, SIZES, icons} from '../../constants';
import {Points, Profile, Returns} from '../../screens';
import {BottomTabNavigatorParamList} from '../../type/navigation';
import ScanStack from './ScanStack';
import HomeStack from './HomeStack';
import {useAuthContext} from '../../context/AuthContext';
import {ListTripsQuery, ListTripsQueryVariables} from '../../API';
import {listTrips} from '../../queries/Home/TripQueries';
import NoInternet from '../OtherComponents/NoInternet';

const Tabs = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabs = ({appTheme}: any) => {
  const [connection, setConnection] = useState<any>(true);

  const {userID} = useAuthContext();

  const {data} = useQuery<ListTripsQuery, ListTripsQueryVariables>(listTrips, {
    pollInterval: 100,
  });

  const tripLength: any =
    data?.listTrips?.items
      .filter(userId => userId?.userID === userID)
      .filter(
        ts => ts?.trip_status !== 'COMPLETED' && ts?.trip_status !== 'CANCELED',
      )
      .filter(ret => ret?.trip_status)
      .filter(trips => !trips?._deleted)
      .sort((a: any, b: any): any => a?.createdAt < b?.createdAt) || [];

  // Switching between different Wi-Fi does not send events in iOS
  useEffect(() => {
    const subAppState = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (Platform.OS === 'ios' && nextAppState == 'active') {
          let newNetInfo = await NativeModules.RNCNetInfo.getCurrentState(
            'wifi',
          );
          //your code here
          console.log('newnetInfo', newNetInfo);
        }
      },
    );

    const unsubNetState = NetInfo.addEventListener(state => {
      setConnection(state.isConnected);
    });

    return () => {
      if (subAppState) {
        subAppState.remove();
      }
      unsubNetState();
    };
  }, [connection]);

  if (!connection) {
    return <NoInternet />;
  }

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: appTheme.tabBackgroundColor,
          borderTopColor: 'transparent',
          borderTopLeftRadius: SIZES.padding,
          borderTopRightRadius: SIZES.padding,
          height: SIZES.height > 700 ? 85 : 75,
          ...styles.shadow,
        },
      }}>
      <Tabs.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  paddingTop: SIZES.radius,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FastImage
                  source={icons.home}
                  resizeMode={FastImage.resizeMode.contain}
                  tintColor={focused ? COLORS.gradient2 : COLORS.silver}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                {focused && (
                  <View
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: -10,
                      height: 5,
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      backgroundColor: COLORS.gradient1,
                    }}
                  />
                )}
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="Points"
        component={Points}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  paddingTop: SIZES.radius,
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: 10,
                }}>
                {focused ? (
                  <FastImage
                    source={icons.coins}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                      width: 32,
                      height: 32,
                      left: -13,
                    }}
                  />
                ) : (
                  <FastImage
                    source={icons.coinDark}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                      width: 30,
                      height: 30,
                      left: -13,
                    }}
                  />
                )}
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="Upload"
        component={ScanStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  paddingTop: SIZES.radius,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FastImage
                  source={icons.scan}
                  resizeMode={FastImage.resizeMode.contain}
                  tintColor={focused ? COLORS.gradient2 : COLORS.silver}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                {focused && (
                  <View
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: -10,
                      height: 5,
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      backgroundColor: COLORS.gradient1,
                    }}
                  />
                )}
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="Returns"
        component={Returns}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  paddingTop: SIZES.radius,
                  alignItems: 'center',
                  justifyContent: 'center',
                  right: 10,
                }}>
                <FastImage
                  source={icons.tracking}
                  resizeMode={FastImage.resizeMode.contain}
                  tintColor={focused ? COLORS.gradient2 : COLORS.silver}
                  style={{
                    width: 40,
                    height: 40,
                    left: 12,
                  }}
                />
                {focused && (
                  <View
                    style={{
                      position: 'absolute',
                      left: 13,
                      right: -13,
                      bottom: -10,
                      height: 5,
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      backgroundColor: COLORS.gradient1,
                    }}
                  />
                )}
              </View>
            );
          },
          tabBarBadge: tripLength.length,
        }}
      />
      <Tabs.Screen
        name="MyProfile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  paddingTop: SIZES.radius,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FastImage
                  source={icons.profile}
                  resizeMode={FastImage.resizeMode.contain}
                  tintColor={focused ? COLORS.gradient2 : COLORS.silver}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                {focused && (
                  <View
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: -10,
                      height: 5,
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      backgroundColor: COLORS.gradient1,
                    }}
                  />
                )}
              </View>
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.lightGray,
    shadowOffset: {
      width: 1,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 5,
  },
});

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(BottomTabs);

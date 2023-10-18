import React, {useEffect, useState, useRef} from 'react';
import {View, ActivityIndicator, StyleSheet, Alert} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useQuery} from '@apollo/client';
import {DataStore} from 'aws-amplify';

import {
  MapHeader,
  OnCenterButton,
  ItemShipmentSearch,
} from '../../../components';

import {COLORS, SIZES, icons} from '../../../constants';
import {HomeStackNavigatorParamList} from '../../../type/navigation';
import {useUserLocationContext} from '../../../context/UserLocationContext';
import {listDrivers} from '../../../queries/Profile/UserQueries';
import {ListDriversQuery, ListDriversQueryVariables} from '../../../API';
import {Driver} from '../../../models';

const ItemShipment = ({appTheme}: any) => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const mapRef = useRef<any>(null);

  const {currentLocation, userCurrentLocation} = useUserLocationContext();

  const [driver, setDriver] = useState<any>([]);

  const onCenter = () => {
    mapRef.current.animateToRegion(currentLocation, 500);
  };

  // List of active drivers
  const {data, loading} = useQuery<ListDriversQuery, ListDriversQueryVariables>(
    listDrivers,
    {pollInterval: 30},
  );

  useEffect(() => {
    let unmounted = false
    try {
      const listActiveDrivers =
        data?.listDrivers?.items
          .filter(oS => oS?.onlineStatus === true)
          .filter(trips => !trips?._deleted) || [];
      setDriver(listActiveDrivers);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
    return () => {
      unmounted = true;
    };
  }, [loading]);

  useEffect(() => {
    let unmounted = false;
    userCurrentLocation();
    return () => {
      unmounted = true;
    };
  }, []);

  // useEffect(() => {
  //   const subscription = DataStore.observe(Driver, driver?.id).subscribe(msg => {
  //     if (msg.opType === 'UPDATE') {
  //       setDriver(msg.element);
  //       // console.log(msg.element);
  //     }
  //   });
  //   return () => subscription.unsubscribe();
  // }, [driver]);

  // console.log('online drivers', driver);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.backgroundColor,
      }}>
      {currentLocation?.latitude ? (
        <View style={{flex: 1}}>
          <MapView
            ref={mapRef}
            showsUserLocation={true}
            initialRegion={currentLocation}
            showsCompass={false}
            showsMyLocationButton={false}
            followsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            customMapStyle={appTheme.mapStyle}
            style={[
              {width: SIZES.width, height: SIZES.height},
              StyleSheet.absoluteFill,
            ]}>
            {/* Cars Available */}
            {/* {driver.map(({lat, lng, id}: any) => (
              <Marker
                key={id}
                coordinate={{
                  latitude: lat || 0.00,
                  longitude: lng || 0.00,
                }}>
                <FastImage
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  tintColor={COLORS.gradient2}
                  resizeMode={FastImage.resizeMode.contain}
                  source={icons.mapCar}
                />
              </Marker>
            ))} */}
          </MapView>
        </View>
      ) : (
        <ActivityIndicator
          size="large"
          color={'#3580ff'}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}
        />
      )}
      <MapHeader
        left={true}
        icons={icons.back}
        onPress={() => navigation.goBack()}
      />
      <ItemShipmentSearch
        onPress={() => navigation.navigate('DestinationSearch')}
      />
      <OnCenterButton
        onPress={onCenter}
        icon={icons.focus}
        containerStyle={{top: 60}}
      />
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
  };
}

export default connect(mapStateToProps)(ItemShipment);

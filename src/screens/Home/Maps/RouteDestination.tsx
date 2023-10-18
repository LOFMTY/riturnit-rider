import React, {useCallback, useEffect, useMemo, useState, useRef} from 'react';
import {ActivityIndicator, Image, Animated, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {connect} from 'react-redux';
import BottomSheet from '@gorhom/bottom-sheet';

import {MapHeader, OnCenterButton, RouteDetails} from '../../../components';
import {hasLocationPermission} from '../../../utilities/service';
import {COLORS, SIZES, icons} from '../../../constants';
import {AppState} from 'react-native';
import {
  HomeStackNavigatorParamList,
  RouteDestinationRouteProp,
} from '../../../type/navigation';
import {GOOGLE_MAPS_APIKEY} from '../../../utilities/Utils';
import {useReturnContext} from '../../../context/ReturnContext';
import FastImage from 'react-native-fast-image';

const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const RouteDestination = ({appTheme}: any) => {
  const {
    pickupLat,
    pickupLng,
    dropoffLat,
    dropoffLng,
    setPickupLat,
    setPickupLng,
    setDropoffLat,
    setDropoffLng,
    setPickupLDescription,
    setDropoffDescription,
    totalKm,
    setTotalKm,
    totalMinutes,
    setTotalMinutes,
  }: any = useReturnContext();

  const navigation = useNavigation<HomeStackNavigatorParamList>();
  const route = useRoute<RouteDestinationRouteProp>();

  const mapRef = useRef<any>(null);
  const appState = useRef<any>(AppState.currentState);
  const fadeAnim = useRef<any>(new Animated.Value(0)).current;

  const [currentLocation, setCurrentLocation] = useState<any>(initialState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const {userAddressCoords, storeDestinationCoords}: any = route.params;

  const {description: userLocationDescription} = userAddressCoords;
  const {lat: storeLat, lng: storeLng} = storeDestinationCoords.location;
  const {description: storeLocationDescription} = storeDestinationCoords;
  const {lat: userLat, lng: userLng} = userAddressCoords.location;

  const bottomSheetRef = useRef(null);
  const snapPoints2 = useMemo(() => ['37%', '10%'], []);
  const handleSheetChanges = useCallback((index: any) => {
    return index;
  }, []);

  const userLoc = {
    latitude: pickupLat,
    longitude: pickupLng,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
    description: userLocationDescription,
  };

  const destinationLoc = {
    latitude: dropoffLat,
    longitude: dropoffLng,
    description: storeLocationDescription,
  };

  const onCenter = () => {
    mapRef.current.animateToRegion(
      {
        ...currentLocation,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      1000,
    );
  };

  const onRouteCenter = () => {
    mapRef.current.animateToRegion(userLoc, 1000);
  };

  const userCurrentLocation = async () => {
    let hasPermission = await hasLocationPermission();
    if (!hasPermission) {
      return;
    }
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({
          ...currentLocation,
          latitude: latitude,
          longitude: longitude,
        });
      },
      error => {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Location Error',
          textBody: `Can\'t find your current location, ${error}`,
          autoClose: 1500,
        });
        setCurrentLocation(null);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  useEffect(() => {
    let unmounted = false;
    userCurrentLocation();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      // delay: 400,
      useNativeDriver: true,
    }).start();
    return () => {
      unmounted = true;
    };
  }, [fadeAnim]);

  useEffect(() => {
    let unmounted = false
    setPickupLat(userLat);
    setPickupLng(userLng);
    setDropoffLat(storeLat);
    setDropoffLng(storeLng);
    setPickupLDescription(userLocationDescription);
    setDropoffDescription(storeLocationDescription);
    return () => {
      unmounted = true;
    };
  }, [
    storeLocationDescription,
    userLocationDescription,
    storeLat,
    storeLng,
    userLat,
    userLng,
  ]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange => {
        if (
          appState.current.match(/inactive|background/) &&
          handleAppStateChange === 'active'
        ) {
          // console.log('App has come to foreground!');
          userCurrentLocation();
        }

        appState.current = handleAppStateChange;
        setAppStateVisible(handleAppStateChange);
      },
    );
    return () => {
      subscription?.remove();
    };
  }, [appStateVisible]);

  return (
    <Root>
      <Animated.View style={{flex: 1, opacity: fadeAnim}}>
        {currentLocation?.latitude ? (
          <MapView
            ref={mapRef}
            style={[
              {width: SIZES.width, height: SIZES.height},
              StyleSheet.absoluteFill,
            ]}
            showsUserLocation={true}
            showsMyLocationButton={false}
            provider={PROVIDER_GOOGLE}
            initialRegion={currentLocation}
            showsScale={false}
            customMapStyle={appTheme.mapStyle}>
            {Object.keys(userLoc).length > 0 && (
              <MapViewDirections
                ref={mapRef}
                origin={userLoc}
                destination={destinationLoc}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={5}
                timePrecision="now"
                optimizeWaypoints={true}
                strokeColor={COLORS.gradient2}
                onReady={result => {
                  setTotalMinutes(result.duration);
                  setTotalKm(result.distance / 1.609);
                  // Fit route into maps
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: SIZES.width / 10,
                      bottom: SIZES.height / 4,
                      left: SIZES.width / 10,
                      top: SIZES.height / 8,
                    },
                  });
                }}
                onError={() =>
                  Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Address unavailable',
                    textBody: 'The address does not exist. Kindly recheck your address',
                    autoClose: 2500,
                  })
                }
              />
            )}

            {/* user location coordinates & marker */}
            {Object.keys(userLoc).length > 0 && (
              <Marker
                coordinate={{
                  latitude: pickupLat,
                  longitude: pickupLng,
                }}
                description={userLocationDescription}>
                <Image
                  source={icons.userLocation}
                  style={{height: 40, width: 40}}
                />
              </Marker>
            )}

            {/* Store Destination Coordinates & Marker */}
            {Object.keys(destinationLoc).length > 0 && (
              <Marker
                coordinate={{
                  latitude: dropoffLat,
                  longitude: dropoffLng,
                }}
                description={storeLocationDescription}>
                <FastImage
                  source={icons.locationPin}
                  style={{height: 40, width: 40}}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </Marker>
            )}
          </MapView>
        ) : (
          <ActivityIndicator
            size="large"
            color={'#3580ff'}
            style={{flex: 1, backgroundColor: 'transparent'}}
          />
        )}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints2}
          backgroundStyle={{backgroundColor: appTheme.bottomSheet}}
          handleIndicatorStyle={{backgroundColor: appTheme.textColor}}
          onChange={handleSheetChanges}>
          <RouteDetails totalKm={totalKm} totalMinutes={totalMinutes} />
        </BottomSheet>

        <MapHeader
          left={true}
          icons={icons.back}
          onPress={() => navigation.goBack()}
        />
        <OnCenterButton onPress={onCenter} icon={icons.focus} />
        <OnCenterButton
          onPress={onRouteCenter}
          containerStyle={{top: SIZES.height > 700 ? 150 : 130}}
          icon={icons.route}
        />
      </Animated.View>
    </Root>
  );
};

function mapStateToProps(state: {themeReducer: {appTheme: any}; error: any}) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}
export default connect(mapStateToProps)(RouteDestination);

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {connect} from 'react-redux';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';
import {DataStore} from 'aws-amplify';
import BottomSheet from '@gorhom/bottom-sheet';
import {useMutation} from '@apollo/client';

import {
  ReturnsStackNavigatorParamList,
  ReturnLiveUpdatesRouteProp,
} from '../../type/navigation';
import {CancelModal, MapHeader, OnCenterButton} from '../../components';
import {COLORS, SIZES, icons} from '../../constants';
import {Driver as Courier, Trips} from '../../models';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '../../utilities/Utils';
import {updateTrips} from '../../queries/Home/TripQueries';
import {
  UpdateTripsMutation,
  UpdateTripsMutationVariables,
  TripStatus,
} from '../../API';
import RiturningItems from './RiturningItems';
import FoundDriver from './FoundDriver';
import FindingDriver from './FindingDriver';
import {useReturnContext} from '../../context/ReturnContext';
import {timeConvert} from '../../utilities/service';

const ReturnLiveUpdates = ({appTheme}: any) => {
  const navigation = useNavigation<ReturnsStackNavigatorParamList>();
  const route = useRoute<ReturnLiveUpdatesRouteProp>();

  const {totalMinutes, totalKm, setTotalMinutes, setTotalKm}: any =
    useReturnContext();
  const {
    id,
    Driver,
    dropoff_location_description,
    pickup_location_description,
    dropoff_lat,
    dropoff_lng,
    pickup_lat,
    pickup_lng,
    trip_status,
    driver_name,
    driver_car_color,
    driver_car_make,
    driver_car_model,
    driver_car_plate_number,
    driver_rating,
    driver_photo,
    _version,
  }: any = route.params.trip;

  const mapRef = useRef<any>(null);
  const bottomSheetRef = useRef<any>(null);

  const snapPoints = useMemo(() => ['29%', '15%'], []);
  const snapPoints4 = useMemo(() => ['32%', '15%'], []);

  const bottomSheetChange = useCallback((index: any) => {
    return index;
  }, []);

  const [driver, setDriver] = useState<any>([]);
  const [returns, setReturns] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // UPDATE RETURN TRIP - ACCEPT TRIP
  const [doUpdateTrips] = useMutation<
    UpdateTripsMutation,
    UpdateTripsMutationVariables
  >(updateTrips);

  // UPDATE RETURN TRIP - CANCELED
  const cancelTrip = async () => {
    try {
      const res = await doUpdateTrips({
        variables: {
          input: {
            id: id,
            trip_status: TripStatus.CANCELED,
            _version: _version,
          },
        },
      });
      // console.log('CANCELED TRIP', res);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  // CALL DRIVER
  const callDriver = () => {
    Linking.openURL('driver_mobile_number');
  };

  // Cancel Ride
  const cancelRide = () => {
    cancelTrip();
    navigation.goBack();
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    let unmounted = false;
    setReturns(id);
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    if (!returns) {
      return;
    }
    const subscription = DataStore.observe(Trips, returns?.id).subscribe(
      msg => {
        if (msg.opType === 'UPDATE') {
          setReturns(msg.element);
        }
      },
    );
    return () => subscription.unsubscribe();
  }, [returns]);

  useEffect(() => {
    let unmounted = false;
    if (Driver) {
      setDriver(Driver);
    }
    return () => {
      unmounted = true;
    };
  }, [Driver]);

  useEffect(() => {
    if (!driver) {
      return;
    }
    const subscription = DataStore.observe(Courier, driver?.id).subscribe(
      msg => {
        if (msg.opType === 'UPDATE') {
          setDriver(msg.element);
        }
      },
    );
    return () => subscription.unsubscribe();
  }, [driver]);

  //OBSERVE OR SUBSCRIBE TO MAP VIEW DIRECTION
  useEffect(() => {
    let unmounted = false;
    if (driver?.lat && driver?.lng) {
      mapRef.current.animateToRegion({
        latitude: driver?.lat,
        longitude: driver?.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
    return () => {
      unmounted = true;
    };
  }, [driver?.lat, driver?.lng]);

  const onCenter = () => {
    trip_status == 'NEW'
      ? mapRef.current.animateToRegion(
          {
            latitude: parseFloat(pickup_lat),
            longitude: parseFloat(pickup_lng),
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          },
          500,
        )
      : mapRef.current.animateToRegion(
          {
            latitude: driver?.lat,
            longitude: driver?.lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          },
          500,
        );
  };

  useEffect(() => {
    let unmounted = false;
    if (trip_status === 'COMPLETED') {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: 'ReturnCompleted',
              params: {
                trip: route.params.trip,
              },
            },
          ],
        }),
      );
    }
    return () => {
      unmounted = true;
    };
  }, [trip_status == 'COMPLETED']);

  // STORE LOCATION
  const destinationLoc = {
    latitude: parseFloat(dropoff_lat),
    longitude: parseFloat(dropoff_lng),
    description: dropoff_location_description,
  };

  // USER LOCATION
  const userLoc: any = {
    latitude: parseFloat(pickup_lat),
    longitude: parseFloat(pickup_lng),
    latitudeDelta: 0.07,
    longitudeDelta: 0.07,
  };

  // DRIVER LOCATION
  const driverLoc = {
    latitude: parseFloat(Driver?.lat),
    longitude: parseFloat(Driver?.lng),
    description: pickup_location_description,
  };

  return (
    <Root>
      <View
        style={{
          flex: 1,
          backgroundColor: appTheme.backgroundColor,
        }}>
        <CancelModal
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          noCancel={() => setModalVisible(!modalVisible)}
          confirmCancel={cancelRide}
        />

        {driverLoc ? (
          <View style={{flex: 1}}>
            <MapView
              ref={mapRef}
              userLocationPriority="high"
              showsCompass={false}
              showsUserLocation={true}
              followsUserLocation={true}
              initialRegion={trip_status == 'NEW' ? userLoc : null}
              showsMyLocationButton={false}
              provider={PROVIDER_GOOGLE}
              customMapStyle={appTheme.mapStyle}
              style={[
                {width: SIZES.width, height: SIZES.height},
                StyleSheet.absoluteFill,
              ]}>
              {driverLoc && (
                <MapViewDirections
                  ref={mapRef}
                  origin={trip_status == 'NEW' ? userLoc : driverLoc}
                  destination={destinationLoc}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={5}
                  timePrecision="now"
                  optimizeWaypoints={true}
                  strokeColor={COLORS.gradient2}
                  splitWaypoints={true}
                  waypoints={trip_status === 'NEW' ? [userLoc] : []}
                  // waypoints={
                  //   trip_status === 'ACCEPTED' && 'NEW' ? [userLoc] : []
                  // }
                  onReady={result => {
                    setTotalMinutes(result.duration);
                    setTotalKm(result.distance / 1.609);
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
                    trip_status == 'NEW'
                      ? null
                      : Toast.show({
                          type: ALERT_TYPE.DANGER,
                          title: 'Error',
                          textBody: 'Route unavailable',
                          autoClose: 700,
                        })
                  }
                />
              )}

              {/* DRIVER CURRENT LOCATION */}
              {driver?.lat && (
                <Marker
                  coordinate={{
                    latitude: driver?.lat,
                    longitude: driver?.lng,
                  }}>
                  <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    tintColor={COLORS.gradient2}
                    style={{
                      width: 40,
                      height: 40,
                    }}
                    source={icons.mapCar}
                  />
                </Marker>
              )}

              {/* user location coordinates & marker */}
              {driverLoc && (
                <Marker
                  coordinate={{
                    latitude: pickup_lat,
                    longitude: pickup_lng,
                  }}
                  description={pickup_location_description}>
                  <FastImage
                    source={icons.userLocation}
                    style={{height: 40, width: 40}}
                  />
                </Marker>
              )}

              {/* Store Destination Coordinates & Marker */}
              {driverLoc && (
                <Marker
                  coordinate={{
                    latitude: dropoff_lat,
                    longitude: dropoff_lng,
                  }}
                  description={dropoff_location_description}>
                  <FastImage
                    source={icons.locationPin}
                    style={{height: 40, width: 40}}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </Marker>
              )}
            </MapView>
          </View>
        ) : (
          <ActivityIndicator
            size="large"
            color={COLORS.gradient2}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
            }}
          />
        )}

        {trip_status == 'NEW' ? (
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints4}
            backgroundStyle={{backgroundColor: appTheme.bottomSheet}}
            handleIndicatorStyle={{backgroundColor: appTheme.textColor}}
            onChange={bottomSheetChange}>
            <FindingDriver onPress={() => setModalVisible(!modalVisible)} />
          </BottomSheet>
        ) : trip_status == 'ACCEPTED' ? (
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints4}
            backgroundStyle={{backgroundColor: appTheme.bottomSheet}}
            handleIndicatorStyle={{backgroundColor: appTheme.textColor}}
            onChange={bottomSheetChange}>
            <FoundDriver
              callDriver={callDriver}
              onCancel={() => setModalVisible(!modalVisible)}
              driverImg={driver_photo}
              time={timeConvert(totalMinutes.toFixed(1))}
              driverRating={driver_rating}
              carColor={driver_car_color}
              carMake={driver_car_make}
              carModel={driver_car_model}
              plateNumber={driver_car_plate_number}
              driverName={driver_name}
              distance={totalKm}
              onPress={() => navigation.navigate('ViewItems', {tripId: id})}
            />
          </BottomSheet>
        ) : trip_status == 'PICKED_UP' ? (
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            backgroundStyle={{backgroundColor: appTheme.bottomSheet}}
            handleIndicatorStyle={{backgroundColor: appTheme.textColor}}
            onChange={bottomSheetChange}>
            <RiturningItems
              distance={totalKm}
              time={timeConvert(totalMinutes.toFixed(1))}
            />
          </BottomSheet>
        ) : (
          <></>
        )}

        <MapHeader
          left={true}
          icons={icons.back}
          onPress={() => navigation.goBack()}
        />

        {trip_status == 'NEW' ? (
          <OnCenterButton onPress={onCenter} icon={icons.focus} />
        ) : (
          <OnCenterButton onPress={onCenter} icon={icons.route} />
        )}
      </View>
    </Root>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
  };
}

export default connect(mapStateToProps)(ReturnLiveUpdates);

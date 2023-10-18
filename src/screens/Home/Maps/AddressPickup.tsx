import React, {useState, useEffect} from 'react';
import {Alert, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {connect} from 'react-redux';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import FastImage from 'react-native-fast-image';

navigator.geolocation = require('react-native-geolocation-service');

import {SIZES, icons} from '../../../constants';
import { PlaceRow } from '../../../components';

const AddressPickup = ({
  placheholderText,
  fetchAddress,
  containerStyle,
  appTheme,
}: any) => {
  const [homeAddress, setHomeAddress] = useState<any>();
  const [workAddress, setWorkAddress] = useState<any>();

  const onPressAddress = (data: any, details: any) => {
    const coords = details.geometry.location;
    const desc = data.description;
    fetchAddress(coords, desc);
  };

  useEffect(() => {
    let unmounted = false;
    const getHomeAddress = async () => {
      await AsyncStorage.getItem('homeAddress').then((value: any) => {
        return setHomeAddress(JSON.parse(value));
      });
    };
    getHomeAddress();
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    let unmounted = false;
    const getWorkAddress = async () => {
      await AsyncStorage.getItem('workAddress').then((value: any) => {
        return setWorkAddress(JSON.parse(value));
      });
    };
    getWorkAddress();
    return () => {
      unmounted = true;
    };
  }, []);


  // console.log('home Address', homeAddress);
  // console.log('work Address', workAddress);

  const homePlace = {
    description: 'Home',
    geometry: {location: {lat: homeAddress?.lat, lng: homeAddress?.lng}},
  };

  const workPlace = {
    description: 'Work',
    geometry: {location: {lat: workAddress?.lat, lng: workAddress?.lng}},
  };

  return (
    <>
      <GooglePlacesAutocomplete
        placeholder={placheholderText}
        minLength={4}
        autoFillOnNotFound={true}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        currentLocation={true}
        currentLocationLabel="Current location"
        enablePoweredByContainer={false}
        suppressDefaultStyles
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        fetchDetails={true}
        predefinedPlaces={[homePlace, workPlace]}
        onTimeout={() =>
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: 'Warning',
            textBody: 'Request Timeout',
            autoClose: 1000,
          })
        }
        onFail={() =>
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Warning',
            textBody: 'Address Failed',
            autoClose: 1000,
          })
        }
        onNotFound={() =>
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: 'Warning',
            textBody: 'Address Not Found',
            autoClose: 1000,
          })
        }
        // renderDescription={data => data.description}
        renderRow={data => <PlaceRow data={data} />}
        onPress={onPressAddress}
        query={{
          key: 'AIzaSyDPMHmRw3LbdXZCfrLu7DxmhDgv2u_9SKU',
          language: 'en',
          // components: 'country:us'
        }}
        styles={{...containerStyle}}
        textInputProps={{
          placeholderTextColor: appTheme.inputColor,
        }}
      />

      <FastImage
        source={icons.userLocation}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          position: 'absolute',
          top: 6,
          width: 23,
          height: 23,
          marginTop: SIZES.radius,
        }}
      />

      {/* Vertical Dashed line */}
      <View
        style={{
          width: 1,
          height: 40,
          backgroundColor: appTheme.textColor,
          position: 'absolute',
          top: 40,
          left: 10,
        }}
      />

      {/* User Destination Icons */}
      <FastImage
        source={icons.placeholder}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          position: 'absolute',
          top: 68,
          width: 23,
          height: 23,
          marginTop: SIZES.radius,
        }}
      />
    </>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(AddressPickup);

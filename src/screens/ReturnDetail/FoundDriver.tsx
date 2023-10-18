import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {Storage} from 'aws-amplify';

import {COLORS, SIZES, FONTS, icons} from '../../constants';
import {IconButton, Rating, TextButton} from '../../components';
import {DEFAULT_PROFILE_IMG} from '../../utilities/Utils';

const FoundDriver = ({
  appTheme,
  callDriver,
  onCancel,
  driverRating,
  onPress,
  driverName,
  plateNumber,
  carColor,
  carMake,
  carModel,
  time,
  distance,
  totalKm,
  driverImg,
}: any) => {
  const [imageUri, setImageUri] = useState<any>(null);
  const [driverStatus, setDriverStatus] = useState('We found you a Driver');
  const [driverTime, setDriverTime] = useState(null);

  const isDriverClose = totalKm <= 0.05; // decrease km for higher accuracy

  useEffect(() => {
    let unmounted = false
    if (driverImg) {
      Storage.get(driverImg).then(setImageUri);
    }
    return () => {
      unmounted = true;
    };
  }, [driverImg]);

  useEffect(() => {
    let unmounted = false
    setTimeout(() => {
      setDriverStatus('Your driver is coming');
      setDriverTime(time);
    }, 4000);
    return () => {
      unmounted = true;
    };
  }, []);

  // useEffect(() => {
  //   if (isDriverClose) {
  //     setDriverStatus(
  //       `Your Driver is here! Kindly hand over your items and receipt to the Driver within 10 minutes.`,
  //     );
  //     setDriverTime(null);
  //   }
  // }, [driverStatus]);

  return (
    <View
      style={{
        paddingHorizontal: SIZES.margin,
      }}>
      {/* Found a Driver text */}
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: appTheme.textColor,
            paddingHorizontal: SIZES.margin,
            ...FONTS.body3,
            fontWeight: '600',
          }}>
          {driverStatus}
        </Text>

        {driverTime ? (
          <Text
            style={{
              paddingTop: 5,
              textAlign: 'center',
              color: COLORS.scarlet,
              ...FONTS.body3,
            }}>
            Driver will pickup items in {''}
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.scarlet,
                fontWeight: '500',
                ...FONTS.body3,
              }}>
              {time} - {distance.toFixed(2)} mi
            </Text>
          </Text>
        ) : null}
      </View>

      {/* Found Driver Profile Photo & Rating */}
      <View
        style={{
          paddingTop: SIZES.radius,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* Driver Profile Photo */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <FastImage
            source={{uri: imageUri || DEFAULT_PROFILE_IMG}}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: 55,
              height: 55,
              borderRadius: SIZES.padding * 2,
              borderWidth: 0.5,
              borderColor: COLORS.gradient2,
            }}
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            paddingLeft: SIZES.base,
          }}>
          {/* Driver Name */}
          <Text
            style={{
              color: appTheme.textColor,
              fontWeight: '500',
              ...FONTS.h5,
            }}>
            {driverName}
          </Text>

          {/* Driver Rating */}
          <Rating rate={driverRating} containerStyle={{paddingTop: 6}} />

          {/* Driver Car Details */}
          <Text
            style={{
              paddingTop: 6,
              color: appTheme.inputColor,
              fontWeight: '500',
            }}>
            {carColor}{' '}
            <Text
              style={{
                paddingTop: 6,
                color: appTheme.inputColor,
                fontWeight: '500',
              }}>
              {carMake}
            </Text>{' '}
            <Text
              style={{
                paddingTop: 6,
                color: appTheme.inputColor,
                fontWeight: '500',
              }}>
              {carModel}
              {' - '}
            </Text>
            <Text
              style={{
                paddingTop: 6,
                color: appTheme.textColor,
                fontWeight: '500',
                ...FONTS.body3,
              }}>
              {plateNumber}
            </Text>
          </Text>
        </View>

        {/* call icon button */}
        <IconButton
          icon={icons.phoneCall}
          containerStyle={{
            backgroundColor: COLORS.gradient2,
            justifyContent: 'center',
            marginRight: 10,
            height: 40,
            width: 40,
            borderRadius: 100 / 2,
            top: 8,
          }}
          onPress={callDriver}
          iconStyle={{left: 10, width: 20, height: 20}}
        />
      </View>

      {/* View Items */}
      <TouchableOpacity style={{marginTop: SIZES.base}} onPress={onPress}>
        <Text
          style={{
            color: COLORS.gradient2,
            fontWeight: '500',
            ...FONTS.body3,
          }}>
          View returning items
        </Text>
      </TouchableOpacity>

      {/* Horizontal Rule */}
      <View
        style={{
          alignSelf: 'center',
          marginTop: SIZES.base,
          width: '95%',
          borderWidth: 0.3,
          borderColor: COLORS.silver,
        }}
      />

      {/* Call & Message Button  */}
      <View
        style={{
          margin: SIZES.radius,
        }}>
        <TextButton
          label={'Cancel'}
          labelStyle={{color: COLORS.white, ...FONTS.h5}}
          buttonContainerStyle={{
            marginTop: 2,
            height: 45,
            width: 250,
            alignSelf: 'center',
            backgroundColor: COLORS.gradient2,
          }}
          onPress={onCancel}
        />
      </View>
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
  };
}

export default connect(mapStateToProps)(FoundDriver);

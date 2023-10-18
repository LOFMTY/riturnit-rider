import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {Storage} from 'aws-amplify';
import dayjs from 'dayjs';

import {COLORS, SIZES, icons, FONTS} from '../../../constants';
import {
  TripHeader,
  DriverDetailsModal,
  TextButton,
  TripDetailAddress,
  TripCost,
} from '../../../components';
import {
  ProfileStackNavigatorParamList,
  TripDetailsRouteProp,
} from '../../../type/navigation';

const TripDetails = ({appTheme}: any) => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const route = useRoute<TripDetailsRouteProp | any>();
  const {tripDetail}: any = route.params;

  const [imageUri, setImageUri] = useState<any>(null);
  const [showDriverDetailsModal, setShowDriverDetailsModal] =
    useState<any>(false);

  useEffect(() => {
    let unmounted = false;
    if (tripDetail.driver_photo) {
      Storage.get(tripDetail.driver_photo).then(setImageUri);
    }
    return () => {
      unmounted = true;
    };
  }, [tripDetail.driver_photo]);

  function renderTripHeaderDetails() {
    return (
      <View
        style={{
          marginTop: SIZES.margin,
          paddingHorizontal: SIZES.padding,
        }}>
        {/* Trip Track Details */}
        <TripDetailAddress
          time={tripDetail?.date}
          address={tripDetail?.pickup_location_description}
          icon={icons.startPoint}
        />

        {/* Vertical Dashed line */}
        <FastImage
          source={icons.dottedLine}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: 3,
            height: 40,
            marginLeft: 11,
            top: -20,
          }}
          tintColor={COLORS.gradient2}
        />

        <TripDetailAddress
          time={tripDetail?.date}
          address={tripDetail?.dropoff_location_description}
          icon={icons.placeholder}
          containerStyle={{marginTop: -SIZES.padding}}
        />
      </View>
    );
  }

  function renderDriverDetails() {
    return (
      <View style={{marginTop: SIZES.base}}>
        {/* // TRIP STATUS */}
        <View
          style={{
            marginHorizontal: SIZES.margin,
          }}>
          <Text style={{...FONTS.h5, color: appTheme.textColor}}>
            Trip Status:{' '}
            <Text
              style={{
                ...FONTS.h5,
                color:
                  tripDetail?.trip_status === 'COMPLETED'
                    ? COLORS.caribbeanGreen
                    : COLORS.scarlet,
              }}>
              {tripDetail?.trip_status}
            </Text>
          </Text>
        </View>

        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: 'row',
            marginHorizontal: SIZES.margin,
            justifyContent: 'space-between',
          }}>
          {/* Driver Image */}
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setShowDriverDetailsModal(true)}>
            <FastImage
              source={{uri: imageUri}}
              resizeMode={FastImage.resizeMode.cover}
              style={{
                width: 80,
                height: 80,
                borderRadius: 160,
                borderWidth: 2,
                borderColor: COLORS.gradient2,
              }}
            />
          </TouchableOpacity>

          {/* Driver Name */}
          <View
            style={{
              flex: 1,
              paddingLeft: SIZES.height > 700 ? 10 : SIZES.base,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: appTheme.textColor,
                ...FONTS.body3,
              }}>
              Items returned with
              <Text
                style={{
                  color: appTheme.textColor,
                  ...FONTS.body3,
                  fontWeight: '500',
                }}>
                {tripDetail?.driver_name}
              </Text>
            </Text>
            {/* View Returned Item Button */}
            <TextButton
              label={'View Returned Items'}
              labelStyle={{color: COLORS.gradient1, ...FONTS.h6}}
              buttonContainerStyle={{
                height: 30,
                marginRight: SIZES.padding * 5,
                backgroundColor: null,
              }}
              onPress={() =>
                navigation.navigate('ViewItems', {tripId: tripDetail?.id})
              }
            />
          </View>
        </View>
      </View>
    );
  }

  function renderItemCostDetails() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          paddingTop: SIZES.padding * 1.2,
        }}>
        {/* Payment Title */}
        <View style={{justifyContent: 'center'}}>
          {/* Riturnit Date */}
          <Text
            style={{
              ...FONTS.h5,
              letterSpacing: 0.2,
              color: appTheme.textColor,
            }}>
            Amount Charged
          </Text>
        </View>

        {/* Horizontal Rule */}
        <View
          style={{
            paddingTop: 15,
            borderBottomWidth: 0.4,
            borderColor: appTheme.buttonText,
          }}
        />

        {/* Delivery Fee */}
        <TripCost
          title="Return fee"
          amount={
            tripDetail?.trip_status === 'CANCELED'
              ? `No Charge`
              : `$${parseFloat(tripDetail?.trip_cost).toFixed(2)}`
          }
          containerStyle={{paddingTop: SIZES.radius}}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.backgroundColor,
      }}>
      <TripHeader
        title={tripDetail?.TotalQtyItems}
        date={dayjs(tripDetail?.updatedAt).format(
          'ddd, MMMM DD, YYYY @ HH:mm A',
        )}
        storeImage={tripDetail?.store_image}
        storeName={tripDetail?.store_name}
      />
      {renderTripHeaderDetails()}
      {showDriverDetailsModal ? (
        <DriverDetailsModal
          isVisible={showDriverDetailsModal}
          onClose={() => setShowDriverDetailsModal(false)}
          driverImage={tripDetail?.driver_photo}
          driverName={tripDetail?.driver_name}
          plateNumber={tripDetail?.driver_car_plate_number}
          vehicleType={`${tripDetail?.driver_car_color} ${tripDetail?.driver_car_make} ${tripDetail?.driver_car_model}`}
        />
      ) : (
        <View />
      )}
      {renderDriverDetails()}
      {renderItemCostDetails()}
    </View>
  );
};

function mapStateToProps(state: {themeReducer: {appTheme: any}; error: any}) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(TripDetails);

import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import dayjs from 'dayjs';

import {SIZES, FONTS, icons} from '../../constants';
import {DEFAULT_IMAGE} from '../../utilities/Utils';

const ReturnStoreItem = ({
  appTheme,
  status,
  createdAt,
  price,
  onPress,
  statusColor,
  store_image,
  pickUp,
  dropOff,
}: any) => {
  return (
    <TouchableOpacity
      style={{
        marginHorizontal: SIZES.base,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: SIZES.base,
        backgroundColor: appTheme.cardBackgroundColor,
        alignItems: 'center',
        marginTop: SIZES.radius,
        paddingHorizontal: SIZES.base,
        borderRadius: SIZES.radius,
      }}
      onPress={onPress}>
      {/* Item Image */}
      <View
        style={{
          justifyContent: 'center',
        }}>
        <FastImage
          source={{uri: store_image || DEFAULT_IMAGE}}
          style={{
            width: 60,
            height: 60,
            borderRadius: SIZES.base,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      {/* Store Location */}
      <View
        style={{
          marginLeft: SIZES.base,
          justifyContent: 'center',
          flex: 1,
        }}>
        <View
          style={{
            marginTop: 4,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              source={icons.storeAddress}
              style={{
                width: 25,
                height: 25,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>

          <View style={{flex: 1, marginLeft: 5, justifyContent: 'center'}}>
            <Text
              numberOfLines={3}
              style={{
                ...FONTS.body4,
                color: appTheme.buttonText,
              }}>
              {dropOff}
            </Text>
          </View>
        </View>

        {/* User Location */}
        <View
          style={{
            marginTop: 4,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              source={icons.userLocation}
              style={{
                width: 25,
                height: 25,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={{flex: 1, marginLeft: 5, justifyContent: 'center'}}>
            <Text
              numberOfLines={3}
              style={{
                ...FONTS.body4,
                color: appTheme.buttonText,
              }}>
              {pickUp}
            </Text>
          </View>

          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.body2,
                fontWeight: '500',
                color: appTheme.textColor,
              }}>
              ${parseFloat(price).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Price, Quantity  */}
        <View
          style={{
            paddingTop: 4,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              source={icons.period}
              style={{
                width: 20,
                height: 20,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View
            style={{flex: 1, marginLeft: SIZES.base, justifyContent: 'center'}}>
            <Text
              style={{
                paddingTop: 2,
                color: appTheme.textColor,
                ...FONTS.body3,
                fontWeight: '500',
              }}>
              {dayjs(createdAt).format('DD MMM - h:mm A ')} |{' '}
              <Text
                style={{
                  color: statusColor,
                  ...FONTS.body3,
                  fontWeight: '500',
                }}>
                {status}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(ReturnStoreItem);

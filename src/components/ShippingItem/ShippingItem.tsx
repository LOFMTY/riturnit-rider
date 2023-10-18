import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';

const ShippingItem = ({deleteItem, qty, title, img, expiry, appTheme}: any) => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        borderRadius: SIZES.padding,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        backgroundColor: appTheme.cardBackgroundColor,
      }}>
      {/* Item FastImage */}
      <View style={{justifyContent: 'center'}}>
        <FastImage
          source={img}
          resizeMode={FastImage.resizeMode.cover}
          style={{
            width: 55,
            height: 55,
            borderRadius: SIZES.radius,
          }}
        />
      </View>

      {/* Item Details */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          marginHorizontal: SIZES.radius,
        }}>
        {/* Title */}
        <Text
          style={{
            ...FONTS.body1,
            color: appTheme.textColor,
            fontWeight: '500',
            letterSpacing: 0.5,
          }}>
          {title}
        </Text>

        {/* Expiry */}
        <Text
          style={{
            ...FONTS.body3,
            color: appTheme.textColor,
          }}>
          Expires in:{' '}
          {
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: '500',
                color: COLORS.red,
              }}>
              {expiry} day(s)
            </Text>
          }
        </Text>

        {/* Price, Quantity */}
        <Text
          style={{
            color: COLORS.gray,
            ...FONTS.body2,
            fontWeight: '500',
            letterSpacing: 0.2,
          }}>
          {qty} item(s)
        </Text>
      </View>

      {/* Select Item */}
      <TouchableOpacity onPress={deleteItem}>
        <FastImage
          source={icons.remove}
          resizeMode={FastImage.resizeMode.contain}
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(ShippingItem);

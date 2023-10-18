import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

import {FONTS, SIZES} from '../../constants';

const ShippingTotal = ({
  appTheme,
  cartFee,
  discount,
  deliveryFee,
  total,
}: any) => {
  return (
    <View
      style={{
        marginTop: SIZES.base,
        paddingHorizontal: SIZES.radius,
      }}>
      {/* Cart Total */}
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 3,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...FONTS.h5,
            color: appTheme.buttonText,
          }}>
          Cart Service Fee
        </Text>

        <Text
          style={{
            ...FONTS.h5,
            fontWeight: '600',
            color: appTheme.textColor,
          }}>
          ${cartFee}
        </Text>
      </View>

      {/* Delivery Fee */}
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 3,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...FONTS.h5,
            color: appTheme.buttonText,
          }}>
          Delivery Fee
        </Text>

        <Text
          style={{
            ...FONTS.h5,
            fontWeight: '600',
            color: appTheme.textColor,
          }}>
          {deliveryFee}
        </Text>
      </View>

      {/* Delivery Discount */}
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 3,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...FONTS.h5,
            color: appTheme.buttonText,
          }}>
          Delivery discounts
        </Text>

        <Text
          style={{
            ...FONTS.h5,
            fontWeight: '600',
            color: appTheme.textColor,
          }}>
          - ${discount}
        </Text>
      </View>

      {/* Horizontal rule */}
      <View
        style={{
          marginTop: SIZES.base,
          width: '100%',
          alignSelf: 'center',
          borderBottomWidth: 0.7,
          borderColor: appTheme.buttonText,
        }}
      />

      <View
        style={{
          marginTop: SIZES.radius,
          flexDirection: 'row',
          paddingVertical: 3,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...FONTS.h4,
            color: appTheme.textColor,
            fontWeight: '700'
          }}>
          Total
        </Text>

        <Text
          style={{
            ...FONTS.h4,
            fontWeight: '700',
            color: appTheme.textColor,
          }}>
          ${total}
        </Text>
      </View>
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(ShippingTotal);

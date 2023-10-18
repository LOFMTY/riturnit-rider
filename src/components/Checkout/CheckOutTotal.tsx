import React from 'react';
import {View, Text} from 'react-native';

import {connect} from 'react-redux';
import {FONTS, SIZES } from '../../constants';

const CheckOutTotal = ({appTheme, totalAmount, deliveryDiscount}) => {
  return (
    <View
      style={{
        paddingHorizontal: 30,
        paddingTop: SIZES.radius,
      }}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...FONTS.body1,
            letterSpacing: 0.2,
            fontWeight: '500',
            color: appTheme.textColor,
          }}>
          Delivery Discount
        </Text>

        <Text
          style={{
            ...FONTS.body1,
            letterSpacing: 0.2,
            fontWeight: '500',
            color: appTheme.textColor,
          }}>
          ${deliveryDiscount}
        </Text>
      </View>

      {/* Total */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...FONTS.body1,
            letterSpacing: 0.2,
            color: appTheme.textColor,
            fontWeight: '500',
          }}>
          Payment
        </Text>

        <Text
          style={{
            ...FONTS.body1,
            letterSpacing: 0.2,
            color: appTheme.textColor,
            fontWeight: '500',
          }}>
          ${totalAmount}
        </Text>
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutTotal);

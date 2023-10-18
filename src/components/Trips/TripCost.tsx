import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

import {COLORS, FONTS, SIZES} from '../../constants';

const TripCost = ({
  appTheme,
  amount,
  title,
  containerStyle,
  textStyle,
}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingTop: SIZES.margin,
        justifyContent: 'space-between',
        ...containerStyle,
      }}>
      <Text
        style={{
          color: appTheme.textColor,
          letterSpacing: 0.2,
          ...FONTS.body3,
          ...textStyle,
        }}>
        {title}
      </Text>

      <Text
        style={{
          ...FONTS.h5,
          letterSpacing: 0.2,
          color: COLORS.gradient2,
          ...textStyle,
        }}>
        {amount}
      </Text>
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}
export default connect(mapStateToProps)(TripCost);

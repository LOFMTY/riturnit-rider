import {View, Text} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {SIZES, icons} from '../../constants';
import appTheme, {FONTS} from '../../constants/theme';

const TripDetailAddress = ({
  appTheme,
  containerStyle,
  icon,
  address,
  time,
}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...containerStyle,
      }}>
      <View style={{justifyContent: 'center'}}>
        <FastImage
          source={icon}
          style={{
            width: 25,
            height: 25,
            top: -8
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
          justifyContent: 'center',
        }}>
        <Text
          numberOfLines={2}
          style={{
            ...FONTS.h6,
            color: appTheme.textColor,
          }}>
          {address}
        </Text>
        <Text
          style={{
            color: appTheme.buttonText,
            ...FONTS.body4,
            top: 2,
          }}>
          {time}
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

export default connect(mapStateToProps)(TripDetailAddress);

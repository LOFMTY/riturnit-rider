import {View, Text} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

import {FONTS, SIZES, icons} from '../../../constants';

const RouteDistance = ({appTheme, distance, duration}: any) => {
  return (
    <View>
      {/* distance traveled */}
      <View
        style={{
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.margin,
        }}>
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={icons.distance}
            style={{width: 20, height: 20}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View
          style={{
            marginLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.h5, color: appTheme.buttonText}}>
            Distance:
          </Text>
        </View>
        <View
          style={{flex: 1, marginLeft: SIZES.base, justifyContent: 'center'}}>
          <Text style={{...FONTS.h5, color: appTheme.textColor}}>
            {distance} miles
          </Text>
        </View>
      </View>

      {/* Time traveled */}
      <View
        style={{
          marginTop: SIZES.base,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.margin,
        }}>
        <View style={{justifyContent: 'center'}}>
          <FastImage
            source={icons.period}
            style={{width: 20, height: 20}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View
          style={{
            marginLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.h5, color: appTheme.buttonText}}>
            Duration:
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.base,
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.h5, color: appTheme.textColor}}>
            {duration}
          </Text>
        </View>
      </View>
    </View>
  );
};

function mapStateToProps(state: {themeReducer: {appTheme: any}; error: any}) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(RouteDistance);

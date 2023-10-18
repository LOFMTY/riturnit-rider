import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';

import {SIZES, FONTS} from '../../constants';

const RiturningItems = ({appTheme, containerStyle, distance, time}: any) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        ...containerStyle,
      }}>
      {/* Return Title */}
      <Text
        style={{
          color: appTheme.textColor,
          fontWeight: '500',
          letterSpacing: 0.3,
          ...FONTS.h3,
        }}>
        Returning your purchase
      </Text>

      {/* Return arrival time */}
      <Text
        style={{
          color: appTheme.buttonText,
          ...FONTS.h5,
          paddingTop: SIZES.base,
        }}>
        Arrives in {time} mins - {distance.toFixed(2)} mi
      </Text>

      {/* Return progress bar status */}
      <View
        style={{
          top: -40,
        }}>
        <LottieView
          style={{height: 220, alignSelf: 'center'}}
          autoPlay
          speed={1.5}
          loop={true}
          source={require('../../assets/json/deliveryVan.json')}
        />
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

export default connect(mapStateToProps)(RiturningItems);

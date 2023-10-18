import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';

import {COLORS, FONTS, SIZES} from '../../constants';
import {TextButton} from '../../components';

const FindingDriver = ({appTheme, onPress}: any) => {
  return (
    <View>
      <LottieView
        style={{height: 130, alignSelf: 'center', top: -5}}
        autoPlay
        speed={1}
        loop={true}
        source={require('../../assets/json/findingDriver.json')}
      />

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          top: -SIZES.margin,
        }}>
        <Text
          style={{
            color: appTheme.textColor,
            ...FONTS.h5,
          }}>
          Finding driver...
        </Text>

        <Text
          style={{
            color: appTheme.buttonText,
            ...FONTS.body3,
            top: 4,
          }}>
          Riturnit driver will pick up your package soon.
        </Text>
      </View>

      {/* Button Cancel Driver */}
      <TextButton
        label={'Cancel'}
        labelStyle={{color: COLORS.white, ...FONTS.h5}}
        buttonContainerStyle={{
          height: 40,
          width: 200,
          alignSelf: 'center',
          backgroundColor: COLORS.gradient2,
        }}
        onPress={onPress}
      />
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(FindingDriver);

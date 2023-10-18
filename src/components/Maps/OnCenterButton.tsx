import {TouchableOpacity, Image, Dimensions} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

import {SIZES} from '../../constants';

const {width, height} = Dimensions.get('window');

const OnCenterButton = ({appTheme, onPress, icon, containerStyle}: any) => {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: SIZES.height > 700 ? height * 0.88 : 550,
        right: 15,
        height: 45,
        padding: 12,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8,
        backgroundColor: appTheme.bottomSheet,
        ...containerStyle,
      }}
      onPress={onPress}>
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        tintColor={appTheme.textColor}
        source={icon}
        style={{
          width: 25,
          height: 25,
          alignItems: 'center',
        }}
      />
    </TouchableOpacity>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(OnCenterButton);

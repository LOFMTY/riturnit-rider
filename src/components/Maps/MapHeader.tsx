import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {SIZES, FONTS} from '../../constants';
import {HomeStackNavigatorParamList} from '../../type/navigation';
import FastImage from 'react-native-fast-image';

const MapHeader = ({
  appTheme,
  left,
  onPress,
  onNav,
  icons,
  right,
  containerStyle,
  iconStyle,
}: any) => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  return (
    <View
      style={{
        position: 'absolute',
        top: SIZES.height > 700 ? 60 : 30,
        left: 15,
        flexDirection: 'row',
        opacity: 0.8,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        ...containerStyle,
      }}>
      {left && (
        <TouchableOpacity
          style={{
            backgroundColor: appTheme.bottomSheet,
            padding: 10,
            height: 42,
            borderRadius: SIZES.radius,
          }}
          onPress={onPress}>
          <FastImage
            source={icons}
            resizeMode={FastImage.resizeMode.contain}
            tintColor={appTheme.textColor}
            style={{
              width: 20,
              height: 20,
              alignItems: 'center',
              ...iconStyle,
            }}
        />
        </TouchableOpacity>
      )}
      {right && (
        <TouchableOpacity
          style={{
            backgroundColor: appTheme.bottomSheet,
            padding: 12,
            borderRadius: SIZES.margin,
          }}
          onPress={onNav}>
          <Text
            style={{
              textAlign: 'center',
              ...FONTS.h4,
              color: appTheme.textColor,
            }}>
            Help
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(MapHeader);

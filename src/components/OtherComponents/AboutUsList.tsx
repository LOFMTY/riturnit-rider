import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';

import {SIZES, FONTS, icons} from '../../constants';

const AboutUsList = ({
  onPress,
  title,
  containerStyle,
  imageIcon,
  appTheme,
}: any) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 50,
        borderRadius: SIZES.radius,
        backgroundColor: appTheme.tabBackgroundColor,
        marginTop: 5,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        ...containerStyle,
      }}
      onPress={onPress}>
      <View
        style={{
          justifyContent: 'center',
        }}>
        <FastImage
          source={imageIcon}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: 25,
            height: 25,
          }}
        />
      </View>
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingLeft: 10,
        }}>
        <Text
          style={{
            ...FONTS.body3,
            fontWeight: '500',
            color: appTheme.textColor,
          }}>
          {title}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <FastImage
          source={icons.right}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: 15,
            height: 15,
            justifyContent: 'center',
            alignContent: 'flex-end',
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

function mapStateToProps(state: {themeReducer: {appTheme: any}; error: any}) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(AboutUsList);

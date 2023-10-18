import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';

import {SIZES, FONTS, icons} from '../../constants';

const HelpList = ({onPress, title, containerStyle, appTheme}: any) => {
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
      <View style={{justifyContent: 'center'}}>
        <FastImage
          source={icons.help}
          resizeMode={FastImage.resizeMode.contain}
          style={{width: 17, height: 17}}
        />
      </View>

      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingLeft: SIZES.base,
        }}>
        <Text
          style={{
            ...FONTS.body3,
            letterSpacing: 0.4,
            color: appTheme.textColor,
            fontWeight: '500',
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

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(HelpList);

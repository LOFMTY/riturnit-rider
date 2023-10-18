import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';

import {COLORS, FONTS, SIZES} from '../../constants';

const ProfileHorizontalTab = ({
  onPress,
  title,
  imageIcon,
  iconStyle,
  appTheme,
}: any) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        padding: SIZES.margin,
        marginHorizontal: 6,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: appTheme.tabBackgroundColor,
      }}
      onPress={onPress}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FastImage
          source={imageIcon}
          resizeMode={FastImage.resizeMode.contain}
          tintColor={COLORS.gradient2}
          style={{
            width: 25,
            height: 25,
            top: -2,
            ...iconStyle,
          }}
        />
        <Text
          style={{
            ...FONTS.h6,
            textAlign: 'center',
            color: appTheme.textColor,
            top: 4,
          }}>
          {title}
        </Text>
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

export default connect(mapStateToProps)(ProfileHorizontalTab);

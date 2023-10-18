import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';

import {FONTS, SIZES, icons, COLORS} from '../../constants';

const Header = ({
  title,
  appTheme,
  type,
  titleStyle,
  onPress,
  titleContainerStyle,
  containerStyle,
}: any) => {
  return (
    <View
      style={{
        paddingTop: 45,
        backgroundColor: appTheme.tabBackgroundColor,
        height: '12%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        ...containerStyle,
      }}>
      <View
        style={{
          marginHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: SIZES.radius,
        }}>
        {/* Header Back Button */}
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            borderWidth: 0.5,
            padding: SIZES.base,
            borderRadius: SIZES.radius,
            borderColor: COLORS.gradient2,
          }}
          onPress={onPress}>
          <FastImage
            source={type ? icons.close : icons.back}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 15,
              height: 15,
            }}
          />
        </TouchableOpacity>

        {/* Header Title */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            ...titleContainerStyle,
          }}>
          <Text
            style={{
              ...FONTS.h4,
              textAlign: 'center',
              color: appTheme.textColor,
              ...titleStyle
            }}>
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
};

function mapStateToProps(state: {themeReducer: {appTheme: any}}) {
  return {
    appTheme: state.themeReducer.appTheme,
  };
}

export default connect(mapStateToProps)(Header);

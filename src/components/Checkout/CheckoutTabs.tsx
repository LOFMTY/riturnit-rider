import React from 'react';
import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';

import {COLORS, FONTS, icons} from '../../constants';

const CheckoutTabs = ({
  onPress,
  title,
  containerStyle,
  subTitle,
  appTheme,
}: any) => {
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        height: 60,
        backgroundColor: appTheme.tabBackgroundColor,
        marginTop: 1,
        ...containerStyle,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          marginLeft: 15,
        }}>
        <Text
          style={{
            ...FONTS.body1,
            fontWeight: '500',
            letterSpacing: 0.09,
            lineHeight: 20,
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
          marginRight: 15,
        }}>
        <Text
          style={{
            ...FONTS.body3,
            // lineHeight: 20,
            fontWeight: '500',
            color: COLORS.silver,
          }}>
          {subTitle}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginRight: 15,
        }}
        onPress={onPress}>
        <FastImage
          source={icons.right}
          tintColor={COLORS.gradient1}
          style={{
            width: 15,
            height: 15,
          }}
        />
      </TouchableOpacity>
    </Pressable>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(CheckoutTabs);

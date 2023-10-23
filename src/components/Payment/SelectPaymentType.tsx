import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

import {SIZES, FONTS, icons} from '../../constants';

const SelectPaymentType = ({
  appTheme,
  isSelected,
  label,
  paymentImage,
  onPress,
  onLongPress,
  iconSizes,
}: any) => {
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        backgroundColor: appTheme.tabBackgroundColor,
        marginBottom: 6,
        paddingHorizontal: 15,
        alignItems: 'center',
        borderRadius: SIZES.radius,
        justifyContent: 'center',
        height: 50,
      }}
      onLongPress={onLongPress}
      onPress={onPress}>
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        {/* Payment FastImage */}
        <FastImage
          source={paymentImage}
          style={{
            width: iconSizes?.width || 35,
            height: iconSizes?.height || 35,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          marginLeft: 15,
        }}>
        <Text
          style={{
            ...FONTS.h6,
            color: appTheme.textColor,
          }}>
          {label}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
        onPress={onPress}>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          {/* radio select button */}
          <FastImage
            source={isSelected ? icons.checked : icons.circle}
            style={{
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignContent: 'flex-end',
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </TouchableOpacity>
    </Pressable>
  );
};

function mapStateToProps(state: {themeReducer: {appTheme: any}; error: any}) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(SelectPaymentType);

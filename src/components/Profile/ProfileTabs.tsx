import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';

import {COLORS, SIZES, FONTS, icons} from '../../constants';

const ProfileTabs = ({
  appTheme,
  onPress,
  title,
  iconTitle,
  textStyle,
  containerStyle,
  toggleTheme,
  imageIcon,
  iconStyle,
  toggleIcon,
}: any) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 45,
        borderRadius: SIZES.radius,
        backgroundColor: appTheme.tabBackgroundColor,
        marginTop: SIZES.base,
        paddingHorizontal: 12,
        ...containerStyle,
      }}
      onPress={onPress}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={iconTitle}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: 20,
            height: 20,
            ...iconStyle,
          }}
        />
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            paddingLeft: SIZES.base,
            ...FONTS.body3,
            letterSpacing: 0.09,
            color: appTheme.textColor,
            fontWeight: '500',
            ...textStyle,
          }}>
          {title}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingRight: 5,
        }}>
        {imageIcon ? (
          <FastImage
            source={icons.right}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 15,
              height: 15,
            }}
          />
        ) : null}

        {toggleIcon && (
          <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 35,
            width: 70,
            borderRadius: 20,
            borderColor: appTheme.inputTextColor,
            borderWidth: 0.17,
            backgroundColor: appTheme.themeBG,
          }}
          onPress={toggleTheme}>
          {/* Sun */}
          <View
            style={{
              width: 27,
              height: 27,
              marginLeft: 6,
              justifyContent: 'center',
              ...(appTheme.name == 'light'
                ? styles.selectedLightModeStyle
                : {}),
            }}>
            <FastImage
              source={icons.sun}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                height: 16,
                width: 16,
                left: 5,
              }}
              tintColor={COLORS.white}
            />
          </View>

          {/* Moon  */}
          <View
            style={{
              width: 27,
              height: 27,
              marginLeft: 6,
              justifyContent: 'center',
              ...(appTheme.name == 'dark'
                ? styles.selectedNightModeStyle
                : {}),
            }}>
            <FastImage
              source={icons.moonLight}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                height: 16,
                width: 16,
                right: -5,
              }}
              tintColor={COLORS.silver}
            />
          </View>
        </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectedNightModeStyle: {
    borderRadius: 20,
    backgroundColor: COLORS.white,
  },
  selectedLightModeStyle: {
    borderRadius: 20,
    backgroundColor: COLORS.mustard,
  },
});

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(ProfileTabs);

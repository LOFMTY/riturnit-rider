import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';

import {toggleTheme} from '../../redux/theme/themeActions';
import {COLORS, SIZES, icons, FONTS} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const HomeHeader = ({appTheme, toggleTheme, children}: any) => {
  const navigation = useNavigation<any>();

  function toggleThemeHandler() {
    if (appTheme.name == 'light') {
      toggleTheme('dark');
    } else {
      toggleTheme('light');
    }
  }

  return (
    <View
      style={{
        paddingTop: 45,
        backgroundColor: appTheme.tabBackgroundColor,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
      }}>
      {/* Logo & Name */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.padding,
          marginTop: SIZES.radius,
        }}>
        <Pressable
          // onPress={() => navigation.navigate('DestinationSearch')}
          style={{justifyContent: 'center', top: -5}}>
          <FastImage
            source={icons.logo}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 50,
              height: 50,
              left: -10,
            }}
          />
        </Pressable>

        <View style={{flex: 1}}>
          <Text
            style={{
              color: appTheme.textColor,
              fontWeight: '500',
              ...FONTS.h3,
              top: 7,
            }}>
            Riturnit
          </Text>
        </View>

        {/* Switch Light & Dark Mode */}
        <View style={{alignItems: 'flex-end'}}>
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
            onPress={() => toggleThemeHandler()}>
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
        </View>
      </View>

      {/* Intro Text  */}
      <View
        style={{
          marginHorizontal: SIZES.padding,
          marginTop: SIZES.base,
        }}>
        <Text
          style={{
            marginRight: 40,
            color: appTheme.textColor,
            ...FONTS.h1,
          }}>
          Where do you want {'\n'}to make returns today?
        </Text>

        {/* Search Box  */}
        {children}
      </View>
    </View>
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

function mapStateToProps(state: {themeReducer: {appTheme: any}; error: any}) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    toggleTheme: (themeType: any) => {
      return dispatch(toggleTheme(themeType));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);

import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {icons, images, FONTS, SIZES, COLORS} from '../constants';
import FastImage from 'react-native-fast-image';

const AuthLayout = ({
  title,
  subtitle,
  titleContainerStyle,
  children,
  nav,
  subTitleStyle,
  back,
}: any) => {
  const navigation = useNavigation<any>();

  return (
    <ImageBackground
      source={images.background}
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
      }}
      resizeMode="cover">
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.height > 700 ? SIZES.padding : SIZES.padding,
        }}>
        {/* Back Button */}
        {back && (
          <TouchableOpacity
            style={{
              alignItems: 'flex-start',
              marginTop:
                SIZES.height > 700 ? SIZES.padding * 1.3 : SIZES.padding,
            }}
            onPress={() =>
              nav ? navigation.navigate('SignIn') : navigation.goBack()
            }>
            <FastImage
              source={icons.back}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={COLORS.white}
              style={{
                height: 25,
                width: 25,
              }}
            />
          </TouchableOpacity>
        )}

        {/* Title */}
        <View
          style={{
            marginTop: SIZES.height > 700 ? SIZES.padding : 0,
            ...titleContainerStyle,
          }}>
          <Text
            style={{
              textAlign: 'center',
              ...FONTS.h2,
              color: COLORS.gradient1,
            }}>
            {title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              textAlign: 'center',
              color: COLORS.gray,
              marginTop: SIZES.radius * 1.5,
              ...FONTS.h4,
              ...subTitleStyle,
            }}>
            {subtitle}
          </Text>
        </View>

        {children}
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default AuthLayout;

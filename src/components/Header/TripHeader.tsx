import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import {connect} from 'react-redux';
import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {DEFAULT_IMAGE} from '../../utilities/Utils';

const TripHeader = ({
  title,
  date,
  storeName,
  appTheme,
  storeImage,
  containerStyle,
}: any) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        paddingTop: 55,
        backgroundColor: appTheme.tabBackgroundColor,
        height: '14%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        ...containerStyle,
      }}>
      <View
        style={{
          paddingTop: SIZES.base,
          marginHorizontal: SIZES.margin,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* Header Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            justifyContent: 'center',
            borderWidth: 0.5,
            padding: SIZES.base,
            height: 35,
            top: 3,
            borderRadius: SIZES.radius,
            borderColor: COLORS.gradient2,
          }}>
          <FastImage
            source={icons.back}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 15,
              height: 15,
            }}
          />
        </TouchableOpacity>

        {/* Header  Title */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingLeft: SIZES.radius,
          }}>
          <Text
            style={{
              ...FONTS.h6,
              color: appTheme.buttonText,
            }}>
            You returned{' '}
            <Text
              style={{
                ...FONTS.h6,
                fontWeight: '700',
                color: appTheme.textColor,
              }}>
              {title}
            </Text>{' '}
            item(s) to{' '}
            <Text
              numberOfLines={1}
              style={{
                ...FONTS.h6,
                fontWeight: '700',
                color: appTheme.textColor,
              }}>
              {storeName}
            </Text>
          </Text>

          {/* Riturnit Date */}
          <Text
            style={{
              ...FONTS.body4,
              paddingTop: 2,
              color: appTheme.buttonText,
            }}>
            {date}
          </Text>
        </View>

        {/* Store Name */}
        <View>
          <FastImage
            source={{uri: storeImage || DEFAULT_IMAGE}}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              borderRadius: SIZES.padding * 2,
              borderWidth: 0.5,
              borderColor: COLORS.gradient2,
              width: 45,
              height: 45,
            }}
          />
        </View>
      </View>
    </View>
  );
};
function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(TripHeader);

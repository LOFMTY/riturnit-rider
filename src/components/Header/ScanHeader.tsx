import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';

import {FONTS, SIZES, icons} from '../../constants';
import { useNavigation } from '@react-navigation/native';

const ScanHeader = ({appTheme, title,  onPress, icon}: any) => {
  const navigation = useNavigation()

  return (
    <View
      style={{
        paddingTop: 55,
        backgroundColor: appTheme.tabBackgroundColor,
        height: '12%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
      }}>
      <View
        style={{
          marginHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: SIZES.height > 700 ? 0 : SIZES.base,
        }}>
        {/* Header Back Button */}
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FastImage
              source={icons.back}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 20,
                height: 20,
                top: 4,
              }}
            />
          </TouchableOpacity>
        </View>

        {/* Header Store Title */}
        <View
          style={{
            paddingTop: SIZES.base,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={{
              ...FONTS.h4,
              color: appTheme.textColor,
            }}>
            {title}
          </Text>
        </View>

        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity onPress={onPress}>
            <FastImage
              source={icon}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 20,
                height: 20,
                top: 4,
              }}
            />
          </TouchableOpacity>
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

export default connect(mapStateToProps)(ScanHeader);

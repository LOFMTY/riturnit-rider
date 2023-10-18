import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';

import {SIZES, FONTS, icons, COLORS} from '../../constants';

const ItemShipmentSearch = ({appTheme, onPress}: any) => {
  return (
    <View
      style={{
        position: 'absolute',
        height: '12%',
        backgroundColor: appTheme.iconButton,
        left: 0,
        right: 0,
        bottom: 0,
        padding: SIZES.radius,
        borderTopLeftRadius: SIZES.padding,
        borderTopRightRadius: SIZES.padding,
      }}>
      {/* Search Box  */}
      <TouchableOpacity onPress={onPress} style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            alignItems: 'center',
            marginVertical: SIZES.base,
            paddingHorizontal: 15,
            justifyContent: 'space-between',
            borderRadius: 15,
            backgroundColor: appTheme.carTab,
          }}>
          <FastImage
            source={icons.search}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              height: 20,
              width: 20,
            }}
          />
          <View style={{flex: 1, paddingLeft: 20}}>
            <Text
              style={{
                ...FONTS.body2,
                letterSpacing: 0.5,
                color: appTheme.buttonText,
              }}>
              Search current location
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
  };
}

export default connect(mapStateToProps)(ItemShipmentSearch);

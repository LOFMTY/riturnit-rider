import React from 'react';
import {View, Text, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';

import {SIZES, FONTS, icons} from '../../constants';

const CardItem = ({item, isSelected, onPress, appTheme, containerStyle}: any) => {
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        height: 50,
        borderRadius: SIZES.radius,
        backgroundColor: appTheme.tabBackgroundColor,
        marginTop: 5,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        ...containerStyle,
      }}
      onPress={() => onPress(item)}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <FastImage
          source={item.icon}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </View>
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            marginLeft: 20,
            ...FONTS.h6,
            color: appTheme.textColor,
          }}>
          {item.name}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <FastImage
          source={isSelected ? icons.checked : icons.circle}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignContent: 'flex-end',
          }}
        />
      </View>
    </Pressable>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(CardItem);

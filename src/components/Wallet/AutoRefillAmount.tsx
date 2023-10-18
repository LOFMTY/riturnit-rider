import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {SIZES, FONTS, icons} from '../../constants';
import FastImage from 'react-native-fast-image';

const AutoRefillAmount = ({
  onPress,
  item,
  isSelected,
  appTheme,
  ...containerStyle
}: any) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View
        style={{
          flexDirection: 'row',
          height: 45,
          borderRadius: SIZES.radius,
          backgroundColor: appTheme.tabBackgroundColor,
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          ...containerStyle,
        }}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <FastImage
            source={isSelected ? icons.radioButton1 : icons.circle}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignContent: 'flex-end',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              paddingLeft: SIZES.radius,
              ...FONTS.h6,
              color: appTheme.textColor,
            }}>
            {item}
          </Text>
        </View>
      </View>

      {/* Horizontal Rule */}
      {item.length <= 3 ? (
        <View
          style={{
            paddingTop: 2,
            borderBottomWidth: 0.3,
            borderColor: appTheme.buttonText,
          }}
        />
      ) : (
        <View />
      )}
    </TouchableOpacity>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(AutoRefillAmount);

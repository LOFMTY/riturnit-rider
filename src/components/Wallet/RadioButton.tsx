import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

import {FONTS, COLORS, SIZES, icons} from '../../constants';

const RadioButton = ({
  containerStyle,
  label,
  labelStyle,
  iconStyle,
  isSelected,
  onPress,
}: any) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        ...containerStyle,
      }}
      onPress={onPress}>
      <FastImage
        source={isSelected ? icons.checked : icons.circle}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          marginLeft: 5,
          width: 20,
          height: 20,
          ...iconStyle,
        }}
      />
      <Text
        style={{
          marginLeft: SIZES.radius,
          color: COLORS.gray,
          fontWeight: '500',
          ...FONTS.body2,
          ...labelStyle,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(RadioButton);

import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

import {FONTS, COLORS, SIZES, icons} from '../../constants';

interface ITextIconButton {
  label: string;
  iconPosition: any;
  onPress: Function;
  containerStyle: any;
  textStyle: any
}

const TextIconButton = ({
  label,
  containerStyle,
  onPress,
  textStyle,
}: ITextIconButton) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        borderRadius: SIZES.base,
        alignItems: 'center',
        padding: SIZES.radius,
        justifyContent: 'center',
        backgroundColor: COLORS.gradient2,
        marginLeft: SIZES.base,
        marginTop: SIZES.margin,
        width: 170,
        ...containerStyle,
      }}
      onPress={() => onPress()}>
      <FastImage
        source={icons.capture}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          ...styles.image,
          left: -5,
          marginRight: SIZES.base,
        }}
        tintColor={COLORS.gradient2}
      />
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.h6,
          ...textStyle
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

TextIconButton.propTypes = {
  iconPosition: PropTypes.oneOf(['LEFT', 'RIGHT']),
};

const styles = StyleSheet.create({
  image: {
    marginLeft: 5,
    width: 20,
    height: 20,
    tintColor: COLORS.white,
  },
});

function mapStateToProps(state: {themeReducer: {appTheme: any}; error: any}) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(TextIconButton);

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {FONTS} from '../../constants';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

const ContactUsHorizontalTabs = ({
  onPress,
  title,
  imageIcon,
  appTheme,
}: any) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        padding: 18,
        borderRadius: 10,
        marginHorizontal: 3,
        justifyContent: 'center',
        backgroundColor: appTheme.tabBackgroundColor,
      }}
      onPress={onPress}>
      <View style={{alignItems: 'center'}}>
        <FastImage
          source={imageIcon}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: 20,
            height: 20,
            bottom: 5,
          }}
        />
        <Text
          style={{
            ...FONTS.body4,
            textAlign: 'center',
            color: appTheme.textColor,
            fontWeight: '500',
            top: 5,
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(ContactUsHorizontalTabs);

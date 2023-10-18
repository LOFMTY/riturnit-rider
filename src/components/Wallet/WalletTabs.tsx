import React from 'react';
import { Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from "react-redux";

import { FONTS, SIZES} from '../../constants';

const WalletTabs = ({onPress, title, imageIcon, appTheme}: any) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: 15,
        borderRadius: 10,
        alignItems: 'center',
      }}
      onPress={onPress}>
      <FastImage
        source={imageIcon}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          width: 30,
          height: 30,
        }}
      />
      <Text
        style={{
          ...FONTS.body4,
          fontWeight: "bold",
          color: appTheme.textColor,
          top: 5,
        }}>
        {title}
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
export default connect(mapStateToProps)(WalletTabs);


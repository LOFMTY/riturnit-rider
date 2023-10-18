import React from 'react';
import {View, Text, Platform,} from 'react-native';
import {connect} from 'react-redux';

import {SIZES, FONTS} from '../../constants';

const TabHeader = ({title, appTheme}: any) => {
  return (
    <View
      style={{
        paddingTop: 55,
        height: Platform.OS == 'ios' ? '12%' : '10%',
        backgroundColor: appTheme.tabBackgroundColor,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
      }}>
      <View
        style={{
          paddingTop: SIZES.height > 700 ? SIZES.base : 15,
          marginHorizontal: SIZES.padding,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            ...FONTS.h4,
            color: appTheme.textColor,
            textAlign: 'center',
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(TabHeader);

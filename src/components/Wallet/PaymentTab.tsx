import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

import {FONTS, COLORS, SIZES, icons} from '../../constants';

const PaymentTab = ({
  body,
  title,
  amount,
  appTheme,
  time,
  colorType,
  containerStyle,
}: any) => {
  return (
    <View
      style={{
        backgroundColor: appTheme.tabBackgroundColor,
        marginTop: SIZES.base,
        marginHorizontal: SIZES.radius,
        padding: 15,
        borderRadius: SIZES.base,
        ...containerStyle,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{top: SIZES.radius, justifyContent: 'center'}}>
          <FastImage
            source={icons.transactions}
            style={{width: 25, height: 25}}
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...FONTS.h5,
              color: appTheme.textColor,
            }}>
            {title}
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              ...FONTS.h5,
              color: colorType,
            }}>
            ${amount}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{justifyContent: 'center'}} />
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            paddingLeft: SIZES.padding * 1.5,
          }}>
          <Text
            style={{
              ...FONTS.body4,
              color: appTheme.buttonText,
            }}>
            {body}
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              ...FONTS.body4,
              color: appTheme.buttonText,
            }}>
            {time}
          </Text>
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

export default connect(mapStateToProps)(PaymentTab);

import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';

import FastImage from 'react-native-fast-image';
import {SIZES, FONTS, icons} from '../../constants';

const AddCardPayment = ({appTheme, onPress}: any) => {
  return (
    <View
      style={{
        marginTop: SIZES.radius,
        marginHorizontal: SIZES.radius,
      }}>
      <Text
        style={{
          ...FONTS.h6,
          color: appTheme.textColor,
        }}>
        Add New Card
      </Text>

      <Pressable
        style={{
          flexDirection: 'row',
          backgroundColor: appTheme.tabBackgroundColor,
          borderRadius: SIZES.radius,
          padding: 15,
          marginTop: SIZES.base,
        }}
        onPress={onPress}>
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <FastImage
            source={icons.credit_card}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginLeft: 15,
          }}>
          <Text
            style={{
              ...FONTS.h6,
              color: appTheme.textColor,
            }}>
            Add debit/credit card
          </Text>
        </View>

        <TouchableOpacity
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
          onPress={onPress}>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <FastImage
              source={icons.right}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </View>
        </TouchableOpacity>
      </Pressable>
    </View>
  );
};

function mapStateToProps(state: {themeReducer: {appTheme: any}; error: any}) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(AddCardPayment);

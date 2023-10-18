import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

import {icons, FONTS, SIZES, COLORS} from '../../constants';
import FastImage from 'react-native-fast-image';

const CartTotal = ({
  appTheme,
  subTotal,
  points1,
  points2,
  serviceFee,
  points,
}: any) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.base,
      }}>
      {/* Subtotal  */}
      <View
        style={{
          marginTop: SIZES.radius,
          flexDirection: 'row',
          paddingVertical: 3,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...FONTS.h5,
            color: appTheme.buttonText,
          }}>
          Subtotal
        </Text>

        <Text
          style={{
            ...FONTS.h5,
            fontWeight: '600',
            letterSpacing: 0.3,
            color: appTheme.buttonText,
          }}>
          ${subTotal}
        </Text>
      </View>

      {/* Subtotal  */}
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 3,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...FONTS.h5,
            color: appTheme.textColor,
          }}>
          Service Fee
        </Text>

        <Text
          style={{
            ...FONTS.h5,
            fontWeight: '600',
            letterSpacing: 0.3,
            color: appTheme.textColor,
          }}>
          ${serviceFee}
        </Text>
      </View>

      <View
        style={{
          marginTop: SIZES.radius,
          width: '100%',
          alignSelf: 'center',
          borderBottomWidth: 0.7,
          borderColor: appTheme.buttonText,
        }}
      />

      {/* Riturnit Points */}
      <View
        style={{
          marginTop: SIZES.radius,
          flexDirection: 'row',
          paddingVertical: 3,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...FONTS.h5,
            color: appTheme.textColor,
          }}>
          Riturnit Point
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              marginRight: 4,
              justifyContent: 'center',
            }}>
            <FastImage
              source={icons.coins}
              resizeMode={FastImage.resizeMode.cover}
              style={{height: 20, width: 20}}
            />
          </View>

          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.h5,
                fontWeight: '600',
                letterSpacing: 0.3,
                color: COLORS.gradient2,
              }}>
              {points}
            </Text>
          </View>
        </View>
      </View>

      {/* Receipt Point */}
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 3,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...FONTS.h5,
            color: appTheme.textColor,
          }}>
          Receipt Point
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              marginRight: 4,
              justifyContent: 'center',
            }}>
            <FastImage
              source={icons.coins}
              resizeMode={FastImage.resizeMode.cover}
              style={{height: 20, width: 20}}
            />
          </View>

          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.h5,
                fontWeight: '600',
                letterSpacing: 0.3,
                color: COLORS.gradient2,
              }}>
              {points1}
            </Text>
          </View>
        </View>
      </View>

      {/* Scan product point */}
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 3,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...FONTS.h5,
            color: appTheme.textColor,
          }}>
          Product Point
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              marginRight: 4,
              justifyContent: 'center',
            }}>
            <FastImage
              source={icons.coins}
              resizeMode={FastImage.resizeMode.cover}
              style={{height: 20, width: 20}}
            />
          </View>

          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.h5,
                fontWeight: '600',
                letterSpacing: 0.3,
                color: COLORS.gradient2,
              }}>
              {points2}
            </Text>
          </View>
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

export default connect(mapStateToProps)(CartTotal);

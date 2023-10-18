import React from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {FONTS, SIZES, COLORS, icons} from '../../constants';

interface IStoreHeader {
  appTheme: any;
  title: string;
  iconStyle?: any;
  icon?: string | any;
  showQty?: boolean;
  onPress?: any;
  storeItems?: number;
}

const SubHeader = ({
  appTheme,
  title,
  iconStyle,
  icon,
  showQty,
  storeItems,
  onPress,
}: IStoreHeader) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        paddingTop: 45,
        backgroundColor: appTheme.tabBackgroundColor,
        height: '12.5%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
      }}>
      <View
        style={{
          marginHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: SIZES.radius,
        }}>
        {/* Header Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            justifyContent: 'center',
            borderWidth: 0.5,
            padding: SIZES.base,
            borderRadius: SIZES.radius,
            borderColor: COLORS.gradient2,
          }}>
          <FastImage
            source={icons.back}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 15,
              height: 15,
            }}
          />
        </TouchableOpacity>

        {/* Header Store Title */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={{
              ...FONTS.h4,
              color: appTheme.textColor,
            }}>
            {title}
          </Text>
        </View>

        <Pressable style={{justifyContent: 'center'}} onPress={onPress}>
          <FastImage
            source={icon}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 30,
              height: 30,
              tintColor: appTheme.textColor,
              top: 4,
              ...iconStyle,
            }}
          />

          {/* Shipping Qty */}
          {showQty && (
            <View
              style={{
                position: 'absolute',
                backgroundColor: COLORS.gradient1,
                borderRadius: 50 / 2,
                height: 25,
                width: 25,
                justifyContent: 'center',
                bottom: 10,
                left: 15,
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                {storeItems}
              </Text>
            </View>
          )}
        </Pressable>
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

export default connect(mapStateToProps)(SubHeader);

import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {connect} from 'react-redux';

import {SIZES, COLORS, FONTS, images} from '../../constants';
import { DEFAULT_IMAGE } from '../../utilities/Utils';

interface IStoreProps {
  appTheme: any;
  item: {
    id: string;
    title: string;
    quantity: number;
    img: string;
    expiry: string;
  };
  onCheckItem: Function;
  showSelect: boolean;
}
 
const ReturnDetailItem = ({
  appTheme,
  item,
  showSelect,
  onCheckItem,
}: IStoreProps) => {
  return (
    <View
      style={{
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: SIZES.base,
        backgroundColor: appTheme.cardBackgroundColor,
        alignItems: 'center',
        marginTop: SIZES.base,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
      }}>
      {/* Select Item */}
      {showSelect && (
        <BouncyCheckbox
          iconStyle={{borderColor: COLORS.gradient1}}
          fillColor="#6098fe"
          onPress={() => onCheckItem()}
        />
      )}

      {/* Item Image */}
      <View
        style={{
          justifyContent: 'center',
        }}>
        <FastImage
          source={{uri: item.img || DEFAULT_IMAGE}}
          resizeMode={FastImage.resizeMode.contain}
          style={{
            width: 50,
            height: 50,
            borderRadius: SIZES.base,
          }}
        />
      </View>

      {/* Item Details */}
      <View
        style={{
          marginHorizontal: SIZES.radius,
          justifyContent: 'center',
          flex: 1,
        }}>
        {/* Title */}
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.body4,
            fontWeight: '700',
            color: appTheme.textColor,
          }}>
          {item.title}
        </Text>

        {/* Expiry Date & Quantity */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 1,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.body5,
                color: appTheme.textColor,
              }}>
              Expires in:{' '}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.body4,
                fontWeight: '500',
                color: COLORS.red,
              }}>
              {item.expiry} day(s){' '}
              <Text style={{color: COLORS.gray}}>
                - {item.quantity} item(s)
              </Text>
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

export default connect(mapStateToProps)(ReturnDetailItem);

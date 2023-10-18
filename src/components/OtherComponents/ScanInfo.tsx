import {View, Image, Text} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';

import {SIZES, icons, FONTS} from '../../constants';
import {DEFAULT_IMAGE} from '../../utilities/Utils';

interface IScanInfo {
  productImage?: string;
  productName?: string;
  productPrice?: number;
  productDescription?: string;
  appTheme: any;
  expiryPeriod: number;
}

const ScanInfo = ({
  appTheme,
  productImage,
  productDescription,
  productName,
  expiryPeriod,
  productPrice,
}: IScanInfo) => {
  return (
    <View
      style={{
        margin: SIZES.margin,
        padding: 15,
        backgroundColor: appTheme.tabBackgroundColor,
        borderRadius: SIZES.padding,
        alignSelf: 'center',
      }}>
      {/* Product FastImage */}
      <Image
        source={{uri: productImage || DEFAULT_IMAGE}}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          height: SIZES.height > 700 ? 250 : 180,
          width: 320,
          borderTopLeftRadius: SIZES.margin,
          borderTopRightRadius: SIZES.margin,
        }}
      />

      {/* Product Name */}
      <View style={{marginTop: 15}}>
        <Text
          style={{
            ...FONTS.body2,
            color: appTheme.textColor,
          }}>
          {productName || 'no product name'}
        </Text>
      </View>

      {/* Product Price & Description  */}
      <View style={{marginTop: SIZES.base}}>
        <Text
          numberOfLines={3}
          style={{
            ...FONTS.h4,
            color: appTheme.textColor,
          }}>
          ${productPrice}
        </Text>

        <Text
          numberOfLines={3}
          style={{
            marginTop: 4,
            ...FONTS.body2,
            color: appTheme.buttonText,
          }}>
          {productDescription || 'no description'}
        </Text>
      </View>

      {/* Store Name & Expiry */}
      {expiryPeriod && (
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignSelf: 'center',
            paddingTop: SIZES.base,
          }}>
          <View style={{justifyContent: 'center', paddingRight: 5}}>
            <FastImage
              source={icons.info}
              resizeMode={FastImage.resizeMode.contain}
              style={{width: 25, height: 25}}
            />
          </View>

          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                textAlign: 'center',
                ...FONTS.h6,
                color: appTheme.buttonText,
              }}>
              Item expires{' '}
              <Text
                style={{
                  textAlign: 'center',
                  ...FONTS.h6,
                  color: appTheme.textColor,
                }}>
                {expiryPeriod} days
              </Text>{' '}
              after scan
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(ScanInfo);

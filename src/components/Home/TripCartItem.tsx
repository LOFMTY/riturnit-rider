import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {DEFAULT_IMAGE} from '../../utilities/Utils';
import {
  DeleteTripCartMutation,
  DeleteTripCartMutationVariables,
  TripCart,
} from '../../API';
import {useMutation} from '@apollo/client';
import dayjs from 'dayjs';
import { deleteTripCart } from '../../queries/Home/TripQueries';

interface IShipProductProps {
  appTheme: any;
  product: TripCart | any;
}

const TripCartItem = ({appTheme, product}: IShipProductProps) => {
  const [doDeleteTripCart] = useMutation<
    DeleteTripCartMutation,
    DeleteTripCartMutationVariables
  >(deleteTripCart, {
    variables: {
      input: {
        id: product.id,
        _version: product._version,
      },
    },
  });

  const startDelete = async () => {
    try {
      await doDeleteTripCart();
    } catch (error) {
      Alert.alert('Failed to delete product', (error as Error).message);
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: SIZES.base,
        backgroundColor: appTheme.cardBackgroundColor,
        paddingHorizontal: SIZES.base,
        borderRadius: SIZES.radius,
      }}>
      {/* Item Image */}
      <View style={{justifyContent: 'center'}}>
        <FastImage
          source={{uri: product.image || DEFAULT_IMAGE}}
          style={{
            width: 70,
            height: 70,
            borderRadius: SIZES.base,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>

      {/* Item Details  */}
      <View
        style={{
          marginLeft: SIZES.radius,
          justifyContent: 'center',
          flex: 1,
        }}>
        {/* Title */}
        <View style={{justifyContent: 'center'}}>
          <Text
            numberOfLines={2}
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              color: appTheme.buttonText,
            }}>
            {product.name}
          </Text>
        </View>

        {/* Price  */}
        <View style={{justifyContent: 'center', paddingTop: 3}}>
          <Text
            numberOfLines={2}
            style={{
              ...FONTS.h5,
              fontWeight: '500',
              color: appTheme.textColor,
            }}>
            ${product.price}
          </Text>
        </View>

        {/* Quantity  */}
        <View style={{justifyContent: 'center', paddingTop: 2}}>
          <Text
            style={{
              color: COLORS.gray,
              ...FONTS.body3,
              fontWeight: '500',
            }}>
            {product.quantity} item(s)
          </Text>
        </View>
      </View>

      {/* Delete Icon */}
      <TouchableOpacity
        onPress={startDelete}
        style={{marginTop: 16, marginRight: SIZES.base}}>
        <FastImage
          source={icons.remove}
          style={{width: 35, height: 35}}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
    </View>
  );
};

function mapStateToProps(state: {themeReducer: {appTheme: any}; error: any}) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(TripCartItem);

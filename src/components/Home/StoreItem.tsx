import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {useMutation} from '@apollo/client';
import dayjs from 'dayjs';

import {SIZES, COLORS, FONTS, images, icons} from '../../constants';
import {
  DeleteProductMutation,
  DeleteProductMutationVariables,
  Product,
} from '../../API';
import {deleteProduct} from '../../queries/Home/StoreQueries';

interface IProductProps {
  appTheme: any;
  product: Product | any;
  onPress: Function;
}

const StoreItem = ({appTheme, onPress, product}: IProductProps) => {
  const [doDeleteProduct] = useMutation<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >(deleteProduct, {
    variables: {
      input: {
        id: product.id,
        _version: product._version,
      },
    },
  });

  const startDelete = async () => {
    try {
      await doDeleteProduct();
    } catch (error) {
      Alert.alert('Failed to delete product', (error as Error).message);
    }
  };

  const currentDate = dayjs().format('YYYY-MM-DD');
  const expiryDate = currentDate >= product?.expiry_date ? true : false;

  return (
    <View
      style={{
        marginHorizontal: SIZES.base,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: SIZES.base,
        backgroundColor: expiryDate
          ? appTheme.expiry
          : appTheme.cardBackgroundColor,
        paddingHorizontal: SIZES.base,
        borderRadius: SIZES.radius,
      }}>
      {/* Item Image */}
      <View
        style={{
          justifyContent: 'center',
        }}>
        <FastImage
          source={{uri: product.image || images.noImage}}
          style={{
            width: 80,
            height: 80,
            borderRadius: SIZES.base,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>

      {/* Item Details */}
      <View
        style={{
          marginLeft: SIZES.base,
          justifyContent: 'center',
          flex: 1,
        }}>
        {/* Title */}
        <View style={{justifyContent: 'center'}}>
          <Text
            numberOfLines={1}
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              color: appTheme.buttonText,
            }}>
            {product.name}
          </Text>
        </View>

        {/* Price  */}
        <View style={{justifyContent: 'center', paddingTop: 2}}>
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

        {/* Expiry Date */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 2,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: '600',
                color: appTheme.buttonText,
              }}>
              expires:{' '}
            </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.body3,
                color: expiryDate ? COLORS.red : COLORS.gradient2,
              }}>
              {expiryDate
                ? `EXPIRED!`
                : dayjs(product.expiry_date).format('DD-MMM-YYYY')}
            </Text>
          </View>
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

      {expiryDate ? (
        <TouchableOpacity
          style={{marginLeft: 20, justifyContent: 'center'}}
          onPress={startDelete}>
          <FastImage
            source={icons.remove}
            style={{
              width: 32,
              height: 32,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            style={{marginLeft: 20, justifyContent: 'center'}}
            onPress={() => {
              onPress();
              startDelete();
            }}>
            <FastImage
              source={icons.riturns}
              style={{
                width: 32,
                height: 32,
              }}
              resizeMode={FastImage.resizeMode.contain}
              tintColor={COLORS.gradient2}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginLeft: 20, justifyContent: 'center'}}
            onPress={startDelete}>
            <FastImage
              source={icons.remove}
              style={{
                width: 32,
                height: 32,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        </>
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

export default connect(mapStateToProps)(StoreItem);

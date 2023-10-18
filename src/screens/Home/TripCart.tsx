import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator, Alert} from 'react-native';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {connect} from 'react-redux';
import DocumentScanner from 'react-native-document-scanner-plugin';
import Spinner from 'react-native-loading-spinner-overlay';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {SIZES, FONTS, COLORS, icons} from '../../constants';
import {
  TextButton,
  TripCartItem,
  SubHeader,
  TextIconButton,
  CartTotal,
} from '../../components';
import {HomeStackNavigatorParamList} from '../../type/navigation';
import {useMutation} from '@apollo/client';
import {
  DeleteTripCartMutation,
  DeleteTripCartMutationVariables,
} from '../../API';
import {deleteTripCart} from '../../queries/Home/TripQueries';
import {useReturnContext} from '../../context/ReturnContext';

const SERVICE_FEE_1 = 300;
const SERVICE_FEE_2 = 500;

const SERVICE_FEE_RATE = 2.5;
const SERVICE_FEE1_RATE = 5.5;
const SERVICE_FEE2_RATE = 3.5;

const TripCart = ({appTheme}: any) => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const {
    receipt,
    RETURN_POINTS,
    RETURN_SCAN_POINTS,
    RETURN_RECEIPT_POINTS,
    setCartFee,
    setStoreID,
    setStoreName,
    setReceipt,
    itemSubTotal,
    cartProducts,
    createNewReturn,
    setStoreImage,
    loading,
  } = useReturnContext();

  // console.log('==CART QTY===', cartQty);

  const [onLoading, setOnLoading] = useState(false);

  const route = useRoute<any>();
  const {storeId, store, image} = route?.params;

  // DELETE ITEM FROM TRIP CART
  const [doDeleteTripCart] = useMutation<
    DeleteTripCartMutation,
    DeleteTripCartMutationVariables
  >(deleteTripCart);

  const itemsToReturn = async () => {
    if (onLoading) {
      return;
    }
    setOnLoading(true);
    try {
      await createNewReturn();
      cartProducts.forEach(async (item: any) => {
        const res = await doDeleteTripCart({
          variables: {
            input: {
              id: item?.id,
              _version: item?._version,
            },
          },
        });
        // console.log('delete listProducts', res);
      });
      navigation.navigate('ItemShipment');
    } catch (error) {
      Alert.alert('Failed to delete items', (error as Error).message);
    } finally {
      setOnLoading(false);
    }
  };

  // SCAN RECEIPT FUNCTION
  const onScanReceiptPress = async () => {
    const {scannedImages}: any | [] = await DocumentScanner.scanDocument({
      maxNumDocuments: 1,
    });
    if (scannedImages.length > 0) {
      setReceipt(scannedImages[0]);
    }
  };

  //SERVICE FEE
  const serviceFeeCost = () => {
    if (itemSubTotal <= SERVICE_FEE_1) {
      return (SERVICE_FEE1_RATE / 100) * itemSubTotal;
    } else if (itemSubTotal <= SERVICE_FEE_2) {
      return (SERVICE_FEE2_RATE / 100) * itemSubTotal;
    } else {
      return (SERVICE_FEE_RATE / 100) * itemSubTotal;
    }
  };

  const serviceFee = serviceFeeCost();

  useEffect(() => {
    let unmounted = false;
    setStoreImage(image);
    setStoreID(storeId);
    setStoreName(store);
    setCartFee(serviceFee);
    return () => {
      unmounted = true;
    };
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: appTheme.backgroundColor,
        }}
        size={'large'}
        color={'#3580ff'}
      />
    );
  }

  // Store List
  function renderCartList() {
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: SIZES.base,
          marginTop: SIZES.base,
        }}>
        <FlatList
          data={cartProducts}
          refreshing={true}
          keyExtractor={item => `${item?.id.toString()}`}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return <TripCartItem key={index} product={item} />;
          }}
          ListHeaderComponent={
            <View style={{margin: SIZES.radius}}>
              <Text
                style={{
                  flex: 1,
                  ...FONTS.h4,
                  color: appTheme.textColor,
                }}>
                Cart items
              </Text>
            </View>
          }
          ItemSeparatorComponent={() => (
            <View style={{marginTop: SIZES.base}} />
          )}
          ListFooterComponent={
            <View style={{marginBottom: 200}}>
              <TextIconButton
                label={receipt ? 'Recapture receipt' : 'Capture receipt'}
                containerStyle={{
                  backgroundColor: appTheme.tabBackgroundColor,
                  borderWidth: 0.5,
                  borderColor: COLORS.gradient2,
                  marginTop: SIZES.radius,
                  marginBottom: 15
                }}
                textStyle={{color: COLORS.gradient2}}
                onPress={onScanReceiptPress}
              />

              {/* render image */}
              {receipt && (
                <View
                  style={{
                    alignItems: 'center',
                    marginHorizontal: SIZES.radius,
                    marginBottom: 50,
                  }}>
                  <FastImage
                    source={{uri: receipt}}
                    style={{
                      height: 300,
                      width: 300,
                      overflow: 'hidden',
                      borderRadius: SIZES.radius,
                    }}
                  />
                </View>
              )}

              {/* Sub Total, discounts, points, service charge */}
              <View>
                {/* HR */}
                <View
                  style={{
                    marginTop: SIZES.padding,
                    width: '95%',
                    alignSelf: 'center',
                    borderBottomWidth: 0.7,
                    borderColor: appTheme.buttonText,
                  }}
                />
                <CartTotal
                  subTotal={itemSubTotal.toFixed(2)}
                  serviceFee={serviceFee.toFixed(2)}
                  points={RETURN_POINTS * cartProducts.length}
                  points1={RETURN_RECEIPT_POINTS}
                  points2={RETURN_SCAN_POINTS * cartProducts.length}
                />

                {/* continue button */}
                <TextButton
                  label={onLoading ? 'Loading...' : 'Continue'}
                  labelStyle={{color: COLORS.white, ...FONTS.h5}}
                  buttonContainerStyle={{
                    height: 50,
                    width: 300,
                    marginTop: SIZES.padding,
                    // backgroundColor: !receipt ? COLORS.gray : COLORS.gradient2,
                  }}
                  onPress={itemsToReturn}
                  // onPress={() =>
                  //   !receipt
                  //     ? Toast.show({
                  //         type: ALERT_TYPE.WARNING,
                  //         title: 'Warning',
                  //         textBody: 'Please upload photo of the Store Receipt',
                  //         autoClose: 1500,
                  //       })
                  //     : navigation.navigate('ItemShipment')
                  // }
                />
              </View>
            </View>
          }
        />
      </View>
    );
  }

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: appTheme.backgroundColor}}>
        <SubHeader
          icon={icons.shipped}
          showQty={true}
          title={`${store} Cart`}
          storeItems={cartProducts?.length || 0}
        />

        <Spinner
          visible={onLoading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />

        {cartProducts?.length ? (
          <>{renderCartList()}</>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginHorizontal: 10,
            }}>
            {/* No items to be shipped Animation */}
            <Text
              style={{
                ...FONTS.h2,
                textAlign: 'center',
                color: appTheme.textColor,
              }}>
              No items to be shipped!
            </Text>

            <View style={{alignItems: 'center'}}>
              <LottieView
                style={{height: 400, alignSelf: 'center'}}
                autoPlay
                speed={0.5}
                loop={true}
                source={require('../../assets/json/empty-box.json')}
              />
            </View>
          </View>
        )}
      </View>
    </Root>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(TripCart);

import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  FlatList,
  Text,
  View,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {useQuery} from '@apollo/client';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {
  ScanSection,
  SubHeader,
  StoreItem,
  TextButton,
} from '../../components';
import {getStore} from '../../queries/Home/StoreQueries';
import {GetStoreQuery, GetStoreQueryVariables} from '../../API';
import {HomeStackNavigatorParamList} from '../../type/navigation';
import {useAuthContext} from '../../context/AuthContext';
import {useReturnContext} from '../../context/ReturnContext';

const Store = ({appTheme}: any) => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const {addItemsToTripCart, setStoreID, cartProducts} = useReturnContext();
  const {userID} = useAuthContext();

  const route = useRoute<any>();
  const {selectedStoreId, storeName, storeImage}: any = route.params;

  const {loading, data, refetch} = useQuery<
    GetStoreQuery,
    GetStoreQueryVariables
  >(getStore, {variables: {id: selectedStoreId}, pollInterval: 300});

  const storeProducts =
    data?.getStore?.Products?.items
      .filter(sp => sp?.userID === userID)
      .filter(item => !item?._deleted) || [];

  useEffect(() => {
    const controller = new AbortController();
    setStoreID(selectedStoreId);
    return () => controller?.abort();
  }, [selectedStoreId, storeName]);

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

  function renderListSection() {
    return (
      <FlatList
        data={storeProducts}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item?.id.toString()}`}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => refetch()}
            tintColor={COLORS.gradient2}
          />
        }
        ItemSeparatorComponent={() => <View style={{marginTop: SIZES.base}} />}
        ListHeaderComponent={
          <View style={{margin: SIZES.radius}}>
            <Text
              style={{
                flex: 1,
                ...FONTS.h4,
                color: appTheme.textColor,
              }}>
              Store products
            </Text>
          </View>
        }
        renderItem={({item, index}) => {
          return (
            <StoreItem
              key={index}
              product={item}
              onPress={() => {
                addItemsToTripCart(item);
              }}
            />
          );
        }}
        ListFooterComponent={<View style={{marginBottom: 250}} />}
      />
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: appTheme.backgroundColor}}>
      <SubHeader
        icon={icons.cart}
        title={storeName}
        showQty={true}
        storeItems={cartProducts.length || 0}
        onPress={() =>
          navigation.navigate('TripCart', {
            storeId: selectedStoreId,
            store: storeName,
            image: storeImage,
          })
        }
      />
      {storeProducts.length > 0 ? (
        <>
          {renderListSection()}
          {cartProducts.length > 0 && (
            <TextButton
              label={`View Store Cart - ${cartProducts.length}`}
              labelStyle={{color: COLORS.white, ...FONTS.h5}}
              buttonContainerStyle={{
                height: 50,
                width: 300,
                position: 'absolute',
                bottom: 30,
              }}
              onPress={() =>
                navigation.navigate('TripCart', {
                  storeId: selectedStoreId,
                  store: storeName,
                  image: storeImage,
                })
              }
            />
          )}
        </>
      ) : (
        <ScanSection />
      )}
    </View>
  );
};

function mapStateToProps(state: {themeReducer: {appTheme: any}; error: any}) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(Store);

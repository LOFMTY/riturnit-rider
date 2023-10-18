import React, {useState} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import {connect} from 'react-redux';
import {useQuery} from '@apollo/client';

import {COLORS, SIZES, FONTS} from '../../constants';
import {PointsCard, TabHeader} from '../../components';
import {
  ListPointsQuery,
  ListPointsQueryVariables,
  ListStoresQuery,
  ListStoresQueryVariables,
  ListTripsQuery,
  ListTripsQueryVariables,
} from '../../API';
import {listStores} from '../../queries/Home/StoreQueries';
import {listPoints} from '../../queries/Home/HomeQueries';
import {useAuthContext} from '../../context/AuthContext';
import {listTrips} from '../../queries/Home/TripQueries';

const Points = ({appTheme}: any) => {
  const {userID} = useAuthContext();

  // LIST STORES
  const {loading, data, refetch} = useQuery<
    ListStoresQuery,
    ListStoresQueryVariables
  >(listStores, {pollInterval: 300});
  const stores = data?.listStores?.items.filter(item => !item?._deleted) || [];

  // LIST USERS RITURNIT POINTS
  const {data: onData} = useQuery<ListPointsQuery, ListPointsQueryVariables>(
    listPoints,
    {pollInterval: 300},
  );
  const userPoints =
    onData?.listPoints?.items
      .filter(usrID => usrID?.userID === userID)
      .filter(item => !item?._deleted) || [];

  // TOTAL USER POINTS
  const userRiturnitPoints = userPoints?.reduce(function (acc: any, obj: any) {
    return acc + obj.amount;
  }, 0);

  // FETCH TRIPS
  const {data: da} = useQuery<ListTripsQuery, ListTripsQueryVariables>(
    listTrips,
    {pollInterval: 100},
  );

  const fetchTrips: any =
    da?.listTrips?.items
      .filter(userId => userId?.userID === userID)
      .filter(ts => ts?.trip_status === 'COMPLETED')
      .filter(trips => !trips?._deleted) || [];

  // USER RECEIPT POINTS
  const userReceiptPoints = fetchTrips?.reduce(function (acc: any, obj: any) {
    return acc + obj.scan_receipt_point;
  }, 0);

  // USER PRODUCT POINTS
  const userProductPoints = fetchTrips?.reduce(function (acc: any, obj: any) {
    return acc + obj.scan_product_point;
  }, 0);

  const userPointsAccrued =
    userReceiptPoints + userProductPoints + userRiturnitPoints;

  // console.log('fetch trips', userReceiptPoints, userProductPoints);

  function redeemPoints() {
    return userPointsAccrued === 250 ? true : false;
  }

  function renderPointsCircle() {
    return (
      <View
        style={{
          alignItems: 'center',
          paddingBottom: 10,
          paddingHorizontal: SIZES.radius,
        }}>
        <CircularProgress
          initialValue={userPointsAccrued}
          value={userPointsAccrued}
          radius={100}
          duration={1000}
          maxValue={500}
          title={'Points'}
          titleColor={COLORS.gray}
          titleStyle={{fontWeight: '500'}}
          inActiveStrokeWidth={6}
          inActiveStrokeOpacity={0.6}
          activeStrokeColor={COLORS.gradient2}
          activeStrokeWidth={SIZES.radius}
          activeStrokeSecondaryColor={'#C25AFF'}
        />

        {/* Redeem Points Button */}
        <View style={{marginTop: SIZES.radius}}>
          <TouchableOpacity
            disabled={redeemPoints() ? false : true}
            style={{
              borderRadius: 30,
              backgroundColor: redeemPoints()
                ? COLORS.gradient2
                : appTheme.tabBackgroundColor,
              margin: 10,
              height: 50,
              justifyContent: 'center',
              width: 200,
            }}>
            <Text
              style={{
                textAlign: 'center',
                ...FONTS.h4,
                fontWeight: '500',
                color: redeemPoints() ? COLORS.white : COLORS.silver,
              }}>
              Redeem my Points
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderPointsReceived() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: SIZES.radius,
        }}>
        <FlatList
          data={stores}
          numColumns={2}
          keyExtractor={item => `${item?.id.toString()}`}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            height: 200,
          }}
          renderItem={({item, index}: any) => {
            // RITURNIT POINTS
            const riturnitPointQty = item?.Points?.items.reduce(function (
              acc: any,
              obj: any,
            ) {
              return acc + obj.amount;
            },
            0);

            const filterTripStatusPoints = item?.Trips.items.filter(
              (ts: {trip_status: string}) => ts?.trip_status === 'COMPLETED',
            );

            // USER PRODUCT POINTS
            const tripScanProductPointQty = filterTripStatusPoints?.reduce(
              function (acc: any, obj: any) {
                return acc + obj.scan_product_point;
              },
              0,
            );

            // USER RECEIPT POINTS
            const tripReceiptPointQty = filterTripStatusPoints?.reduce(
              function (acc: any, obj: any) {
                return acc + obj.scan_receipt_point;
              },
              0,
            );

            const totalAccumulatedPoints =
              riturnitPointQty + tripScanProductPointQty + tripReceiptPointQty;

            return (
              <PointsCard
                store={item}
                key={index}
                points={totalAccumulatedPoints}
              />
            );
          }}
          refreshControl={
            <RefreshControl
              tintColor={COLORS.gradient2}
              refreshing={loading}
              onRefresh={refetch}
            />
          }
          ListHeaderComponent={renderPointsCircle()}
          ListFooterComponent={<View style={{marginBottom: 140}}></View>}
        />
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: appTheme.backgroundColor}}>
      <TabHeader title="Points" />
      {renderPointsReceived()}
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(Points);

import React from 'react';
import {View, RefreshControl, FlatList, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';

import {ReturnStoreItem, TabHeader} from '../../components';
import {BottomTabNavigatorParamList} from '../../type/navigation';
import {useAuthContext} from '../../context/AuthContext';
import {listTrips} from '../../queries/Home/TripQueries';
import {ListTripsQuery, ListTripsQueryVariables} from '../../API';
import {COLORS, FONTS, SIZES} from '../../constants';

const Returns = ({appTheme}: any) => {
  const navigation = useNavigation<BottomTabNavigatorParamList>();

  const {userID} = useAuthContext();

  // FETCH TRIPS
  const {loading, data, refetch} = useQuery<
    ListTripsQuery,
    ListTripsQueryVariables
  >(listTrips, {pollInterval: 100});

  const fetchTrips: any =
    data?.listTrips?.items
      .filter(userId => userId?.userID === userID)
      .filter(ts => ts?.trip_status !== 'COMPLETED')
      .filter(ts => ts?.trip_status !== 'CANCELED')
      .filter(ret => ret?.trip_status)
      .filter(trips => !trips?._deleted)
      .sort((a: any, b: any): any => a?.createdAt < b?.createdAt) || [];

  // console.log(fetchTrips);

  function renderListSection() {
    return (
      <FlatList
        data={fetchTrips}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item?.id.toString()}`}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => refetch()}
            tintColor={COLORS.gradient2}
          />
        }
        renderItem={({item, index}) => {
          return (
            <ReturnStoreItem
              key={index}
              dropOff={item?.dropoff_location_description}
              pickUp={item?.pickup_location_description}
              store_image={item?.store_image}
              store_name={item?.store_name}
              price={item?.trip_cost}
              createdAt={item?.createdAt}
              status={item?.trip_status}
              statusColor={
                item?.trip_status === 'COMPLETED'
                  ? COLORS.caribbeanGreen
                  : item?.trip_status === 'PICKED_UP'
                  ? COLORS.yellow
                  : item?.trip_status === 'NEW'
                  ? COLORS.mint
                  : COLORS.gradient2
              }
              onPress={() =>
                navigation.navigate('ReturnLiveUpdates', {
                  trip: item,
                })
              }
            />
          );
        }}
        ListFooterComponent={<View style={{marginBottom: 200}} />}
      />
    );
  }

  function renderNoTripsSection() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: SIZES.radius,
          marginHorizontal: SIZES.padding * 1.5,
        }}>
        {/* No Returns  */}
        <View style={{paddingTop: SIZES.padding}}>
          <Text
            style={{
              ...FONTS.h3,
              fontWeight: '500',
              color: appTheme.textColor,
            }}>
            No Returns made yet
          </Text>
        </View>
        <LottieView
          style={{height: 300, alignSelf: 'center'}}
          autoPlay
          speed={1.5}
          loop={true}
          source={require('../../assets/json/no_returns.json')}
        />

        <View style={{paddingTop: SIZES.radius, alignItems: 'center'}}>
          <Text
            style={{
              ...FONTS.body1,
              color: appTheme.textColor,
              textAlign: 'center',
            }}>
            You currently have no active Returns
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: appTheme.backgroundColor}}>
      <TabHeader title="Return Details" />

      {fetchTrips.length > 0 ? (
        <>{renderListSection()}</>
      ) : (
        <>{renderNoTripsSection()}</>
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

export default connect(mapStateToProps)(Returns);

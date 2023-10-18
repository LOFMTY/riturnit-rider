import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import {useQuery} from '@apollo/client';

import {SIZES, FONTS, COLORS} from '../../../constants';
import {Header} from '../../../components';
import {ListTripsQuery, ListTripsQueryVariables} from '../../../API';
import {listTrips} from '../../../queries/Home/TripQueries';
import {useAuthContext} from '../../../context/AuthContext';

const TripList = ({navigation, appTheme}: any) => {
  const {userID} = useAuthContext();

  // LIST TRIPS = COMPLETED
  const {loading, data, refetch} = useQuery<
    ListTripsQuery,
    ListTripsQueryVariables
  >(listTrips, {pollInterval: 100});

  const completedTrips: any =
    data?.listTrips?.items
      .filter(
        ts =>
          ts?.trip_status !== 'NEW' &&
          ts?.trip_status !== 'ACCEPTED' &&
          ts?.trip_status !== 'PICKED_UP',
      )
      .filter(ret => ret?.trip_status)
      .filter(userId => userId?.userID === userID)
      .filter(trips => !trips?._deleted) || [];

  if (loading) {
    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center'}}
        size={'large'}
        color={'#3580ff'}
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
          source={require('../../../assets/json/no_returns.json')}
        />

        <View style={{paddingTop: SIZES.radius, alignItems: 'center'}}>
          <Text
            style={{
              ...FONTS.body1,
              color: appTheme.textColor,
              textAlign: 'center',
            }}>
            You have not completed any returns yet. Return your first item
            today.
          </Text>
        </View>
      </View>
    );
  }

  function renderNotificationList() {
    return (
      <FlatList
        data={completedTrips}
        refreshing={true}
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
            // Notification Items
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: SIZES.base,
                marginTop: SIZES.radius,
                padding: SIZES.radius,
                borderRadius: SIZES.base,
                backgroundColor: appTheme.tabBackgroundColor,
              }}
              onPress={() =>
                navigation.navigate('TripDetails', {
                  tripDetail: item,
                })
              }>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                {/* Notification Title */}
                <Text
                  numberOfLines={2}
                  style={{
                    ...FONTS.body3,
                    color: appTheme.textColor,
                  }}>
                  Items returned to:{' '}
                  <Text
                    // numberOfLines={1}
                    style={{
                      ...FONTS.h6,
                      color: appTheme.textColor,
                    }}>
                    {item?.dropoff_location_description}
                  </Text>
                </Text>

                {/* Notification Date */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 2,
                  }}>
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={{
                        paddingTop: 3,
                        ...FONTS.body3,
                        color: appTheme.buttonText,
                      }}>
                      {dayjs(item?.updatedAt).format(
                        'ddd, MMMM DD, YYYY @ HH:mm A',
                      )}
                    </Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={{
                        ...FONTS.h5,
                        color: COLORS.caribbeanGreen,
                      }}>
                      ${parseFloat(item?.trip_cost).toFixed(2)}
                    </Text>
                  </View>
                </View>

                {/* </View> */}
              </View>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={<View style={{paddingBottom: 300}} />}
      />
    );
  }

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: appTheme.backgroundColor,
        },
      ]}>
      <Header
        title="Trip History"
        onPress={() => navigation.goBack()}
        titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
      />
      {completedTrips.length > 0 ? (
        <>{renderNotificationList()}</>
      ) : (
        <>{renderNoTripsSection()}</>
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

export default connect(mapStateToProps)(TripList);

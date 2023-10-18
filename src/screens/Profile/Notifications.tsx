import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import {useQuery} from '@apollo/client';

import {SIZES, FONTS} from '../../constants';
import {Header, NotificationTab} from '../../components';
import {ProfileStackNavigatorParamList} from '../../type/navigation';
import {
  ListSystemNotificationsQuery,
  ListSystemNotificationsQueryVariables,
} from '../../API';
import {listSystemNotifications} from '../../queries/Notifications/NotificationsQueries';

const Notifications = ({appTheme}: any) => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();

  const {loading, data} = useQuery<
    ListSystemNotificationsQuery,
    ListSystemNotificationsQueryVariables
  >(listSystemNotifications);

  const allNotifications =
    data?.listSystemNotifications?.items.filter(item => !item?._deleted) || [];

  if (loading) {
    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center'}}
        size={'large'}
        color={'#3580ff'}
      />
    );
  }

  function renderNoNotifications() {
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
          source={require('../../assets/json/noNotification.json')}
        />

        <View style={{paddingTop: SIZES.radius, alignItems: 'center'}}>
          <Text
            style={{
              ...FONTS.body1,
              color: appTheme.textColor,
              textAlign: 'center',
            }}>
            You currently have no notifications
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.backgroundColor,
      }}>
      <Header
        nav={true}
        onPress={() => navigation.goBack()}
        title="Notifications"
        titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
        contentStyle={{paddingTop: SIZES.height > 700 ? 0 : SIZES.base}}
      />

      {allNotifications.length > 0 ? (
        <FlatList
          data={allNotifications}
          keyExtractor={item => `${item?.id}`}
          renderItem={({item, index}) => {
            return (
              <NotificationTab
                key={index}
                title={item?.title}
                body={item?.message}
              />
            );
          }}
          ListFooterComponent={<View style={{marginBottom: 80}} />}
        />
      ) : (
        <>{renderNoNotifications()}</>
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

export default connect(mapStateToProps)(Notifications);

import React, {useRef} from 'react';
import {
  View,
  Animated,
  ActivityIndicator,
  RefreshControl,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';

import {COLORS, FONTS, SIZES} from '../../constants';
import {Header, ReceiptCard} from '../../components';
import {ProfileStackNavigatorParamList} from '../../type/navigation';
import {ListStoresQuery, ListStoresQueryVariables} from '../../API';
import {listStores} from '../../queries/Home/StoreQueries';

const Receipts = ({appTheme}: any) => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();

  const scrollY = useRef(new Animated.Value(0)).current;

  // GET USER RECEIPTS
  const {loading, data, refetch} = useQuery<
    ListStoresQuery,
    ListStoresQueryVariables
  >(listStores, {pollInterval: 300});

  const userReceipt: any = data?.listStores?.items.filter(
    item => !item?._deleted || [],
  );
  function renderReceiptsCard() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: SIZES.radius,
        }}>
        <Animated.FlatList
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          numColumns={2}
          data={userReceipt}
          keyExtractor={item => `${item}`}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={true}
          columnWrapperStyle={{
            height: 200,
          }}
          renderItem={({item, index}) => {
            return (
              // Receipt Card
              <View
                key={index}
                style={{
                  width: SIZES.width / 2 - 10,
                  paddingHorizontal: 8,
                }}>
                <ReceiptCard
                  key={index}
                  store={item}
                  onPress={() =>
                    navigation.navigate('AllReceipts', {
                      selectedStoreId: item?.id,
                      storeName: item?.name,
                    })
                  }
                />
              </View>
            );
          }}
          refreshControl={
            <RefreshControl
              tintColor={COLORS.gradient2}
              refreshing={loading}
              onRefresh={refetch}
            />
          }
          ListFooterComponent={<View style={{marginBottom: 220}}></View>}
        />
      </View>
    );
  }

  function renderNoReceiptsSection() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: SIZES.radius,
          marginHorizontal: SIZES.padding * 1.5,
        }}>
        {/* No Receipts  */}
        <View style={{paddingTop: SIZES.padding}}>
          <Text
            style={{
              ...FONTS.h3,
              fontWeight: '500',
              color: appTheme.textColor,
            }}>
            No Receipts available at the moment
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
            You have no receipts from any Store at the moment
          </Text>
        </View>
      </View>
    );
  }

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

  return (
    <View style={{flex: 1, backgroundColor: appTheme.backgroundColor}}>
      <Header
        title="Your Receipts"
        onPress={() => navigation.goBack()}
        titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
      />

      {userReceipt.length > 0 ? (
        <>{renderReceiptsCard()}</>
      ) : (
        <>{renderNoReceiptsSection()}</>
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

export default connect(mapStateToProps)(Receipts);

import {useRef} from 'react';
import {
  View,
  ActivityIndicator,
  Animated,
  Dimensions,
  RefreshControl,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
import LottieView from 'lottie-react-native';

import {SIZES, FONTS, COLORS} from '../../constants';
import {Header} from '../../components';
import {ListReceiptsQueryVariables, ListReceiptsQuery} from '../../API';
import {getStore} from '../../queries/Home/StoreQueries';
import {useAuthContext} from '../../context/AuthContext';
import {DEFAULT_IMAGE} from '../../utilities/Utils';
import {
  AllReceiptsRouteProp,
  ProfileStackNavigatorParamList,
} from '../../type/navigation';

const AllReceipts = ({appTheme}: any) => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();
  const route = useRoute<AllReceiptsRouteProp>();

  const {userID} = useAuthContext();

  const {storeName, selectedStoreId}: any = route.params;

  const scrollY = useRef(new Animated.Value(0)).current;

  const width = Dimensions.get('window').width - 20;

  const {loading, data, refetch} = useQuery<
    ListReceiptsQuery,
    ListReceiptsQueryVariables
  >(getStore, {pollInterval: 300});

  const storeReceipts =
    data?.listReceipts?.items
      .filter(uID => uID?.userID === userID)
      .filter(sID => sID?.storeID === selectedStoreId)
      .filter(item => !item?._deleted) || [];

  // console.log(storeReceipts);

  function renderReceiptsCard() {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: appTheme.backgroundColor,
          marginTop: SIZES.radius,
        }}>
        <Animated.FlatList
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          numColumns={2}
          data={storeReceipts}
          keyExtractor={item => `${item?.id.toString()}`}
          showsVerticalScrollIndicator={true}
          columnWrapperStyle={{
            height: 240,
          }}
          renderItem={({item, index}) => {
            const receiptDate = dayjs(item?.createdAt).format('YYYY-MM-DD');

            return (
              <View
                key={index}
                style={{
                  width: width / 2 - 3,
                  paddingHorizontal: 8,
                }}>
                <View
                  style={{
                    height: 220,
                    borderRadius: 25,
                    backgroundColor: appTheme.tabBackgroundColor,
                  }}>
                  <FastImage
                    source={{uri: item?.image || DEFAULT_IMAGE}}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                      width: '90%',
                      height: 150,
                      top: 10,
                      borderRadius: 20,
                      alignSelf: 'center',
                    }}
                  />

                  {/* Store Name */}
                  <View
                    style={{
                      paddingHorizontal: 14,
                      paddingTop: SIZES.margin,
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        justifyContent: 'center',
                        ...FONTS.body4,
                        textAlign: 'center',
                        color: appTheme.textColor,
                      }}>
                      {receiptDate}
                    </Text>
                  </View>
                </View>
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

  function NoReceipts() {
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
            You have not completed any returns yet.
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
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.backgroundColor,
      }}>
      <Header
        title={`${storeName} receipts`}
        onPress={() => navigation.goBack()}
        titleStyle={{...FONTS.h5}}
        titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
      />

      {storeReceipts.length > 0 ? (
        <>{renderReceiptsCard()}</>
      ) : (
        <>{NoReceipts()}</>
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

export default connect(mapStateToProps)(AllReceipts);

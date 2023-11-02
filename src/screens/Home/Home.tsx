import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Animated,
  TextInput,
  RefreshControl,
  Alert,
  ActivityIndicator,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {useQuery} from '@apollo/client';

import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {HomeHeader, StoreCard} from '../../components';
import {ListStoresQuery, ListStoresQueryVariables} from '../../API';
import {listStores} from '../../queries/Home/StoreQueries';
import { Subscribtion } from './Subscribtion';
import { useAuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({appTheme}: any) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation<any>();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
  const [masterDataSource, setMasterDataSource] = useState<any>([]);
  const [subscribeId, setSubscribeId] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoadedUser, setIsLoadingUser] = useState(false)

  const {authUser, isLoading}: any = useAuthContext();

  // LIST STORES
  const {loading, data, refetch} = useQuery<
    ListStoresQuery,
    ListStoresQueryVariables
  >(listStores, {pollInterval: 300});

  const searchFilterFunction = (text: any) => {
    if (text) {
      const newData = masterDataSource.filter(function (item: any) {
        const itemData = item.name ? item.name.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  useEffect(() => {
    let unmounted = false
    try {
      const stores = data?.listStores?.items.filter(
        item => !item?._deleted || [],
      );
      setFilteredDataSource(stores);
      setMasterDataSource(stores);
    } catch (error) {
      Alert.alert((error as Error).message);
    }
    return () => {
      unmounted = true;
    };
  }, [loading]);

  if (loading || isLoading) {
    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center'}}
        size={'large'}
        color={COLORS.gradient2}
      />
    );
  }

  //Store section Content
  function renderStoreSection() {
    return (
      <View
        style={{
          alignItems: 'center',
          backgroundColor: appTheme.backgroundColor,
          marginTop: SIZES.radius,
        }}>
          {/* {subscribeId ? null : <Subscribtion isOpen={isOpen} setIsOpen={setIsOpen} />} */}
          <Subscribtion />
        <Animated.FlatList
          data={filteredDataSource}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          numColumns={2}
          keyExtractor={item => `${item?.id.toString()}`}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            height: 195,
          }}
          renderItem={({item, index}) => {
            return (
              <StoreCard
                key={index}
                store={item}
                onPress={() =>
                  navigation.navigate('Store', {
                    selectedStoreId: item?.id,
                    storeName: item?.name,
                    storeImage: item?.image,
                  })
                }
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
          ListFooterComponent={<View style={{marginBottom: 900}} />}
        />
      </View>
    );
  }

  return (
    <View style={{backgroundColor: appTheme.backgroundColor}}>
      <HomeHeader>
        {/* Search Box */}
        <View
          style={{
            backgroundColor: appTheme.searchBG,
            height: 50,
            borderWidth: 0.2,
            marginBottom: 15,
            marginTop: SIZES.margin,
            flexDirection: 'row',
            paddingHorizontal: 15,
            borderRadius: SIZES.radius,
            borderColor: appTheme.buttonText,
          }}>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              source={icons.search}
              style={{width: 25, height: 25}}
              tintColor={appTheme.backgroundColor}
            />
          </View>

          <TextInput
            autoFocus={false}
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            placeholder={'Search store'}
            placeholderTextColor={appTheme.backgroundColor}
            style={{
              color: appTheme.textColor,
              paddingLeft: SIZES.radius,
              justifyContent: 'center',
              ...FONTS.body1,
            }}
          />
        </View>
      </HomeHeader>

      {renderStoreSection()}
    </View>
  );
};

function mapStateToProps(state: {themeReducer: {appTheme: any}; error: any}) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(Home);

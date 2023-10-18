import React, {useState, memo} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {Root, ALERT_TYPE, Toast} from 'react-native-alert-notification';

import {Header, TextButton} from '../../../components';
import {SIZES, COLORS, FONTS} from '../../../constants';
import {HomeStackNavigatorParamList} from '../../../type/navigation';
import AddressPickup from './AddressPickup';

interface ICoordinates {
  coords: number | any;
  desc: string | any;
}

const DestinationSearch = ({appTheme}: any) => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const [state, setState] = useState<ICoordinates | any>({
    userAddressCoords: {},
    storeDestinationCoords: {},
  });

  const {userAddressCoords, storeDestinationCoords} = state;

  const onDone = () => {
    const isValid = checkValid();
    if (isValid) {
      navigation.navigate('RouteDestination', {
        userAddressCoords,
        storeDestinationCoords,
      });
    }
  };

  const checkValid = () => {
    if (Object.keys(userAddressCoords).length === undefined) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Please enter your location',
        autoClose: 1000,
      });
      return false;
    }
    if (Object.keys(storeDestinationCoords).length === undefined) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Please enter Store location',
        autoClose: 1000,
      });
      return false;
    }
    return true;
  };

  const fetchUserAddressCords = (coords: any, desc: any) => {
    setState({
      ...state,
      userAddressCoords: {
        location: coords,
        description: desc,
      },
    });
  };

  const fetchStoreLocationCords = (coords: any, desc: any) => {
    setState({
      ...state,
      storeDestinationCoords: {
        location: coords,
        description: desc,
      },
    });
  };

  // console.log(userAddressCoords);
  // console.log(storeDestinationCoords);

  return (
    <Root>
      <View style={{flex: 1, backgroundColor: appTheme.backgroundColor}}>
        <Header
          title="Choose your points"
          onPress={() => navigation.goBack()}
          titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
          contentStyle={{paddingTop: SIZES.height > 700 ? 0 : 10}}
        />

        {/* Search 1 - User Current Location  */}
        <View
          style={{
            flex: 1,
            marginTop: SIZES.base,
            paddingLeft: 4,
            marginHorizontal: SIZES.radius,
            height: '100%',
          }}>
          <AddressPickup
            placheholderText="Choose your current location"
            placeholderTextColor={{color: appTheme.inputTextColor}}
            fetchAddress={fetchUserAddressCords}
            containerStyle={{
              textInput: {
                marginLeft: SIZES.padding * 1.3,
                backgroundColor: appTheme.tabBackgroundColor,
                borderRadius: SIZES.radius,
                height: 45,
                padding: 10,
                color: appTheme.textColor,
                fontSize: SIZES.body3,
                marginVertical: 5,
              },
              loader: {
                flexDirection: 'row',
                justifyContent: 'flex-end',
                height: 20,
                padding: 20,
              },
              row: {
                backgroundColor: appTheme.backgroundColor,
                color: appTheme.textColor,
                padding: 8,
                height: 40,
                fontSize: SIZES.body2,
              },
              listView: {
                backgroundColor: appTheme.backgroundColor,
                color: appTheme.textColor,
                position: 'absolute',
                top: 120,
                height: SIZES.height > 700 ? 400 : 300,
              },
              autocompleteContainer: {
                backgroundColor: appTheme.backgroundColor,
                position: 'absolute',
                top: 0,
                left: 10,
                right: 10,
              },
            }}
          />
          <AddressPickup
            placheholderText="Choose store location"
            fetchAddress={fetchStoreLocationCords}
            query={{
              types: 'establishment, address',
            }}
            containerStyle={{
              textInput: {
                marginLeft: SIZES.padding * 1.3,
                backgroundColor: appTheme.tabBackgroundColor,
                borderRadius: SIZES.radius,
                height: 45,
                padding: 10,
                color: appTheme.textColor,
                fontSize: SIZES.body3,
                marginVertical: 5,
              },
              loader: {
                flexDirection: 'row',
                justifyContent: 'flex-end',
                height: 20,
                padding: 20,
              },
              row: {
                backgroundColor: appTheme.backgroundColor,
                color: appTheme.textColor,
                padding: 8,
                height: 40,
                fontSize: SIZES.body2,
              },
              listView: {
                backgroundColor: appTheme.backgroundColor,
                color: appTheme.textColor,
                top: 60,
                position: 'absolute',
                height: SIZES.height > 700 ? 400 : 300,
              },
              autocompleteContainer: {
                position: 'absolute',
                left: 10,
                right: 10,
              },
            }}
          />
        </View>
        <TextButton
          label={'Continue'}
          labelStyle={{color: COLORS.white, ...FONTS.h5}}
          buttonContainerStyle={{
            height: 45,
            width: 300,
            marginBottom: 40,
          }}
          onPress={onDone}
        />
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

export default connect(mapStateToProps)(memo(DestinationSearch));

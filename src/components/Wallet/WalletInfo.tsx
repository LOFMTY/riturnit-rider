import {View, Text} from 'react-native';
import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import {SIZES, COLORS, FONTS, icons, images} from '../../constants';
import WalletTabs from './WalletTabs';
import TextButton from '../Buttons/TextButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const convertCentsToDollarsAndCents = (cents: number) => {
  const dollars = Math.floor(cents / 100);
  const remainingCents = cents % 100;

  const formattedDollars = dollars.toFixed(0);
  const formattedCents = remainingCents.toFixed(0);

  let result = `${formattedDollars}`;

  if (formattedCents !== '0') {
    result += `,${formattedCents}`;
  }

  return result
}

const WalletInfo = ({appTheme}: any) => {
  const navigation = useNavigation<any>();

  const [balance, setBalance] = useState(0)

  const getUserBalance = async () => {
    const stripe_id = await AsyncStorage.getItem('stripe_id')
    const response = await fetch('https://wrm646oi52lgkg4sncf3a5vte40daxhl.lambda-url.us-east-1.on.aws/customers/' + stripe_id, {
      headers: {
        "x-api-key": "4L1FPSYjVH1ijKSNEZ9S31RraORx5tdH9a60tE5z"
      },
    })
    const data = await response.json()
    setBalance(data.data.balance)
  }

  useEffect(() => {
    getUserBalance()
  }, [])

  return (
    <View
      style={{
        marginHorizontal: SIZES.padding,
        marginTop: SIZES.margin,
        marginBottom: SIZES.radius,
      }}>
      <View
        style={{
          backgroundColor: appTheme.tabBackgroundColor,
          borderRadius: SIZES.radius,
          padding: SIZES.radius,
        }}>
        {/* Riturnit Logo */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <FastImage
            source={icons.logo}
            resizeMode={FastImage.resizeMode.contain}
            style={{width: 35, height: 35, justifyContent: 'center'}}
          />
          {/* Riturnit Cash Caption */}
          <View
            style={{
              flex: 1,
              paddingLeft: SIZES.base,
              justifyContent: 'center',
              bottom: 2,
            }}>
            <Text
              style={{
                ...FONTS.h6,
                color: appTheme.textColor,
              }}>
              Riturnit balance
            </Text>
          </View>
        </View>

        {/* Wallet Amount */}
        <View style={{paddingHorizontal: SIZES.base, paddingTop: SIZES.base}}>
          <Text style={{...FONTS.h3, color: appTheme.textColor}}>${convertCentsToDollarsAndCents(balance)}</Text>
        </View>

        {/* Horizontal Tabs */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: SIZES.margin,
          }}>
          {/* Add Money */}
          <WalletTabs
            imageIcon={images.addMoney}
            title="Add Cash"
            onPress={() => navigation.navigate('AddToBalance')}
          />

          {/* Auto Withdrawal */}
          <WalletTabs
            imageIcon={images.autoWithdraw}
            title="Auto Refill"
            onPress={() => navigation.navigate('AutoRefill')}
          />

          <WalletTabs
            imageIcon={images.gift}
            title="Gift Card"
            onPress={() => navigation.navigate('GiftCard')}
          />
        </View>

        {/* Horizontal Rule */}
        <View
          style={{
            marginTop: SIZES.margin,
            width: '90%',
            alignSelf: 'center',
            borderBottomWidth: 0.3,
            borderColor: appTheme.buttonText,
          }}
        />

        <TextButton
          label={'Transaction history'}
          labelStyle={{color: COLORS.gradient2, ...FONTS.h6}}
          buttonContainerStyle={{
            marginTop: SIZES.base,
            marginLeft: 10,
            alignSelf: 'flex-start',
            backgroundColor: null,
          }}
          onPress={() => navigation.navigate('PaymentHistory')}
        />
      </View>
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
  };
}

export default connect(mapStateToProps)(WalletInfo);
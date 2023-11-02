import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';

import {PaymentTab, Header} from '../../components';
import {SIZES, dummyData, COLORS, icons} from '../../constants';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { PlatformPay, createPlatformPayPaymentMethod } from '@stripe/stripe-react-native';
import { convertCentsToDollarsAndCents } from '../../components/Wallet/WalletInfo';
import { useAuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Payment = ({appTheme}: any) => {
  const navigation = useNavigation()
  const route = useRoute()

  const [isPayed, setIsPayed] = useState(false)

  const amount = route?.params?.amount

  const handleApplePay = async () => {
    const { error, paymentMethod } = await createPlatformPayPaymentMethod({
      applePay: {
        cartItems: [
          {
            label: 'Acccount Balance',
            amount: amount,
            paymentType: PlatformPay.PaymentType.Immediate,
          }
        ],
        merchantCountryCode: 'US',
        currencyCode: 'USD',
      },
    });
    if (!error) {
      const stripe_id = await AsyncStorage.getItem('stripe_id')
      await fetch(`https://wrm646oi52lgkg4sncf3a5vte40daxhl.lambda-url.us-east-1.on.aws/payments`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '4L1FPSYjVH1ijKSNEZ9S31RraORx5tdH9a60tE5z'
        },
        body: JSON.stringify({
          "payment_method": "pm_card_visa",
          "amount": amount * 100,
          "currency": "usd",
          "paymentMetodType": "card",
          "customerId": stripe_id
        })
      });
      setIsPayed(true)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.backgroundColor,
      }}>
      <Header
        title=""
        onPress={() => isPayed ? navigation.navigate('MyProfile') : navigation.goBack()}
        titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
        type
      />
      <View style={{
        // alignItems: 'center'
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <View />
        <View style={{
            alignItems: 'center'
        }}>
            {isPayed && <FastImage
                source={icons.check_circle}
                style={{
                    width: 160,
                    height: 160
                }}
            />}
            {isPayed ? <View style={{alignItems: 'center'}}>
              <Text>You have successfully added <Text style={{color: '#3580FF'}}>${amount}</Text></Text>
              <Text>to your wallet</Text>
            </View> : <Text>Click the "Pay" button and fund your account</Text>}
        </View>
        <TouchableOpacity
            onPress={() => isPayed ? navigation.navigate('MyProfile') : handleApplePay()}
            style={{
                marginBottom: 48
            }}
        >
            <LinearGradient
                colors={["#6098F6", "#3580FF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                    height: 64,
                    marginHorizontal: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 1,
                    borderRadius: 16
                }}
            >
                <Text style={{
                    fontSize: 18,
                    color: 'white',
                    fontWeight: '700'
                }}>{isPayed ? 'Save' : 'Pay'}</Text>
            </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
  };
}

export default connect(mapStateToProps)(Payment);

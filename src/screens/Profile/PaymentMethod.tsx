import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';

import FastImage from 'react-native-fast-image';
import {SIZES, FONTS, icons} from '../../constants';
import { Header } from '../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PlatformPay, createPlatformPayPaymentMethod, useStripe } from '@stripe/stripe-react-native';

const methods = [
    // {
    //     id: 1,
    //     icon: require('../../assets/icons/appleBlue.png'),
    //     iconSizes: {
    //         width: 19,
    //         height: 24,
    //     },
    //     title: 'Apple Pay'
    // },
    {
        id: 2,
        icon: require('../../assets/icons/card.png'),
        iconSizes: {
            width: 20,
            height: 16,
        },
        title: 'Credit or debit card',
        path: 'AddCard'
    }
]

const PaymentMethod = ({appTheme, onPress}: any) => {
  const navigation = useNavigation<any>();

  return (
    <View
      style={{
        flex: 1,
          backgroundColor: appTheme.backgroundColor,
      }}>
        <Header
          title="Add payment method "
          onPress={() => navigation.goBack()}
          titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
        />
        <View style={{
            backgroundColor: appTheme.tabBackgroundColor,
            margin: 30,
            paddingVertical: 19,
            borderRadius: 10,
        }}>
            {methods.map((e, i) => (
                <TouchableOpacity
                    onPress={() => e.path && navigation.navigate(e.path)}
                    activeOpacity={0.8}
                    key={e.id} style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottomColor: '#F2F3F5',
                    borderBottomWidth: i === methods.length - 1 ? 0 : 1,
                    paddingHorizontal: 22,
                    paddingTop: i === 0 ? 0 : 19,
                    paddingBottom: methods.length <= 1 ? 1 : i === 0 ? 19 : 0
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <FastImage source={e.icon} style={{width: e.iconSizes.width, height: e.iconSizes.height}} />
                        <Text style={{ fontSize: 14, fontWeight: '600', marginLeft: 12, color: appTheme.textColor }}>{e.title}</Text>
                    </View>
                    <FastImage
                        source={icons.right}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            width: 15,
                            height: 15,
                        }}
                    />
                </TouchableOpacity>
            ))}
        </View>
    </View>
  );
};

function mapStateToProps(state: {themeReducer: {appTheme: any}; error: any}) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(PaymentMethod);

//////////////////////////////////////

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useStripe, usePlatformPay, PlatformPayButton, PlatformPay } from '@stripe/stripe-react-native';
// import React from 'react'
// import { Alert, Button, View } from "react-native";

// const API_URL = 'https://wrm646oi52lgkg4sncf3a5vte40daxhl.lambda-url.us-east-1.on.aws/'

// export default function PaymentMethod() {
//     const { initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment, createPaymentMethod, createToken } = useStripe();
//     const { isPlatformPaySupported, confirmPlatformPayPayment, openPlatformPaySetup } = usePlatformPay()
//     const [loading, setLoading] = React.useState(false);
  
//     const fetchPaymentSheetParams = async () => {
      // const response = await fetch(`${API_URL}/payments`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'x-api-key': '4L1FPSYjVH1ijKSNEZ9S31RraORx5tdH9a60tE5z'
      //   },
      //   body: JSON.stringify({
      //     "payment_method": "pm_card_visa",
      //     "amount": "50",
      //     "currency": "usd",
      //     "paymentMetodType": "card",
      //     "customerId": "cus_OtLuEKykGbs1LD"
      //   })
      // });
      // // const { paymentIntent, ephemeralKey, customer} = await response.json();
      // const dat = await response.json()

//       console.warn(231, dat)
  
//       return {
//         // clientSecret: dat.data.clientSecret,
//         // paymentIntent,
//         // ephemeralKey,
//         // customer,
//       };
//     };

//     const subscribe = async () => {
//         // const token = await createToken({
//         //     type: 'Card',
//         //     address: {
//         //         city: 'NY',
//         //         country: 'US',
//         //         // postalCode: '',
//         //         // state: '',
//         //     },
//         //     name: 'name',
//         //     currency: 'usd',
//         // })
//         // console.warn(2233, token)
//         try {
//           // sending request
//           const response = await fetch(`${API_URL}/products`, {
//             method: "POST",
//             body: JSON.stringify({ name: 'test', type: 'service', description: 'tewtwetwe twet' }),
//             headers: {
//               "Content-Type": "application/json",
//               'x-api-key': '4L1FPSYjVH1ijKSNEZ9S31RraORx5tdH9a60tE5z'
//             },
//           });
//           const data = await response.json();
//           console.warn('7777', data)
//           if (!response.ok) return Alert.alert(data.message);
//           const clientSecret = 'sk_test_51MdxGXHzF6NKvTnpfRMEQr7sfWFw0OF850NXop4vmmMQ6KmL02T0yGheleSYhjWP2JG04eb3sKmyhuB84uuaWexm00WGZLk5z3';
//           const initSheet = await initPaymentSheet({
//             paymentIntentClientSecret: clientSecret,
//             returnURL: 'riturnit://app'
//           })
//           if (initSheet.error) return console.warn(11223, initSheet.error.message);
//           const presentSheet = await presentPaymentSheet({
//             clientSecret,
//           });
//           if (presentSheet.error) return Alert.alert(presentSheet.error.message);
//           Alert.alert("Payment complete, thank you!");
//         } catch (err) {
//           console.error(333, err);
//           Alert.alert("Something went wrong, try again later!");
//         }
//       };

//     const openPaymentSheet = async () => {
//       // console.warn(await isPlatformPaySupported())
//         // const { error } = await presentPaymentSheet();
    
//         // if (error) {
//         //   console.warn(`Error code: ${error.code}`, error.message);
//         // } else {
//         //   Alert.alert('Success', 'Your order is confirmed!');
//         // }

//         //////

//         const {
//             clientSecret
//           } = await fetchPaymentSheetParams();

//         const { error } = await confirmPlatformPayPayment(clientSecret, {
//             applePay: {
//                 cartItems: [
//                     {
//                         label: 'test',
//                         amount: '14.00',
//                         paymentType: PlatformPay.PaymentType.Immediate
//                     }
//                 ],
//                 merchantCountryCode: 'US',
//                 currencyCode: 'USD'
//             },
//         })

//     //     console.warn(999191, error)
//       };
  
//     const initializePaymentSheet = async () => {
//       // const {
//       //   paymentIntent,
//       //   ephemeralKey,
//       //   customer,
//       //   // publishableKey,
//       // } = await fetchPaymentSheetParams();

//     //   console.warn(11111, customer, ephemeralKey, paymentIntent)
  
//       const { error } = await initPaymentSheet({
//         merchantDisplayName: "Example, Inc.",
//         customerId: 'cus_Os6WS9t4aoFBZs',
//         // customerEphemeralKeySecret: ephemeralKey,
//         paymentIntentClientSecret: 'sk_test_51MdxGXHzF6NKvTnpfRMEQr7sfWFw0OF850NXop4vmmMQ6KmL02T0yGheleSYhjWP2JG04eb3sKmyhuB84uuaWexm00WGZLk5z3',
//         // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
//         //methods that complete payment after a delay, like SEPA Debit and Sofort.
//         allowsDelayedPaymentMethods: true,
//         defaultBillingDetails: {
//           name: 'Jane Doe',
//         },
//         returnURL: 'riturnit://app',
//       });
//       if (!error) {
//         setLoading(true);
//       }
//     };

//     React.useEffect(() => {
//         initializePaymentSheet();
//     }, []);
  
//     return (
//       <View style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}>
//         {/* <Button
//           title="Checkout"
//           onPress={openPaymentSheet}
//         /> */}
//         <PlatformPayButton
//             onPress={openPaymentSheet}
//             style={{
//                 backgroundColor: 'red',
//                 width: 100,
//                 height: 50
//             }}
//         />
//       </View>
//     );
//   }
























///////

// import React from 'react'
// import {PlatformPayButton, isPlatformPaySupported, createPlatformPayPaymentMethod, PlatformPay, confirmPlatformPayPayment} from '@stripe/stripe-react-native';
// import { Alert, View } from 'react-native';

// function PaymentMethod() {
//   const [isApplePaySupported, setIsApplePaySupported] = React.useState(false);

//   React.useEffect(() => {
//     (async function () {
//       setIsApplePaySupported(await isPlatformPaySupported());
//     })();
//   }, [isPlatformPaySupported]);

//   const createPaymentMethod = async () => {
//     const { error, paymentMethod } = await createPlatformPayPaymentMethod({
//       applePay: {
//         cartItems: [
//           {
//             label: 'Example item name',
//             amount: '0',
//             paymentType: PlatformPay.PaymentType.Immediate,
//           }
//         ],
//         merchantCountryCode: 'US',
//         currencyCode: 'USD',
//       },
//     });
//     console.warn(123, error, paymentMethod)
//   }

//     const paystes = async () => {
//         const clientSecret = 'pk_test_51MdxGXHzF6NKvTnp9C5pMkvEslDVtNpjfNcmA64so2uSdx9FgYLomEjWF3JuwDJ2BpZZAgyKDoPr2qw6OFzhwaX600YRCmLfGL'
//         const { error } = await confirmPlatformPayPayment(
//           clientSecret,
//           {
//             applePay: {
//               cartItems: [
//                 // {
//                 //   label: 'Example item name',
//                 //   amount: '14.00',
//                 //   paymentType: PlatformPay.PaymentType.Immediate,
//                 // },
//                 {
//                   label: 'Total',
//                   amount: '0',
//                   paymentType: PlatformPay.PaymentType.Immediate,
//                 },
//               ],
//               merchantCountryCode: 'US',
//               currencyCode: 'USD',
//               requiredShippingAddressFields: [
//                 PlatformPay.ContactField.PostalAddress,
//               ],
//               requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
//             },
//           }
//         );
//         if (error) {
//             console.warn(233, error)
//           // handle error
//         } else {
//           Alert.alert('Success', 'Check the logs for payment intent details.');
//         //   console.log(JSON.stringify(paymentIntent, null, 2));
//         }
//       }

//   return (
//     <View style={{
//         flex: 1,
//         justifyContent: 'center'
//     }}>
//       {isApplePaySupported && (
//         <PlatformPayButton
//           onPress={createPaymentMethod}
//           type={PlatformPay.ButtonType.SetUp}
//           appearance={PlatformPay.ButtonStyle.WhiteOutline}
//           style={{
//             width: '65%',
//             height: 50,
//           }}
//         />
//       )}
//     </View>
//   );
// }

// export default PaymentMethod
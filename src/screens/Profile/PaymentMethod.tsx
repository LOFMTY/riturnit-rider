// import {View, Text, Pressable, TouchableOpacity} from 'react-native';
// import React from 'react';
// import {connect} from 'react-redux';

// import FastImage from 'react-native-fast-image';
// import {SIZES, FONTS, icons} from '../../constants';
// import { Header } from '../../components';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { useStripe } from '@stripe/stripe-react-native';

// const methods = [
//     {
//         id: 1,
//         icon: require('../../assets/icons/appleBlue.png'),
//         iconSizes: {
//             width: 19,
//             height: 24,
//         },
//         title: 'Apple Pay'
//     },
//     {
//         id: 2,
//         icon: require('../../assets/icons/card.png'),
//         iconSizes: {
//             width: 20,
//             height: 16,
//         },
//         title: 'Credit or debit card',
//         path: 'AddCard'
//     }
// ]

// const PaymentMethod = ({appTheme, onPress}: any) => {
//   const navigation = useNavigation<any>();

//   const { initPaymentSheet, presentPaymentSheet } = useStripe()

//   const handleApplePay = async () => {
//     try {
//       const result = await initPaymentSheet({
//         paymentIntentClientSecret: 'sk_test_51O4bRGKaKCvvG099JRu7giDSBds9pFQhEe8mMfGHtDkELZ1yZvtqxbJvUbGtYRyr9bp5GtyO1FMg24bj9KLzT9zJ00otg9hdrR',
//       });

//       if (result.error) {
//         // Ошибка при инициализации Payment Sheet
//         console.error('Ошибка при инициализации Payment Sheet:', result.error);
//         return;
//       }

//       // Payment Sheet инициализирован успешно, вызываем его
//       const { complete } = await presentPaymentSheet();

//       if (complete) {
//         // Платеж завершен успешно
//         console.log('Платеж успешно завершен.');
//       } else {
//         // Платеж не завершен
//         console.log('Платеж не завершен.');
//       }
//     } catch (error) {
//       // Обработка ошибок
//       console.error('Ошибка при использовании Apple Pay:', error);
//     }
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//           backgroundColor: appTheme.backgroundColor,
//       }}>
//         <Header
//           title="Add payment method "
//           onPress={() => navigation.goBack()}
//           titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
//         />
//         <View style={{
//             backgroundColor: appTheme.tabBackgroundColor,
//             margin: 30,
//             paddingVertical: 19,
//             borderRadius: 10,
//         }}>
//             {methods.map((e, i) => (
//                 <TouchableOpacity
//                     onPress={() => i === 0 ? handleApplePay() : (e.path && navigation.navigate(e.path))}
//                     activeOpacity={0.8}
//                     key={e.id} style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     borderBottomColor: '#F2F3F5',
//                     borderBottomWidth: i === methods.length - 1 ? 0 : 1,
//                     paddingHorizontal: 22,
//                     paddingTop: i === 0 ? 0 : 19,
//                     paddingBottom: i === 0 ? 19 : 0
//                 }}>
//                     <View style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                     }}>
//                         <FastImage source={e.icon} style={{width: e.iconSizes.width, height: e.iconSizes.height}} />
//                         <Text style={{ fontSize: 14, fontWeight: '600', marginLeft: 12, color: appTheme.textColor }}>{e.title}</Text>
//                     </View>
//                     <FastImage
//                         source={icons.right}
//                         resizeMode={FastImage.resizeMode.contain}
//                         style={{
//                             width: 15,
//                             height: 15,
//                         }}
//                     />
//                 </TouchableOpacity>
//             ))}
//         </View>
//     </View>
//   );
// };

// function mapStateToProps(state: {themeReducer: {appTheme: any}; error: any}) {
//   return {
//     appTheme: state.themeReducer.appTheme,
//     error: state.error,
//   };
// }

// export default connect(mapStateToProps)(PaymentMethod);

import { useStripe, usePlatformPay, PlatformPayButton, PlatformPay } from '@stripe/stripe-react-native';
import React from 'react'
import { Alert, Button, View } from "react-native";

const API_URL = 'https://wrm646oi52lgkg4sncf3a5vte40daxhl.lambda-url.us-east-1.on.aws/'

export default function PaymentMethod() {
    const { initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment, createPaymentMethod } = useStripe();
    const { isPlatformPaySupported, confirmPlatformPayPayment, openPlatformPaySetup } = usePlatformPay()
    const [loading, setLoading] = React.useState(false);
  
    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`${API_URL}/products`, {
        method: 'GET',
        headers: {
        //   'Content-Type': 'application/json',
          'x-api-key': '4L1FPSYjVH1ijKSNEZ9S31RraORx5tdH9a60tE5z'
        }
      });
      const { paymentIntent, ephemeralKey, customer} = await response.json();

      console.warn(999, response)
  
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    };

    const openPaymentSheet = async () => {
        console.warn(await isPlatformPaySupported())
        const { error } = await presentPaymentSheet();
    
        if (error) {
          console.warn(`Error code: ${error.code}`, error.message);
        } else {
          Alert.alert('Success', 'Your order is confirmed!');
        }

    //     const { error } = await confirmPlatformPayPayment('pk_test_51MdxGXHzF6NKvTnp9C5pMkvEslDVtNpjfNcmA64so2uSdx9FgYLomEjWF3JuwDJ2BpZZAgyKDoPr2qw6OFzhwaX600YRCmLfGL', {
    //         applePay: {
    //             cartItems: [
    //                 {
    //                     label: 'test',
    //                     amount: '14.00',
    //                     paymentType: PlatformPay.PaymentType.Immediate
    //                 }
    //             ],
    //             merchantCountryCode: 'US',
    //             currencyCode: 'USD'
    //         },
    //     })

    //     console.warn(999191, error)
      };
  
    const initializePaymentSheet = async () => {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        // publishableKey,
      } = await fetchPaymentSheetParams();

      console.warn(11111, customer, ephemeralKey, paymentIntent)
  
      const { error } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
        customerId: 'cus_Os6WS9t4aoFBZs',
        // customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: 'sk_test_51MdxGXHzF6NKvTnpfRMEQr7sfWFw0OF850NXop4vmmMQ6KmL02T0yGheleSYhjWP2JG04eb3sKmyhuB84uuaWexm00WGZLk5z3',
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        },
        returnURL: 'riturnit://app'
      });
      if (!error) {
        setLoading(true);
      }
    };

    React.useEffect(() => {
        initializePaymentSheet();
    }, []);
  
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* <Button
          title="Checkout"
          onPress={openPaymentSheet}
        /> */}
        <PlatformPayButton
            onPress={openPaymentSheet}
            style={{
                backgroundColor: 'red',
                width: 100,
                height: 50
            }}
        />
      </View>
    );
  }
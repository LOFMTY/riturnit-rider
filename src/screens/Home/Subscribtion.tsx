import { SCREEN_WIDTH } from "@gorhom/bottom-sheet"
import { useEffect, useState } from "react"
import { Modal, Text, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import { icons } from "../../constants"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { PlatformPay, confirmPlatformPayPayment, usePaymentSheet } from "@stripe/stripe-react-native"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"

const plans = [
    {
        id: 1,
        title: 'Monthly',
        price: '4.99',
        cent: '499',
        intervalCount: 1
    },
    {
        id: 2,
        title: 'Annually',
        price: '39.99',
        cent: '3999',
        intervalCount: 12
    },
]

export const Subscribtion = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleShowPlans = async () => {
        const plansRead = await AsyncStorage.getItem('plansRead')

        if (!plansRead) {
            setIsOpen(true)
        }
    }

    useEffect(() => {
        handleShowPlans()
    }, [])

    const handleClcose = async () => {
        await AsyncStorage.setItem('plansRead', 'true')
        setIsOpen(!isOpen)
    }

    // 1. First this function is executed.
const selectPlan = async (plan: any) => {
    const res = await fetch(`https://wrm646oi52lgkg4sncf3a5vte40daxhl.lambda-url.us-east-1.on.aws/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '4L1FPSYjVH1ijKSNEZ9S31RraORx5tdH9a60tE5z'
        },
        body: JSON.stringify({
          "payment_method": "pm_card_visa",
          "amount": '50',
          "currency": "usd",
          "paymentMetodType": "card",
          "customerId": "cus_OtLuEKykGbs1LD" // задать во всём приложении, также брать юзера его из user-by-email/:email
        })
      });

      const dat = await res.json()

      const clientSecret = dat.data.clientSecret

      const { error, paymentIntent } = await confirmPlatformPayPayment(
        clientSecret,
        {
          applePay: {
            cartItems: [
                {
                    label: plan.title,
                    amount: plan.price,
                    paymentType: PlatformPay.PaymentType.Immediate,
                  }
            ],
            merchantCountryCode: 'US',
            currencyCode: 'USD',
            // Make sure to include the rest of the necessary fields
            request: {
              type: PlatformPay.PaymentRequestType.Recurring,
              description: 'Subscription plan',
              managementUrl: 'https://riturnit.com/',
              billing: {
                paymentType: PlatformPay.PaymentType.Recurring,
                intervalUnit: PlatformPay.IntervalUnit.Month,
                intervalCount: plan.intervalCount,
                label: plan.title,
                amount: plan.price,
              },
            },
          },
        }
      )

      if (paymentIntent?.status === 'Succeeded') {
        await AsyncStorage.setItem('plansRead', 'true')
        setIsOpen(false)
      }
      
      if (error) {
        Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: error.message,
            autoClose: 1000,
          });
      }
  }

    return (
        <View>
            <Text onPress={() => setIsOpen(true)}>BUTTON</Text>
        <Modal animationType='slide' transparent={true} visible={isOpen}>
            <View style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={{
                    backgroundColor: '#6098F6',
                    width: SCREEN_WIDTH - 60,
                    borderRadius: 20,
                    padding: 27
                }}>
                    <View style={{
                        alignItems: 'flex-end'
                    }}>
                        <TouchableOpacity onPress={handleClcose} style={{
                            backgroundColor: 'white',
                            width: 27,
                            height: 27,
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <FastImage source={icons.close} style={{ width: 9, height: 9 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        alignItems: 'center',
                    }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>First delivery & first month</Text>
                        <Text  style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>FREE</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 20,
                        marginTop: 43,
                    }}>
                        {plans.map(e => (
                            <TouchableOpacity
                                onPress={() => selectPlan(e)}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: 20,
                                    minWidth: 106,
                                    height: 116,
                                    alignItems: 'center',
                                    justifyContent: 'space-around'
                                }}
                                key={e.id}>
                                <Text style={{ fontSize: 26, fontWeight: '800', color: '#6098F6' }}>$ {e.price}</Text>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>{e.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
        </View>
    )
}
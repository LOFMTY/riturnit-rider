import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {v4 as uuidV4} from 'uuid';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {SIZES, FONTS, icons, constants} from '../../../constants';
import {
  Header,
  WalletInfo,
  IconButton,
  SelectPaymentType,
  AddCardPayment,
} from '../../../components';
import FastImage from 'react-native-fast-image';

const methods = [
  {
    id: '1',
    icon: icons.cash2,
    iconSizes: {
      width: 20,
      height: 16,
    },
    title: 'Cash',
  },
  {
    id: '2',
    icon: icons.card,
    iconSizes: {
        width: 20,
        height: 16,
    },
    title: 'Credit or debit card'
  },
]

const Wallet = ({appTheme}: any) => {
  const navigation = useNavigation<any>();

  const [selectedItem, setSelectedItem] = useState('');
  const [paymentMethods, setPaymentMethods] = useState<any>(
    // Array(constants.PaymentMethods)
    //   .fill()
    //   .map(_ => ({
    //     id: uuidV4(),
    //     img: require('../../../assets/icons/riturnitCash.png'),
    //     label: `Riturnit Wallet`,
    //     amount: 0.0,
    //   })),
  );

  const addCard = () => {
    // const newObj = {
    //   id: uuidV4(),
    //   img: require('../../../assets/icons/mastercard.png'),
    //   label: '----7948',
    //   amount: 0,
    //   cardNumber: '5257829585277948',
    //   cvv: '230',
    //   expiryDate: '02/25'
    // };
    // console.warn(222, [...paymentMethods, newObj])
    // setPaymentMethods([...paymentMethods, newObj]);
    // storePaymentMethod([...paymentMethods, newObj]);
    navigation.navigate('PaymentMethod')
  };

  const deleteRow = (rowKey: string) => {
    const newData = [...paymentMethods];
    const prevIndex = paymentMethods.findIndex(
      (item: {id: string}) => item.id === rowKey,
    );
    newData.splice(prevIndex, 1);
    setPaymentMethods(newData);
    storePaymentMethod(newData);
  };

  const storePaymentMethod = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('selectedPayment', jsonValue);
      // console.log('Payment method selected', jsonValue);
    } catch (error) {
      // saving error
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Error',
        textBody: 'Something went wrong',
        autoClose: 1000,
      });
    }
  };

  const getPaymentInfo = async () => {
    await AsyncStorage.getItem('selectedPayment').then((value: any) => {
      const data = JSON.parse(value);
      if (data) {
        setPaymentMethods([...data]);
      }
      // console.log('selectedPaymentMethod', data);
    });
  };

  useEffect(() => {
    let unmounted = false
    getPaymentInfo();
    return () => {
      unmounted = true;
    };
  }, [])

  const hasMethods = paymentMethods?.[0]

  console.warn(paymentMethods)

  function renderPaymentMethods() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.radius,
          marginTop: SIZES.base,
        }}>
        <Text
          style={{
            ...FONTS.h6,
            color: appTheme.textColor,
            paddingLeft: SIZES.radius,
          }}>
          Payment Method
        </Text>
        <View style={{
            backgroundColor: 'white',
            margin: 10,
            borderRadius: 10,
        }}>
            {methods.map((e, i) => {
              if (!hasMethods && i === 1) return null
                return <TouchableOpacity
                    activeOpacity={0.8}
                    key={e.id} style={{
                    borderBottomColor: '#F2F3F5',
                    borderBottomWidth: !hasMethods ? 1 : i === methods.length - 1 ? 0 : 1,
                }}>
                    <SelectPaymentType
                      label={e.title}
                      iconSizes={e.iconSizes}
                      paymentImage={e.icon}
                      isSelected={selectedItem == e.id}
                      onLongPress={() => {
                        if (i === 1) {
                          Alert.alert(
                            'Delete?',
                            'Do you wish to continue?',
                            [
                              { text: 'No', style: 'destructive' },
                              { text: 'Yes', onPress: () => deleteRow(e.id) }
                            ]
                          );
                        }
                      }}
                      onPress={() => {
                        setSelectedItem(e.id)
                      }}
                    />
                </TouchableOpacity>
            })}
            {!hasMethods && <TouchableOpacity
                onPress={addCard}
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 15
                }}
            >
                <FastImage
                  source={icons.plus}
                  style={{
                    width: 24,
                    height: 24
                  }}
                />
                <Text style={{fontWeight:'500',marginLeft: 10}}>Add payment method</Text>
            </TouchableOpacity>}
        </View>
        {/* <SwipeListView
          data={[...(paymentMethods || getPaymentInfo())]}
          disableRightSwipe={true}
          rightOpenValue={-75}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={(data) => {
            return (
              <SwipeRow
                stopRightSwipe={data.index === 0 ? 1 : 0}
                rightOpenValue={-75}
                leftOpenValue={20 + Math.random() * 150}
                disableRightSwipe={true}
                disableLeftSwipe={parseInt(data.item.id) === 0}
                style={{
                  marginHorizontal: SIZES.radius,
                  marginTop: SIZES.base,
                }}>
                <IconButton
                  containerStyle={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: SIZES.radius,
                  }}
                  icon={icons.remove}
                  iconStyle={{
                    marginRight: 12,
                    width: 30,
                    height: 30,
                  }}
                  onPress={() => deleteRow(data.item.id)}
                />
                <SelectPaymentType
                  label={data.item.label}
                  paymentImage={data.item.img}
                  isSelected={selectedItem == data?.item?.id}
                  onPress={() => {
                    setSelectedItem(data.item.id);
                    // console.log(data.item);
                  }}
                />
              </SwipeRow>
            );
          }}
        /> */}

        {/* <AddCardPayment
          onPress={() => {
            addCard();
          }}
        /> */}
      </View>
    );
  }

  return (
    <Root>
      <View
        style={{
          flex: 1,
          backgroundColor: appTheme.backgroundColor,
        }}>
        <Header
          title="Wallet"
          onPress={() => navigation.goBack()}
          titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
        />
        <WalletInfo />
        {renderPaymentMethods()}
      </View>
    </Root>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
  };
}

export default connect(mapStateToProps)(Wallet);

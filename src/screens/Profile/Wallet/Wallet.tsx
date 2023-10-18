import React, {useEffect, useMemo, useState} from 'react';
import {View, Text} from 'react-native';
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

const Wallet = ({appTheme}: any) => {
  const navigation = useNavigation<any>();

  const [selectedItem, setSelectedItem] = useState('');
  const [paymentMethods, setPaymentMethods] = useState<any>(
    Array(constants.PaymentMethods)
      .fill()
      .map(_ => ({
        id: uuidV4(),
        img: require('../../../assets/icons/riturnitCash.png'),
        label: `Riturnit Wallet`,
        amount: 0.0,
      })),
  );

  const addCard = () => {
    const newObj = {
      id: uuidV4(),
      img: require('../../../assets/icons/mastercard.png'),
      label: '----2491',
      amount: 0,
    };
    setPaymentMethods([...paymentMethods, newObj]);
    storePaymentMethod([...paymentMethods, newObj]);
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
  }, []);

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
          Payment Methods
        </Text>

        <SwipeListView
          data={[...(paymentMethods || getPaymentInfo())]}
          disableRightSwipe={true}
          rightOpenValue={-75}
          keyExtractor={index => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={data => {
            return (
              <SwipeRow
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
        />

        <AddCardPayment
          onPress={() => {
            addCard();
          }}
        />
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

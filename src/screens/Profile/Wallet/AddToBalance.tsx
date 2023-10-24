import React, {useState, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {SIZES, FONTS, COLORS, constants} from '../../../constants';
import {
  Header,
  AutoRefillAmount,
  TextButton,
  InputCustomAmountModal,
} from '../../../components';

const chooseAmount = constants.autoRefillAmount;

const AddToBalance = ({appTheme}: any) => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<any>(true);

  function renderTopSection() {
    return (
      <View
        style={{
          justifyContent: 'center',
          marginTop: SIZES.margin,
          marginHorizontal: SIZES.padding,
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              ...FONTS.h5,
              fontWeight: '500',
              color: appTheme.textColor,
            }}>
            Add to your balance
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            marginTop: SIZES.radius,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: appTheme.textColor,
            }}>
            How much do you want to add to your Riturnit Cash balance?
          </Text>
        </View>
      </View>
    );
  }

  function chooseAmountSection() {
    return (
      <View style={{justifyContent: 'center', marginTop: SIZES.padding}}>
        {/* choose amount section */}
        <View style={{marginHorizontal: SIZES.padding}}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              color: COLORS.gray,
            }}>
            Choose an amount
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.padding,
            backgroundColor: appTheme.tabBackgroundColor,
            borderRadius: SIZES.radius,
          }}>
          {chooseAmount.map((item, index) => {
            return (
              <AutoRefillAmount
                key={`AutoRefillAmount-${item.id}`}
                item={item?.amount}
                // isSelected={item.id == selectedAmount}
                isSelected={
                  `${selectedAmount?.key}-${selectedAmount?.id}` ==
                  `AutoRefillAmount-${item.id}`
                }
                onPress={() =>
                  setSelectedAmount(
                    {...item, key: 'AutoRefillAmount'},
                    // console.log('item pressed', item.label),
                  )
                }
              />
            );
          })}
        </View>

        <TextButton
          label={selectedAmount?.id == 4 ? 'Input amount' : 'Done'}
          labelStyle={{...FONTS.h5, color: COLORS.white}}
          buttonContainerStyle={{
            height: 45,
             width: 200,
            alignSelf: 'center',
            marginTop: SIZES.padding * 3,
            backgroundColor: COLORS.gradient2,
          }}
          // onPress={() => navigation.goBack()}
          onPress={() => {
            if (selectedAmount?.id == 4) {
              setModalVisible(!modalVisible);
            } else {
              Alert.alert(
                `${selectedAmount?.amount} will be added to your wallet.`,
                'Do you wish to continue?',
                [
                  { text: 'No', style: 'destructive' },
                  { text: 'Yes', onPress: () => navigation.navigate('Payment', { amount: selectedAmount?.amount }) }
                ]
              );
            }
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.backgroundColor,
      }}>
      <Header
        title="TopUp Balance"
        onPress={() => navigation.goBack()}
        titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
      />

      <InputCustomAmountModal
        visible={modalVisible}
        onRequestClose={(amount: number) => {
          setModalVisible(!modalVisible)
          navigation.navigate('Payment', { amount })
        }}
        noCancel={() => {
          setModalVisible(!modalVisible);
        }}
      />

      {renderTopSection()}

      {chooseAmountSection()}
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(AddToBalance);

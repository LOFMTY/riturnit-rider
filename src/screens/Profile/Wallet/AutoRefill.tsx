import React, {useState} from 'react';
import {View, Text, Alert, Switch} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import {SIZES, FONTS, COLORS, icons, constants} from '../../../constants';
import {Header, AutoRefillAmount, TextButton} from '../../../components';

const chooseAmount = constants.autoRefillAmount;

const AutoRefill = ({appTheme}: any) => {
  const navigation = useNavigation();

  const [selectedAmount, setSelectedAmount] = useState<any>(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const buttonAction = () => {
    Alert.alert('Success!', 'Auto refill has been activated', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  function renderTopSection() {
    return (
      <View
        style={{
          justifyContent: 'center',
          marginTop: SIZES.margin,
          marginHorizontal: SIZES.padding,
        }}>
        {/* Title */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 1, paddingTop: SIZES.base}}>
            <Text
              style={{
                ...FONTS.h5,
                fontWeight: '500',
                color: appTheme.textColor,
              }}>
              Auto refill
            </Text>
          </View>

          <View style={{justifyContent: 'center'}}>
            <Switch
              trackColor={{false: COLORS.silver, true: COLORS.caribbeanGreen}}
              thumbColor={isEnabled ? COLORS.white : COLORS.white}
              ios_backgroundColor={COLORS.gray}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>

        {/* auto refill description */}
        <View
          style={{
            justifyContent: 'center',
            marginTop: SIZES.base,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: appTheme.textColor,
              lineHeight: 22,
            }}>
            Auto refill is off. When activated, we’ll automatically refill your
            Riturnit Cash if your balance is lower than $10.
          </Text>
        </View>
      </View>
    );
  }

  function chooseAmountSection() {
    return (
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
              isSelected={
                `${selectedAmount?.key}-${selectedAmount?.id}` ==
                `AutoRefillAmount-${item.id}`
              }
              onPress={() =>
                setSelectedAmount(
                  {...item, key: 'AutoRefillAmount'},
                )
              }
            />
          );
        })}
      </View>
    );
  }

  function renderMidSection() {
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
            Payment Method
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            marginTop: SIZES.base,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              color: appTheme.textColor,
              lineHeight: 22,
            }}>
            Debit or credit card is the default payment method for Auto refill
          </Text>
        </View>
      </View>
    );
  }

  function renderLowerSection() {
    return (
      <View
        style={{
          justifyContent: 'center',
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: appTheme.tabBackgroundColor,
            padding: SIZES.radius,
            borderRadius: SIZES.radius,
          }}>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              source={icons.credit_card}
              resizeMode={FastImage.resizeMode.contain}
              style={{width: 20, height: 20}}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              marginRight: SIZES.padding * 3.5,
            }}>
            <Text
              style={{
                ...FONTS.h6,
                color: appTheme.textColor,
                paddingLeft: SIZES.radius,
              }}>
              Credit or debit card
            </Text>
          </View>

          <View style={{justifyContent: 'center'}}>
            <FastImage
              source={icons.radioButton1}
              resizeMode={FastImage.resizeMode.contain}
              style={{width: 20, height: 20}}
            />
          </View>
        </View>
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
        title="Auto Refill"
        onPress={() => navigation.goBack()}
        titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
      />
      {renderTopSection()}

      {/* choose amount section */}
      {isEnabled ? (
        <>
          <View
            style={{marginHorizontal: SIZES.padding, marginTop: SIZES.radius}}>
            <Text
              style={{
                ...FONTS.body2,
                fontWeight: '500',
                color: COLORS.gray,
              }}>
              Choose an amount
            </Text>
          </View>
          {chooseAmountSection()}
        </>
      ) : (
        <View />
      )}

      {renderMidSection()}
      {renderLowerSection()}

      <TextButton
        disabled={!isEnabled}
        label={'Save'}
        labelStyle={{...FONTS.h5, color: COLORS.white}}
        buttonContainerStyle={{
          height: 45,
           width: 200,
          alignSelf: 'center',
          marginTop: SIZES.padding * 1.5,
          backgroundColor: isEnabled ? COLORS.gradient2 : COLORS.gray,
        }}
        // onPress={() => navigation.goBack()}
        onPress={() => {
          buttonAction();
          // navigation.goBack()
        }}
      />
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(AutoRefill);

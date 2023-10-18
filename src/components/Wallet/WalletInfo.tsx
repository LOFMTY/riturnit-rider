import {View, Text} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import {SIZES, COLORS, FONTS, icons, images} from '../../constants';
import WalletTabs from './WalletTabs';
import TextButton from '../Buttons/TextButton';

const WalletInfo = ({appTheme}: any) => {
  const navigation = useNavigation<any>();

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
          <Text style={{...FONTS.h3, color: appTheme.textColor}}>$500.00</Text>
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

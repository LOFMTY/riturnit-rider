import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';

import {COLORS, SIZES, FONTS} from '../../../constants';
import {Header} from '../../../components';
import {WalletStackNavigatorParamList} from '../../../type/navigation';

const Success = ({appTheme}: any) => {
  const navigation = useNavigation<WalletStackNavigatorParamList>();

  function renderContent() {
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: SIZES.padding,
        }}>
        {/* Success Text */}
        <View
          style={{
            marginHorizontal: SIZES.padding,
            alignItems: 'center',
          }}>
          <LottieView
            style={{width: 400, alignSelf: 'center', marginBottom: 5}}
            autoPlay
            speed={1.5}
            loop={true}
            source={require('../../../assets/json/success.json')}
          />
        </View>

        <Text
          style={{
            ...FONTS.body1,
            color: appTheme.textColor,
            textAlign: 'center',
            fontWeight: '500',
            paddingHorizontal: SIZES.radius,
          }}>
          You have successfully added {''}
          <>
            <Text
              style={{
                ...FONTS.body1,
                color: COLORS.gradient2,
                fontWeight: '500',
              }}>
              $10,000{' '}
            </Text>
          </>
          to your wallet
        </Text>
      </View>
    );
  }

  function renderFooterButton() {
    return (
      <View
        style={{
          paddingBottom: SIZES.padding * 1.5,
          paddingHorizontal: SIZES.radius,
        }}>
        <TouchableOpacity
          style={{
            padding: 10,
            marginHorizontal: SIZES.padding * 1.5,
            justifyContent: 'center',
            height: 60,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.gradient2,
          }}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            })
          }>
          <Text
            style={{
              ...FONTS.h4,
              textAlign: 'center',
              color: COLORS.white,
              fontWeight: '500',
            }}>
            Continue
          </Text>
        </TouchableOpacity>
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
        nav={true}
        type={true}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          })
        }
        titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
      />
      {renderContent()}
      {renderFooterButton()}
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(Success);

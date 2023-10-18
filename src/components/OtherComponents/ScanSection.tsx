import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

import {FONTS, SIZES, COLORS} from '../../constants';
import TextButton from '../Buttons/TextButton';

const ScanSection = ({appTheme, onPress}: any) => {
  const navigation = useNavigation<any>();

  return (
    <View style={{flex: 1, marginTop: SIZES.padding}}>
      {/* Upload Image */}
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          alignItems: 'center',
        }}>
        <LottieView
          style={{height: 250, alignSelf: 'center', marginBottom: 5}}
          autoPlay
          speed={1.5}
          loop={true}
          source={require('../../assets/json/scan.json')}
        />
      </View>

      {/* Upload Text & Description */}
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
          marginTop: SIZES.padding,
        }}>
        <Text
          style={{
            ...FONTS.h3,
            color: appTheme.textColor,
            textAlign: 'center',
          }}>
          Scan item to upload to store
        </Text>
        <Text
          style={{
            paddingTop: SIZES.margin,
            textAlign: 'center',
            color: appTheme.textColor,
            ...FONTS.body2,
          }}>
          You currently don't have any product to return yet.
        </Text>

        <TextButton
          label={'Scan items'}
          labelStyle={{color: COLORS.white, ...FONTS.h5}}
          buttonContainerStyle={{
            height: 45,
            width: 220,
            marginTop: SIZES.padding * 2,
            alignSelf: 'center',
            backgroundColor: COLORS.gradient2,
          }}
          onPress={() => navigation.navigate('Scan')}
        />
      </View>
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(ScanSection);

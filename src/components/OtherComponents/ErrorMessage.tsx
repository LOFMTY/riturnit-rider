import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {SIZES, icons, FONTS} from '../../constants';
import FastImage from 'react-native-fast-image';

interface ErrorMessageProps {
  appTheme: any;
  title?: string;
  message?: string;
}

const ErrorMessage = ({
  appTheme,
  title = 'Error',
  message = 'Unknown Error',
}: ErrorMessageProps) => {
  const navigation = useNavigation<any>();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.backgroundColor,
      }}>
      {/* Header */}
      <View
        style={{
          paddingTop: 45,
          backgroundColor: appTheme.tabBackgroundColor,
          height: '12%',
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}>
        <View
          style={{
            marginHorizontal: SIZES.padding,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: SIZES.radius,
          }}>
          {/* Home Button */}
          <TouchableOpacity
            style={{
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <FastImage
              source={icons.back}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 25,
                height: 25,
              }}
            />
          </TouchableOpacity>

          {/* Header Title */}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginRight: SIZES.padding,
            }}>
            <Text
              style={{
                ...FONTS.h4,
                textAlign: 'center',
                color: appTheme.textColor,
              }}>
              {title}
            </Text>
          </View>
        </View>
      </View>

      <View style={{justifyContent: 'center'}}>
        <LottieView
          style={{height: 300, width: 300, alignSelf: 'center'}}
          autoPlay
          speed={0.5}
          loop={true}
          source={require('../../assets/json/errorBot.json')}
        />
        <View style={{margin: SIZES.padding * 2}}>
          <Text
            style={{
              ...FONTS.h3,
              textAlign: 'center',
              color: appTheme.textColor,
              lineHeight: 22,
            }}>
            {title}
          </Text>
          <Text
            style={{
              ...FONTS.body2,
              paddingTop: SIZES.margin,
              textAlign: 'center',
              color: appTheme.textColor,
            }}>
            {message}
          </Text>
        </View>
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

export default connect(mapStateToProps)(ErrorMessage);

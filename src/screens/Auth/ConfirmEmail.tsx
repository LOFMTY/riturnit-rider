import React, {useState, useEffect, memo} from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Text,
  Alert,
  Platform,
} from 'react-native';
import {useForm} from 'react-hook-form';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import {Auth} from 'aws-amplify';

import {SIZES, COLORS, icons, FONTS, images} from '../../constants';
import {TextButton, FormInput} from '../../components';
import {
  ConfirmEmailNavigationProp,
  ConfirmEmailRouteProp,
} from '../../type/navigation';

type ConfirmEmailData = {
  email: string;
  code: string;
};

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const ConfirmEmail = () => {
  const route = useRoute<ConfirmEmailRouteProp>();
  const {control, handleSubmit, watch, reset} = useForm<ConfirmEmailData>({
    defaultValues: {email: route.params.email},
  });

  const navigation = useNavigation<ConfirmEmailNavigationProp>();

  const email = watch('email');

  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({email, code}: ConfirmEmailData) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await Auth.confirmSignUp(email, code);
      navigation.navigate('SignIn');
    } catch (error) {
      Alert.alert((error as Error).message);
    } finally {
      setLoading(false);
      reset();
    }
  };

  const onResendCode = async () => {
    try {
      await Auth.resendSignUp(email);
      Alert.alert('Check your email', 'Code resent successfully.');
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          return prevTimer;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function renderHeaderTextSection() {
    return (
      <View
        style={{
          marginHorizontal: 20,
          justifyContent: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: SIZES.radius,
          }}>
          <FastImage
            source={icons.logo}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: SIZES.height > 700 ? 150 : 100,
              height: SIZES.height > 700 ? 150 : 100,
            }}
          />
          <FastImage
            source={images.riturnit}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: SIZES.height > 700 ? 150 : 100,
              height: SIZES.height > 700 ? 50 : 40,
            }}
          />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              // marginTop: SIZES.radius,
            }}>
            <Text
              style={{
                ...FONTS.h3,
                fontWeight: '500',
                letterSpacing: -1,
                textAlign: 'center',
              }}>
              OTP Authentication
            </Text>

            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.gray,
                marginTop: 30,
                textAlign: 'center',
              }}>
              Please enter the 6-digit code sent your email{' '}
              {
                <Text
                  numberOfLines={1}
                  style={{
                    ...FONTS.h6,
                    color: COLORS.black,
                    lineHeight: 24,
                  }}>
                  {route?.params?.email}
                </Text>
              }
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderPINCodeSection() {
    return (
      <View
        style={{
          marginTop: SIZES.margin,
          marginHorizontal: SIZES.padding * 1.5,
        }}>
        {/* username / email */}
        <FormInput
          autoCompleteType="email"
          keyboardType="email-address"
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
          inputContainerStyle={{marginTop: 0}}
          placeholder={'Email address'}
          prependComponent={
            <View
              style={{
                width: 35,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <FastImage
                source={icons.email}
                style={{
                  height: 20,
                  width: 20,
                }}
                tintColor={COLORS.gradient2}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          }
        />

        {/* Code */}
        <FormInput
          autoCompleteType="number"
          keyboardType={'numeric'}
          name="code"
          control={control}
          rules={{
            required: 'Confirmation code is required',
          }}
          inputContainerStyle={{marginTop: 0}}
          placeholder="Enter your confirmation code"
          prependComponent={
            <View
              style={{
                width: 35,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <FastImage
                source={icons.padlock}
                style={{
                  height: 20,
                  width: 20,
                }}
                tintColor={COLORS.gradient2}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          }
        />

        {/* Countdown Timer */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: SIZES.padding,
          }}>
          <Text
            style={{
              paddingHorizontal: SIZES.radius,
              ...FONTS.body3,
              color: COLORS.gray1,
              fontWeight: '500',
            }}>
            Didn't receive code?
          </Text>

          <TouchableOpacity
            disabled={timer == 0 ? false : true}
            style={{backgroundColor: 'undefined', paddingTop: SIZES.base}}
            onPress={() => {
              setTimer(10);
              onResendCode();
            }}>
            <Text
              style={{
                color: COLORS.scarlet,
                ...FONTS.body3,
                fontWeight: '500',
              }}>
              Resend in ({timer}s)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ImageBackground
      source={images.background}
      style={{
        height: '100%',
        width: '100%',
      }}
      resizeMode="cover">
      <Spinner
        visible={loading}
        animation={'fade'}
        overlayColor={'rgba(0,0,0,0.5)'}
      />
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        extraHeight={10}
        extraScrollHeight={100}
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical:
            Platform.OS === 'ios'
              ? SIZES.height > 700
                ? SIZES.padding
                : SIZES.margin
              : -15,
        }}>
        <SafeAreaView style={{flex: 1}}>
          {/* Header Back Button */}
          <TouchableOpacity
            style={{
              marginTop: SIZES.margin,
              paddingLeft: SIZES.margin,
            }}
            onPress={() => navigation.goBack()}>
            <FastImage
              source={icons.back}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 25,
                height: 25,
              }}
              tintColor={COLORS.gradient2}
            />
          </TouchableOpacity>

          {renderHeaderTextSection()}
          {renderPINCodeSection()}

          <TextButton
            label={loading ? 'Loading...' : 'Confirm'}
            labelStyle={{color: COLORS.white, ...FONTS.h5}}
            buttonContainerStyle={{
              height: 50,
              marginTop:
                SIZES.height > 700 ? SIZES.padding * 2 : SIZES.padding * 1.4,
              width: 300,
              backgroundColor: COLORS.gradient2,
            }}
            onPress={handleSubmit(onSubmit)}
          />
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default memo(ConfirmEmail);

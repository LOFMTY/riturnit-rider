import React, {useState, memo} from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
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
import {AuthStackNavigatorParamList} from '../../type/navigation';

type ForgotPasswordData = {
  email: string;
};

const ForgotPassword = () => {
  const {control, handleSubmit, reset} = useForm<ForgotPasswordData>();

  const navigation = useNavigation<AuthStackNavigatorParamList>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async ({email}: ForgotPasswordData) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await Auth.forgotPassword(email);
      Alert.alert(
        'Check your email',
        `The code has been sent to ${response.CodeDeliveryDetails.Destination}`,
      );
      navigation.navigate('NewPassword');
    } catch (error) {
      Alert.alert((error as Error).message);
    } finally {
      setLoading(false);
      reset();
    }
  };

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
              marginTop: SIZES.margin,
            }}>
            <Text
              style={{
                ...FONTS.h4,
                letterSpacing: -1,
                textAlign: 'center',
              }}>
              Reset Password
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderFormCodeSection() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding * 1.5,
        }}>
        {/* Forgot Password */}
        <FormInput
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
          }}
          placeholder={'Email address'}
          prependComponent={
            <View
              style={{
                width: 35,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Image
                source={icons.email}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.gradient2,
                }}
              />
            </View>
          }
        />
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
        enableOnAndroid={true}
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
              marginTop: SIZES.radius,
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
            />
          </TouchableOpacity>

          {renderHeaderTextSection()}
          {renderFormCodeSection()}

          <TextButton
            label={loading ? 'Loading...' : 'Reset Password'}
            labelStyle={{color: COLORS.white, ...FONTS.h5}}
            buttonContainerStyle={{
              height: 45,
              marginTop: SIZES.padding,
              width: 250,
              alignSelf: 'center',
              backgroundColor: COLORS.gradient1,
            }}
            onPress={handleSubmit(onSubmit)}
          />
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default memo(ForgotPassword);

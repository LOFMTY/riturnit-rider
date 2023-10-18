import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {Auth} from 'aws-amplify';

import {FONTS, SIZES, COLORS, images, icons} from '../../constants';
import {FormInput, TextButton} from '../../components';
import {AuthStackNavigatorParamList} from '../../type/navigation';

type NewPasswordType = {
  email: string;
  code: string;
  password: string;
};

const NewPassword = () => {
  const navigation = useNavigation<AuthStackNavigatorParamList>();

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const {control, handleSubmit, reset} = useForm<NewPasswordType>();

  const onSubmit = async ({email, code, password}: NewPasswordType) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      navigation.navigate('SignIn');
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
          marginTop: 30,
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
              Reset Password
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderFormSection() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding * 1.5,
          marginTop: SIZES.radius,
        }}>
        {/* UserName / Email */}
        <FormInput
          name="email"
          control={control}
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

        {/* Code */}

        <FormInput
          autoCompleteType="number"
          keyboardType={'numeric'}
          name="code"
          control={control}
          rules={{required: 'Code is required'}}
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
              />
            </View>
          }
        />

        {/* Password */}
        <FormInput
          secureTextEntry={!showPass}
          autoCompleteType="password"
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
          placeholder={'Create password'}
          inputContainerStyle={{marginTop: 0}}
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
              />
            </View>
          }
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setShowPass(!showPass)}>
              <Image
                source={showPass ? icons.eye : icons.eye_close}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: COLORS.lightGray,
                }}
              />
            </TouchableOpacity>
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
      }}>
      <KeyboardAwareScrollView keyboardDismissMode="on-drag" extraHeight={100}>
        <Spinner
          visible={loading}
          animation={'fade'}
          overlayColor={'rgba(0,0,0,0.5)'}
        />
        <SafeAreaView style={{flex: 1}}>
          {/* Header Back Button */}
          <TouchableOpacity
            style={{
              marginTop: SIZES.height > 700 ? SIZES.radius : 15,
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
          {renderFormSection()}

          <TextButton
            label={loading ? 'Loading...' : 'Submit'}
            labelStyle={{color: COLORS.white, ...FONTS.h5}}
            buttonContainerStyle={{
              height: 50,
              marginTop:
                SIZES.height > 700 ? SIZES.padding * 1.5 : SIZES.padding,
              width: 280,
              alignSelf: 'center',
              backgroundColor: COLORS.gradient1,
            }}
            onPress={handleSubmit(onSubmit)}
          />

          {/* Back to Sign in */}
          <TouchableOpacity
            style={{
              marginTop: SIZES.padding,
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('SignIn')}>
            <Text
              style={{
                ...FONTS.body2,
                fontWeight: '500',
                color: COLORS.gradient1,
              }}>
              Back to Sign in{' '}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default NewPassword;

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useForm} from 'react-hook-form';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';

import {TextButton, FormInput, SocialButtons} from '../../components';
import {SIZES, COLORS, FONTS, icons, images} from '../../constants';
import {AuthStackNavigatorParamList} from '../../type/navigation';

type SignInData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigation = useNavigation<AuthStackNavigatorParamList>();

  const {control, handleSubmit, reset} = useForm<SignInData>();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // sas@jk.com
  // devLIFE**!@#12

  const onSubmit = async ({email, password}: SignInData) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const res = await Auth.signIn(email, password);
    } catch (error) {
      if ((error as Error).name === 'UserNotConfirmedException') {
        navigation.navigate('ConfirmEmail', {email});
      } else {
        Alert.alert('Oops', (error as Error).message);
      }
      console.log(877, error)
    } finally {
      setLoading(false);
      reset();
    }
  };

  const onSignInGoogle = async () => {
    try {
      await Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google,
      });
    } catch (e) {
      Alert.alert('Oops', (e as Error).message);
    }
  };

  const onSignInFacebook = async () => {
    try {
      await Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Facebook,
      });
    } catch (e) {
      Alert.alert('Oops', (e as Error).message);
    }
  };

  function renderContent() {
    return (
      <View style={{marginTop: SIZES.margin, alignItems: 'center'}}>
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
          style={{
            width: SIZES.height > 700 ? 150 : 120,
            height: SIZES.height > 700 ? 50 : 30,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text
          style={{
            ...FONTS.body3,
            textAlign: 'center',
            color: COLORS.gray,
            fontWeight: 'bold',
            paddingHorizontal: 30,
            marginTop: SIZES.base,
          }}>
          A new Convenient Way to {'\n'}return items from anywhere.
        </Text>
      </View>
    );
  }

  function renderFormSection() {
    return (
      <View
        style={{
          marginTop: SIZES.height > 700 ? SIZES.radius : SIZES.base,
          marginHorizontal: SIZES.padding * 1.5,
        }}>
        {/* Email */}
        <FormInput
          keyboardType="email-address"
          name="email"
          control={control}
          rules={{required: 'Email is required'}}
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
                tintColor={COLORS.gradient2}
                resizeMode={FastImage.resizeMode.contain}
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
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
          secureTextEntry={!showPass}
          autoCompleteType="password"
          placeholder={'Password'}
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
                tintColor={COLORS.gradient2}
                resizeMode={FastImage.resizeMode.contain}
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
              <FastImage
                source={showPass ? icons.eye : icons.eye_close}
                tintColor={COLORS.lightGray}
                style={{
                  height: 15,
                  width: 15,
                }}
              />
            </TouchableOpacity>
          }
        />
      </View>
    );
  }

  function renderButtons() {
    return (
      <View
        style={{
          marginTop: SIZES.height > 700 ? SIZES.padding : SIZES.margin,
          marginHorizontal: SIZES.radius,
          alignItems: 'center',
        }}>
        <TextButton
          label={loading ? 'Loading...' : 'Sign In'}
          labelStyle={{color: COLORS.white, ...FONTS.h5}}
          buttonContainerStyle={{
            height: 45,
            width: 300,
            backgroundColor: COLORS.gradient2,
          }}
          onPress={handleSubmit(onSubmit)}
        />

        {/* Forgot password */}
        <TextButton
          label={'Forgot password?'}
          labelStyle={{color: COLORS.gradient2, ...FONTS.h6}}
          buttonContainerStyle={{
            height: 40,
            width: 300,
            alignSelf: 'center',
            marginTop: SIZES.base,
            backgroundColor: null,
          }}
          onPress={() => navigation.navigate('ForgotPassword')}
        />

        <SocialButtons
          socialIcon={icons.google}
          title="Continue with Google"
          textColor={COLORS.black}
          borderWidth={0.5}
          borderColor={COLORS.gray}
          onPress={onSignInGoogle}
          containerStyle={{marginTop: SIZES.padding * 1.5}}
        />
        <SocialButtons
          socialIcon={icons.apple}
          title="Continue with Apple"
          textColor={COLORS.white}
          bgColor={COLORS.black}
          // onPress={onPress}
        />

        {/* Create Account */}
        <View
          style={{
            marginTop: SIZES.padding,
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '600',
              color: COLORS.gray,
            }}>
            Don't have an account?{' '}
            <TouchableOpacity
              style={{paddingTop: 3}}
              onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={{
                  ...FONTS.body3,
                  fontWeight: '600',
                  color: COLORS.gradient2,
                }}>
                {' '}
                Create One
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ImageBackground
        source={images.background}
        style={{
          height: '100%',
          width: '100%',
        }}
        resizeMode="cover">
        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          extraHeight={150}
          extraScrollHeight={150}
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
            <Spinner
              visible={loading}
              animation={'fade'}
              overlayColor={'rgba(0,0,0,0.5)'}
            />
            {renderContent()}
            {renderFormSection()}
            {renderButtons()}
          </SafeAreaView>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};

export default SignIn;

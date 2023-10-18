import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity, Platform, Linking} from 'react-native';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import email from 'react-native-email';
import {useNavigation} from '@react-navigation/native';

import {COLORS, SIZES, FONTS, icons} from '../../constants';
import {Header, ContactUsHorizontalTabs} from '../../components';
import {ProfileStackNavigatorParamList} from '../../type/navigation';

const AboutUs = ({appTheme}: any) => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();

  const dialCall = () => {
    const phoneNumber = `tel:+1(650)-300-4335`;
    Linking.openURL(phoneNumber);
  };

  const handleEmail = () => {
    const to = ['support@riturnint.com']; // string or array of email addresses
    email(to, {
      subject: '',
      body: '',
      checkCanOpen: false, // Call Linking.canOpenURL prior to Linking.openURL
    }).catch(console.error);
  };

  function renderAnimatedContent() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LottieView
          style={{height: 200, alignSelf: 'center'}}
          autoPlay
          speed={1.5}
          loop={true}
          source={require('../../assets/json/contact.json')}
        />
      </View>
    );
  }

  function renderContactUsList() {
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: SIZES.padding,
        }}>
        {/* header text */}
        <View style={{paddingTop: SIZES.base}}>
          <Text
            style={{
              ...FONTS.h5,
              color: appTheme.textColor,
            }}>
            We are available to support you all the way. Reach out to us.
          </Text>
        </View>

        {/* Contact Us Header */}
        <View
          style={{
            paddingTop: SIZES.padding,
          }}>
          <Text
            style={{
              ...FONTS.h5,
              fontWeight: '500',
              color: appTheme.textColor,
            }}>
            Office
          </Text>

          {/* Office Address */}
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.gray,
              fontWeight: '500',
              paddingTop: 5,
            }}>
            20, Dean Washington Street,
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.gray,
              fontWeight: '500',
            }}>
            New Hampton, Florida
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.gray,
              fontWeight: '500',
            }}>
            United state of America.
          </Text>
        </View>

        {/* Office Contact */}
        <View
          style={{
            flexDirection: 'row',
            paddingTop: SIZES.margin,
            justifyContent: 'space-between',
          }}>
          <FastImage
            source={icons.call}
            resizeMode={FastImage.resizeMode.contain}
            style={{height: 18, width: 18, top: 2}}
          />

          <TouchableOpacity
            onPress={dialCall}
            style={{flex: 1, paddingLeft: 10}}>
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: '500',
                color: COLORS.gradient1,
              }}>
              +1 650 300 4335
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingTop: SIZES.radius,
            justifyContent: 'space-between',
          }}>
          <FastImage
            source={icons.mail}
            resizeMode={FastImage.resizeMode.contain}
            style={{height: 20, width: 20}}
          />

          <TouchableOpacity
            style={{flex: 1, paddingLeft: 10}}
            onPress={handleEmail}>
            <Text
              style={{
                ...FONTS.body3,
                fontWeight: '500',
                color: COLORS.gradient2,
                fontStyle: 'italic',
                top: -2,
              }}>
              support@riturnit.com
            </Text>
          </TouchableOpacity>
        </View>

        {/* Connect on Social */}
        <View style={{paddingTop: SIZES.padding, paddingLeft: 6}}>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: '500',
              color: appTheme.textColor,
            }}>
            Connect with us on our social platforms.
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingTop: SIZES.radius,
            justifyContent: 'space-between',
          }}>
          <ContactUsHorizontalTabs
            imageIcon={icons.facebook}
            title="Facebook"
            onPress={() =>
              Linking.openURL(`https://www.facebook.com/riturnit/`)
            }
          />
          <ContactUsHorizontalTabs
            imageIcon={icons.twitter}
            title="Twitter"
            onPress={() => Linking.openURL(`https://www.twitter.com/riturnit/`)}
          />
          <ContactUsHorizontalTabs
            imageIcon={icons.instagram}
            title="Instagram"
            onPress={() =>
              Linking.openURL(`https://www.instagram.com/riturnit/`)
            }
          />
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: appTheme.backgroundColor,
        },
      ]}>
      <Header
        title="Contact Us"
        onPress={() => navigation.goBack()}
        titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
      />
      {renderAnimatedContent()}
      {renderContactUsList()}
    </View>
  );
};

function mapStateToProps(state: {themeReducer: {appTheme: any}; error: any}) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(AboutUs);

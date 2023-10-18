import React from 'react';
import {View, Text} from 'react-native';
import LottieView from 'lottie-react-native';

import {SIZES, FONTS, icons} from '../../constants';
import {Header, AboutUsList} from '../../components';
import {connect} from 'react-redux';

const AboutUs = ({navigation, appTheme}: any) => {
  {
    /* Lottie Image */
  }
  function renderAnimatedContent() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          alignItems: 'center',
        }}>
        <LottieView
          style={{
            width: SIZES.height > 700 ? 350 : 280,
            alignSelf: 'center',
            marginBottom: 5,
          }}
          autoPlay
          speed={1.5}
          loop={true}
          source={require('../../assets/json/aboutUs.json')}
        />
      </View>
    );
  }

  function renderAboutUsList() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.padding,
        }}>
        {/* All Topics */}
        <View style={{justifyContent: 'center', paddingHorizontal: 8}}>
          <Text
            style={{
              ...FONTS.h5,
              color: appTheme.textColor,
            }}>
            Riturnit makes it easy for you to return any faulty goods or product
            to the original store of purchase.
          </Text>
        </View>

        {/* About Us List Buttons */}
        <View
          style={{
            paddingTop: SIZES.padding,
          }}>
          {/* Rate the app  */}
          <AboutUsList
            imageIcon={icons.rating}
            title={'Rate the app'}
            // onPress={() => ()}
          />
          {/* Like Us */}
          <AboutUsList
            imageIcon={icons.likes}
            title={'Like us on Facebook'}
            // onPress={() => ()}
          />

          {/* privacy policy */}
          <AboutUsList
            imageIcon={icons.privacyPolicy}
            title={'Privacy and Terms'}
            onPress={() => navigation.navigate('PrivacyPolicy')}
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
        title="About Riturnit"
        onPress={() => navigation.goBack()}
        titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
      />
      {renderAnimatedContent()}
      {renderAboutUsList()}
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

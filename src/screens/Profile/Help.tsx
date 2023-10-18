import React from 'react';
import {View, Text} from 'react-native';
import LottieView from 'lottie-react-native';

import {SIZES, FONTS} from '../../constants';
import {Header, HelpList} from '../../components';
import {connect} from 'react-redux';

const Wallet = ({navigation, appTheme}: any) => {
  {
    /* Lottie Image */
  }
  function renderAnimatedContent() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: SIZES.radius,
        }}>
        <LottieView
          style={{
            width: SIZES.height > 700 ? 450 : 280,
            alignSelf: 'center',
            marginBottom: 5,
          }}
          autoPlay
          speed={1.5}
          loop={true}
          source={require('../../assets/json/help.json')}
        />
      </View>
    );
  }

  function renderHelpList() {
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: SIZES.padding,
          paddingTop: SIZES.radius,
        }}>
        {/* All Topics */}
        <Text
          style={{
            ...FONTS.h4,
            fontWeight: '500',
            color: appTheme.textColor,
            letterSpacing: 1,
          }}>
          All Topics
        </Text>

        {/* Help list */}
        <View
          style={{
            paddingTop: SIZES.radius,
          }}>
          {/* Driver Status */}
          <HelpList
            title={'Driver Status'}
            // onPress={() => ()}
          />
          {/* Account & Payment Options */}
          <HelpList
            title={'Account and Payment options'}
            // onPress={() => ()}
          />

          {/* Trip Issues */}
          <HelpList
            title={'Trip issues'}
            // onPress={() => ()}
          />

          {/* How to get Points */}
          <HelpList
            title={'How do I get points'}
            // onPress={() => ()}
          />

          {/* Guides */}
          <HelpList
            title={'A guide to Riturnit'}
            // onPress={() => ()}
          />

          {/* More */}
          <HelpList
            title={'More'}
            // onPress={() => ()}
          />
        </View>
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
        title="Help"
        onPress={() => navigation.goBack()}
        titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
      />
      {renderAnimatedContent()}
      {renderHelpList()}
    </View>
  );
};

function mapStateToProps(state: {themeReducer: {appTheme: any}; error: any}) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(Wallet);

import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {SIZES, FONTS} from '../../../constants';
import {Header} from '../../../components';
import {connect} from 'react-redux';

const PrivacyPolicy = ({appTheme}: any) => {
  const navigation = useNavigation();

  function renderSection() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding,
          marginTop: SIZES.radius,
        }}>
        <ScrollView
          indicatorStyle={'white'}
          style={{
            marginTop: 10,
            padding: 15,
            height: '80%',
            borderRadius: SIZES.radius,
            backgroundColor: appTheme.tabBackgroundColor,
          }}>
          <Text
            style={{
              ...FONTS.body2,
              paddingBottom: 10,
              color: appTheme.textColor,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus risus
            mauris cursus donec urna tristique dictum volutpat. Metus, tempus ut
            quisque in tincidunt tristique nisi mi. Sed et vel nunc nullam
            maecenas. Nec at nunc lacus massa gravida mus et.
          </Text>

          <Text
            style={{
              ...FONTS.body2,
              paddingBottom: 10,
              color: appTheme.textColor,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus risus
            mauris cursus donec urna tristique dictum volutpat. Metus, tempus ut
            quisque in tincidunt tristique nisi mi. Sed et vel nunc nullam
            maecenas. Nec at nunc lacus massa gravida mus et.
          </Text>

          <Text
            style={{
              ...FONTS.body2,
              paddingBottom: 10,
              color: appTheme.textColor,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus risus
            mauris cursus donec urna tristique dictum volutpat. Metus, tempus ut
            quisque in tincidunt tristique nisi mi. Sed et vel nunc nullam
            maecenas. Nec at nunc lacus massa gravida mus et.
          </Text>

          <Text
            style={{
              ...FONTS.body2,
              paddingBottom: 10,
              color: appTheme.textColor,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus risus
            mauris cursus donec urna tristique dictum volutpat. Metus, tempus ut
            quisque in tincidunt tristique nisi mi. Sed et vel nunc nullam
            maecenas. Nec at nunc lacus massa gravida mus et.
          </Text>

          <Text
            style={{
              ...FONTS.body2,
              paddingBottom: 10,
              color: appTheme.textColor,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus risus
            mauris cursus donec urna tristique dictum volutpat. Metus, tempus ut
            quisque in tincidunt tristique nisi mi. Sed et vel nunc nullam
            maecenas. Nec at nunc lacus massa gravida mus et.
          </Text>

          <Text
            style={{
              ...FONTS.body2,
              paddingBottom: 10,
              color: appTheme.textColor,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus risus
            mauris cursus donec urna tristique dictum volutpat. Metus, tempus ut
            quisque in tincidunt tristique nisi mi. Sed et vel nunc nullam
            maecenas. Nec at nunc lacus massa gravida mus et.
          </Text>

          <Text
            style={{
              ...FONTS.body2,
              paddingBottom: 10,
              color: appTheme.textColor,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam,
            suspendisse risus, turpis sed turpis urna neque. Dictumst purus diam
            venenatis pretium adipiscing turpis risus donec consectetur. Augue
            sit enim a, commodo ac tincidunt quis risus pellentesque. Fusce vel
            feugiat rhoncus malesuada.
          </Text>
          <View style={{height: 100}} />
        </ScrollView>
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
        title="Privacy Policy"
        onPress={() => navigation.goBack()}
        titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
        contentStyle={{paddingTop: SIZES.height > 700 ? 0 : SIZES.base}}
      />
      {renderSection()}
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(PrivacyPolicy);

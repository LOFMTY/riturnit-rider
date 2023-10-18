import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';

import {COLORS, SIZES, FONTS, icons} from '../../../constants';
import {Header} from '../../../components';
import {getUser} from '../../../queries/Profile/UserQueries';
import {GetUserQuery, GetUserQueryVariables} from '../../../API';
import {useAuthContext} from '../../../context/AuthContext';
import {ProfileStackNavigatorParamList} from '../../../type/navigation';

const InviteFriends = ({appTheme}: any) => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();

  const {userID} = useAuthContext();

  const {loading, data} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: userID}},
  );
  const referralCode: any = data?.getUser?.inviteCode;

  // copy to clipboard
  const copyToClipboard = () => {
    Clipboard.setString(referralCode);
  };

  if (loading) {
    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center'}}
        size={'large'}
        color={'#3580ff'}
      />
    );
  }

  function renderTopSection() {
    return (
      <LinearGradient
        start={{x: 0.1, y: 0.05}}
        end={{x: 0.3, y: 1.2}}
        locations={[0.1, 0.1, 0.8]}
        colors={['#6098fe', '#6098fe', '#3580ff']}
        style={{
          borderRadius: SIZES.radius,
          padding: 20,
          justifyContent: 'center',
          marginHorizontal: SIZES.margin,
          marginTop: SIZES.radius,
        }}>
        {/* Invite Friends */}
        <View style={{paddingTop: SIZES.radius}}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3,
              fontWeight: '500',
            }}>
            Invite Friends
          </Text>
        </View>

        {/* Refer friend text */}
        <View style={{paddingTop: SIZES.margin}}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body2,
              lineHeight: 24,
            }}>
            Refer a friend to Riturnit and get{' '}
            <Text style={{...FONTS.h4, color: COLORS.white}}>$5</Text> in return
            credit of their first return with this code:{' '}
            <Text style={{...FONTS.h4, color: COLORS.white}}>
              {referralCode}
            </Text>
          </Text>
        </View>

        {/* share button */}
        <View
          style={{
            paddingTop: SIZES.radius,
            paddingHorizontal: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 10,
              width: 70,
              height: 40,
              justifyContent: 'center',
            }}
            onPress={copyToClipboard}>
            <Text
              style={{
                color: COLORS.gradient2,
                textAlign: 'center',
                ...FONTS.body2,
                fontWeight: '500',
              }}>
              Copy
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  function renderBottomSection() {
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: SIZES.padding * 1.5,
          marginTop: SIZES.radius,
        }}>
        {/* Share tab */}
        <View
          style={{
            marginTop: SIZES.margin,
            flexDirection: 'row',
            backgroundColor: appTheme.tabBackgroundColor,
            borderRadius: SIZES.padding,
            height: 70,
            padding: 10,
            paddingHorizontal: 15,
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <FastImage
              source={icons.logo}
              style={{width: 35, height: 35, top: 4}}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                ...FONTS.h6,
                color: appTheme.textColor,
              }}>
              Share with your contacts
            </Text>
          </View>

          <TouchableOpacity
            style={{
              justifyContent: 'center',
              paddingHorizontal: 15,
              marginVertical: 8,
              borderRadius: SIZES.padding,
              alignItems: 'center',
              backgroundColor: COLORS.gradient2,
            }}
            onPress={() =>
              navigation.navigate('ContactList', {
                inviteCode: referralCode,
              })
            }>
            <Text
              style={{
                ...FONTS.h6,
                color: COLORS.white,
              }}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: appTheme.backgroundColor}}>
      <Header
        title="Invite Friends"
        onPress={() => navigation.goBack()}
        titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
      />

      {/* animation invite */}
      <View
        style={{
          marginHorizontal: SIZES.margin,
          alignItems: 'center',
        }}>
        <LottieView
          style={{height: SIZES.height > 700 ? 300 : 200, alignSelf: 'center'}}
          autoPlay
          speed={1}
          loop={true}
          source={require('../../../assets/json/share.json')}
        />
      </View>

      {renderTopSection()}
      {renderBottomSection()}
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(InviteFriends);

import React, {useState} from 'react';
import {
  View,
  Linking,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {Auth} from 'aws-amplify';
import {useMutation, useQuery} from '@apollo/client';
import {ALERT_TYPE, Root, Toast} from 'react-native-alert-notification';

import {COLORS, SIZES, icons, images} from '../../../constants';
import {
  ProfileTabs,
  ProfileHorizontalTab,
  UserPhoto,
} from '../../../components';
import {toggleTheme} from '../../../redux/theme/themeActions';
import {ProfileStackNavigatorParamList} from '../../../type/navigation';
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
} from '../../../API';
import {deleteUser, getUser} from '../../../queries/Profile/UserQueries';
import {useAuthContext} from '../../../context/AuthContext';

const Profile = ({appTheme, toggleTheme}: any) => {
  const navigation = useNavigation<ProfileStackNavigatorParamList>();

  const {userID, authUser} = useAuthContext();

  const DeliverWithRiturnit = 'https://google.com';

  const [isLoading, setIsLoading] = useState(false);

  const {data} = useQuery<GetUserQuery, GetUserQueryVariables>(getUser, {
    variables: {id: userID},
  });
  const user = data?.getUser;

  const [doDeleteUser, {loading}] = useMutation<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(deleteUser);

  const signOut = async () => {
    try {
      setIsLoading(true);
      await Auth.signOut({global: true});
    } catch (error) {
      Alert.alert('Oops', (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  function toggleThemeHandler() {
    if (appTheme.name == 'light') {
      toggleTheme('dark');
    } else {
      toggleTheme('light');
    }
  }

  const confirmDelete = () => {
    Alert.alert('Are you sure?', 'Deleting your profile is permanent', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: deleteAccount,
      },
    ]);
  };

  //delete from Cognito
  const deleteAccount = async () => {
    if (!user) {
      return;
    }
    //delete from Db
    await doDeleteUser({
      variables: {
        input: {
          id: userID,
          _version: user?._version,
        },
      },
    });
    authUser?.deleteUser((err: any) => {
      if (err) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          textBody: `${err}`,
          autoClose: 1000,
        });
      }
      Auth.signOut();
    });
    navigation.goBack();
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

  function renderHorizontalButton() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 17,
          marginTop: SIZES.radius,
          justifyContent: 'space-between',
        }}>
        <ProfileHorizontalTab
          imageIcon={icons.credit_card}
          title="Wallet"
          onPress={() => navigation.navigate('Wallet')}
        />
        <ProfileHorizontalTab
          imageIcon={icons.receipt}
          title="Receipts"
          onPress={() => navigation.navigate('Receipts')}
        />
        <ProfileHorizontalTab
          imageIcon={icons.trips}
          title="Trips"
          onPress={() => navigation.navigate('TripList')}
          iconStyle={{width: 28, height: 28}}
        />
      </View>
    );
  }

  function renderAccountSection() {
    return (
      <View
        style={{
          paddingBottom: 5,
          marginBottom: 400,
          marginHorizontal: SIZES.padding,
        }}>
        {/* Account Info */}
        <ProfileTabs
          iconTitle={icons.profileUser}
          title={'Account Details'}
          imageIcon={true}
          textStyle={{marginLeft: 2}}
          iconStyle={{width: 15, height: 15, marginLeft: 2}}
          onPress={() => navigation.navigate('AccountDetails')}
          containerStyle={{marginTop: SIZES.radius}}
        />

        <ProfileTabs
          iconTitle={icons.notifications}
          title={'Notifications'}
          imageIcon={true}
          textStyle={{marginLeft: 2}}
          iconStyle={{width: 15, height: 15, marginLeft: 2}}
          onPress={() => navigation.navigate('Notifications')}
        />

        {/* General Section  */}
        <View style={{marginTop: 0}}>
          {/* Light & Dark Mode*/}
          <ProfileTabs
            iconTitle={icons.moonLight}
            title={'Mode'}
            toggleIcon={true}
            textStyle={{marginLeft: 3}}
            iconStyle={{width: 15, height: 15, marginLeft: 2}}
            onPress={() => navigation.navigate('AccountDetails')}
            toggleTheme={() => toggleThemeHandler()}
          />

          {/* About Us */}
          <ProfileTabs
            iconTitle={images.about}
            title={'About Us'}
            imageIcon={true}
            onPress={() => navigation.navigate('AboutUs')}
          />

          {/* Deliver With Riturnit */}
          <ProfileTabs
            iconTitle={images.bag}
            title={'Become a Riturnit Driver'}
            imageIcon={true}
            onPress={() => Linking.openURL(DeliverWithRiturnit)}
          />

          {/* Invite Friends */}
          <ProfileTabs
            iconTitle={icons.friends}
            title={'Invite Friends'}
            imageIcon={true}
            onPress={() => navigation.navigate('InviteFriends')}
          />

          {/* Help */}
          <ProfileTabs
            iconTitle={icons.help}
            title={'Help'}
            imageIcon={true}
            iconStyle={{width: 15, height: 15, marginLeft: 2}}
            onPress={() => navigation.navigate('Help')}
          />

          {/* Contact Us */}
          <ProfileTabs
            iconTitle={icons.call}
            title={'Contact Us'}
            imageIcon={true}
            iconStyle={{width: 15, height: 15, marginLeft: 2}}
            onPress={() => navigation.navigate('ContactUs')}
          />

          {/* Logout */}
          <ProfileTabs
            iconTitle={images.logout}
            title={'Sign out'}
            onPress={signOut}
            containerStyle={{backgroundColor: 'transparent'}}
            iconStyle={{tintColor: COLORS.gray}}
            textStyle={{color: appTheme.buttonText}}
          />

          {/* Delete account */}
          <ProfileTabs
            iconTitle={icons.bin}
            title={loading ? 'Deleting...' : 'Delete account'}
            onPress={confirmDelete}
            containerStyle={{backgroundColor: 'transparent', top: -10}}
            iconStyle={{tintColor: COLORS.scarlet}}
            textStyle={{color: COLORS.scarlet}}
          />
        </View>
      </View>
    );
  }

  return (
    <Root>
      <View style={{backgroundColor: appTheme.backgroundColor}}>
        <Spinner
          visible={isLoading}
          animation={'fade'}
          textStyle={{color: appTheme.textColor}}
          overlayColor={'rgba(0,0,0,0.5)'}
        />
        <UserPhoto userImage={user?.image} />
        <ScrollView indicatorStyle="white" showsVerticalScrollIndicator={false}>
          {renderHorizontalButton()}
          {renderAccountSection()}
        </ScrollView>
      </View>
    </Root>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    toggleTheme: (themeType: any) => {
      return dispatch(toggleTheme(themeType));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, Alert} from 'react-native';
import {useForm} from 'react-hook-form';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Geocoder from 'react-native-geocoding';
import {connect} from 'react-redux';
import {useMutation, useQuery} from '@apollo/client';
import {Storage} from 'aws-amplify';
import {v4 as uuidV4} from 'uuid';
import Spinner from 'react-native-loading-spinner-overlay/lib';

import {COLORS, SIZES, FONTS, icons} from '../../../constants';
import {
  Header,
  AddressDetails,
  TextButton,
  CustomInput,
  ProfilePhoto,
} from '../../../components';
import UploadProfilePhotoOptionsModal from '../UserProfile/UploadProfilePhotoOptionsModal';
import {GOOGLE_MAPS_APIKEY} from '../../../utilities/Utils';
import {getUser, updateUser} from '../../../queries/Profile/UserQueries';
import {
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserInput,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '../../../API';
import {IEditableUser} from '../../../components/Buttons/CustomInput';
import {MyProfileRouteProp} from '../../../type/navigation';
import {useAuthContext} from '../../../context/AuthContext';

const AccountDetails = ({appTheme}: any) => {
  const navigation = useNavigation<any>();

  const [uploading, setUploading] = useState(false);
  const [showUploadPhotoModal, setShowUploadPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any | Asset>('');
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('');
  const [displayCurrentAddress2, setDisplayCurrentAddress2] = useState('');

  const {userID} = useAuthContext();

  const route = useRoute<MyProfileRouteProp | any>();
  const userId = route.params?.userId || userID;

  Geocoder.init(GOOGLE_MAPS_APIKEY, {language: 'en'});

  const {control, handleSubmit, setValue} = useForm<IEditableUser>();

  // GET USER DETAILS
  const {loading, data} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: userId}},
  );
  const userAccount = data?.getUser;

  console.warn(992929, data)

  // UPDATE USER DETAILS
  const [doUpdateUser, {error, loading: updateLoading}] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(updateUser);

  useEffect(() => {
    let unmounted = false;
    if (userAccount) {
      setValue('name', userAccount.name);
      setValue('email', userAccount.email);
      setValue('phone_number', userAccount.phone_number);
    }
    return () => {
      unmounted = true;
    };
  }, [userAccount, setValue]);

  const storeData = async (formData: IEditableUser) => {
    const input: UpdateUserInput = {
      id: userId,
      home_address: displayCurrentAddress,
      work_address: displayCurrentAddress2,
      ...formData,
      _version: userAccount?._version,
    };
    if (selectedPhoto?.uri) {
      input.image = await uploadMedia(selectedPhoto.uri);
    }
    await doUpdateUser({
      variables: {
        input,
      },
    });
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  // UPLOAD IMAGE OF DRIVER
  const uploadMedia = async (uri: string) => {
    try {
      // get the Blob of the file from uri
      const response = await fetch(uri);
      const blob = await response.blob();

      // file extension splitting
      const uriParts = uri.split('.');
      const extension = uriParts[uriParts.length - 1];

      // upload file (blob) to s3
      const s3Response = await Storage.put(`${uuidV4()}.${extension}`, blob);
      return s3Response.key;
    } catch (error) {
      Alert.alert('Error uploading the file', (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  // UPLOAD VIA GALLERY
  const onChangePhoto = () => {
    launchImageLibrary(
      {mediaType: 'photo', quality: 0.5, selectionLimit: 1},
      ({didCancel, errorCode, assets}) => {
        if (!didCancel && !errorCode && assets && assets.length > 0) {
          setSelectedPhoto(assets[0]);
        }
      },
    );
  };

  // UPLOAD VIA CAMERA
  const onCameraPress = () => {
    launchCamera(
      {mediaType: 'photo', quality: 0.5},
      ({didCancel, errorCode, assets}) => {
        if (!didCancel && !errorCode && assets && assets.length > 0) {
          setSelectedPhoto(assets[0]);
        }
      },
    );
  };

  const getHomeAddress = async () => {
    await AsyncStorage.getItem('homeAddress').then((value: any) => {
      const data = JSON.parse(value);
      if (data) {
        const {lat, lng} = data;
        Geocoder.from(lat, lng)
          .then(json => {
            const addressComponent =
              json.results[0].address_components[0].long_name +
              ', ' +
              json.results[0].address_components[1].long_name +
              ', ' +
              json.results[0].address_components[2].long_name +
              ', ' +
              json.results[0].address_components[3].long_name +
              ', ' +
              json.results[0].address_components[4].long_name;
            setDisplayCurrentAddress(addressComponent);
          })
          .catch(error => Alert.alert(error));
      }
    });
  };

  const getWorkAddress = async () => {
    await AsyncStorage.getItem('workAddress').then((value: any) => {
      const data = JSON.parse(value);
      if (data) {
        const {lat, lng} = data;
        Geocoder.from(lat, lng)
          .then(json => {
            const addressComponent1 =
              json.results[0].address_components[0].long_name +
              ', ' +
              json.results[0].address_components[1].long_name +
              ', ' +
              json.results[0].address_components[2].long_name +
              ', ' +
              json.results[0].address_components[3].long_name +
              ', ' +
              json.results[0].address_components[4].long_name;
            setDisplayCurrentAddress2(addressComponent1);
          })
          .catch(error => Alert.alert(error));
      }
    });
  };

  // get stored home address from async-storage
  useEffect(() => {
    let unmounted = false;
    if (route.params?.userAddress1) {
      setDisplayCurrentAddress(route.params?.userAddress1);
    }
    getHomeAddress();
    return () => {
      unmounted = true;
    };
  }, [route.params?.userAddress1]);

  // get stored work address from async-storage
  useEffect(() => {
    let unmounted = false;
    if (route.params?.userAddress2) {
      setDisplayCurrentAddress2(route.params?.userAddress2);
    }
    getWorkAddress();
    return () => {
      unmounted = true;
    };
  }, [route.params?.userAddress2]);

  if (loading) {
    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center'}}
        size={'large'}
        color={'#3580ff'}
      />
    );
  }

  function renderFormDetails() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.radius,
        }}>
        {/* Full Name */}
        <CustomInput
          control={control}
          label="Full name"
          name="name"
          rules={{
            required: 'Full name is required',
            minLength: {
              value: 3,
              message: 'names should be more than 5 characters',
            },
          }}
          keyboardType={'default'}
        />

        {/* Phone Number */}
        <CustomInput
          control={control}
          label="Mobile number"
          name="phone_number"
          rules={{required: 'Mobile number is required'}}
          editable={false}
          keyboardType={'phone-pad'}
        />

        {/* email address */}
        <CustomInput
          control={control}
          label="Email"
          name="email"
          editable={false}
          textInputStyle={{color: COLORS.gray}}
        />
      </View>
    );
  }

  function renderAddressSection() {
    return (
      <View
        style={{
          justifyContent: 'center',
          marginHorizontal: SIZES.radius,
          marginTop: SIZES.margin,
          marginBottom: 45,
        }}>
        <Text
          style={{
            ...FONTS.h5,
            color: appTheme.textColor,
          }}>
          Preferred Places
        </Text>
        <AddressDetails
          title="Home address"
          address={userAccount?.home_address || displayCurrentAddress}
          icon={icons.home}
          onPress={() => navigation.navigate('AddressHome')}
          containerStyle={{marginTop: SIZES.radius}}
        />
        <AddressDetails
          title="Work address"
          address={userAccount?.work_address || displayCurrentAddress2}
          icon={icons.suitcase}
          onPress={() => navigation.navigate('AddressWork')}
          containerStyle={{marginTop: SIZES.radius}}
        />

        <TextButton
          label={uploading || updateLoading ? 'Saving...' : 'Save'}
          labelStyle={{color: COLORS.white, ...FONTS.h5}}
          buttonContainerStyle={{
            height: 45,
            width: 300,
            alignSelf: 'center',
            marginTop: SIZES.padding,
            backgroundColor: COLORS.gradient2,
          }}
          onPress={handleSubmit(storeData)}
        />
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
        title="Account Details"
        onPress={() => navigation.goBack()}
        titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
      />
      <Spinner
        visible={uploading || updateLoading}
        animation={'fade'}
        overlayColor={'rgba(0,0,0,0.5)'}
      />
      <KeyboardAwareScrollView keyboardDismissMode="on-drag" extraHeight={150}>
        {/* ProfilePhoto */}
        <ProfilePhoto
          onPress={() => setShowUploadPhotoModal(true)}
          userImage={selectedPhoto?.uri || userAccount?.image}
          containerStyle={{
            backgroundColor: null,
          }}
        />
        {showUploadPhotoModal && (
          <UploadProfilePhotoOptionsModal
            library={onChangePhoto}
            camera={onCameraPress}
            isVisible={showUploadPhotoModal}
            onClose={() => setShowUploadPhotoModal(false)}
          />
        )}
        {renderFormDetails()}
        {renderAddressSection()}
      </KeyboardAwareScrollView>
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(AccountDetails);

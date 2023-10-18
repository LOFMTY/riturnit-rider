import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {COLORS, SIZES, images} from '../../constants';
import { DEFAULT_PROFILE_IMG } from '../../utilities/Utils';

interface IUserImage {
  userImage?: string | null;
  appTheme?: any;
  onPress: Function;
  containerStyle: any;
}

const ProfilePhoto = ({
  appTheme,
  onPress,
  userImage,
  containerStyle,
}: IUserImage) => {
  const [imageUri, setImageUri] = useState<any>(null);

  useEffect(() => {
    let unmounted = false;
    if (userImage) {
      Storage.get(userImage).then(setImageUri);
    }
    return () => {
      unmounted = true;
    };
  }, [userImage]);

  return (
    <View
      style={{
        backgroundColor: appTheme.cardBackgroundColor,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        ...containerStyle,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: SIZES.radius,
        }}>
        {/* Profile Photo */}
        <FastImage
          source={{uri: imageUri || DEFAULT_PROFILE_IMG}}
          style={{
            width: 180,
            height: 180,
            borderRadius: 100 * 2,
            borderWidth: 4,
            borderColor: COLORS.gradient2,
          }}
        />
        {/* User Profile Upload Button */}
        <TouchableOpacity onPress={() => onPress()}>
          <FastImage
            source={images.upload}
            style={{
              width: 30,
              height: 30,
              top: -20,
              left: 20,
              position: 'absolute',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(ProfilePhoto);
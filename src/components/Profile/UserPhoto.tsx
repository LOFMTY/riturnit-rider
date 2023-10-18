import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {Storage} from 'aws-amplify';

import {COLORS, SIZES} from '../../constants';
import {DEFAULT_PROFILE_IMG} from '../../utilities/Utils';

interface IUserImage {
  userImage?: string | null;
  appTheme?: any;
}

const UserPhoto = ({appTheme, userImage}: IUserImage) => {
  const [imageUri, setImageUri] =  useState<string | null>(null);

  useEffect(() => {
    let unmounted = false
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
        paddingTop: 45,
        backgroundColor: appTheme.cardBackgroundColor,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        marginBottom: 2
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: SIZES.margin,
        }}>
        {/* Profile Photo */}
        <FastImage
          source={{uri: imageUri || DEFAULT_PROFILE_IMG}}
          style={{
            width: 150,
            height: 150,
            borderRadius: 100 * 2,
            borderWidth: 3,
            borderColor: COLORS.gradient2,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
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

export default connect(mapStateToProps)(UserPhoto);

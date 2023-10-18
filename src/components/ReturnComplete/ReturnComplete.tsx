import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AirbnbRating} from 'react-native-ratings';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {Storage} from 'aws-amplify';

import {COLORS, FONTS, SIZES} from '../../constants';
import {DEFAULT_PROFILE_IMG} from '../../utilities/Utils';

const ReturnComplete = ({
  appTheme,
  dateObj,
  amountToPay,
  rating,
  ratingCompleted,
  driverName,
  driverImage,
}: any) => {
  const [imageUri, setImageUri] = useState<any>(null);

  useEffect(() => {
    let unmounted = false
    if (driverImage) {
      Storage.get(driverImage).then(setImageUri);
    }
    return () => {
      unmounted = true;
    };
  }, [driverImage]);

  return (
    <View>
      {/* date and amount */}
      <View
        style={{
          marginTop: SIZES.margin,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{...FONTS.h5, color: appTheme.textColor}}>
          {dateObj}
        </Text>
      </View>

      {/* driver photo */}
      <View
        style={{
          marginHorizontal: SIZES.padding,
          marginTop: SIZES.padding,
        }}>
        {/* Driver Profile Picture */}
        <View
          style={{
            alignItems: 'center',
          }}>
          <FastImage
            source={{uri: imageUri || DEFAULT_PROFILE_IMG}}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: 180,
              height: 180,
              borderRadius: 220 / 2,
              borderColor: COLORS.gradient2,
              borderWidth: 0.5,
            }}
          />
        </View>
      </View>

      {/* rate return */}
      <View
        style={{
          marginTop: SIZES.margin,
          alignItems: 'center',
        }}>
        <Text
          style={{
            ...FONTS.body2,
            textAlign: 'center',
            color: appTheme.textColor,
          }}>
          Please rate{' '}
          <Text
            style={{
              ...FONTS.body2,
              fontWeight: '700',
              textAlign: 'center',
              color: appTheme.textColor,
            }}>
            {driverName}{' '}
          </Text>
          return.
        </Text>

        <Text
          style={{
            ...FONTS.body2,
            textAlign: 'center',
            color: appTheme.inputColor,
            paddingTop: SIZES.radius,
          }}>
          Your feedback will help us improve returning experience better.
        </Text>
      </View>

      {/* rating section */}
      <View
        style={{
          marginHorizontal: SIZES.padding,
          marginTop: SIZES.padding,
        }}>
        {/* Ratings */}
        <View
          style={{
            alignItems: 'center',
            marginHorizontal: SIZES.padding * 2.5,
            borderRadius: SIZES.padding,
            backgroundColor: appTheme.tabBackgroundColor,
          }}>
          <AirbnbRating
            reviewSize={0}
            defaultRating={rating}
            size={30}
            onFinishRating={ratingCompleted}
            showRating={false}
            ratingContainerStyle={{
              width: '100%',
              backgroundColor: appTheme.backgroundColor,
            }}
          />
        </View>
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

export default connect(mapStateToProps)(ReturnComplete);

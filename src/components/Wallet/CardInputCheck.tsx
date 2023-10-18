import React from 'react';
import {View, Image} from 'react-native';

import {COLORS, icons} from '../../constants';
import FastImage from 'react-native-fast-image';

const CardInputCheck = ({value, error}: any) => {
  return (
    <View
      style={{
        justifyContent: 'center',
      }}>
      <FastImage
        source={
          value == '' || (value != '' && error == '')
            ? icons.correct
            : icons.cancel
        }
        tintColor={
          value == ''
            ? COLORS.gray
            : value != '' && error == ''
            ? COLORS.caribbeanGreen
            : COLORS.scarlet
        }
        style={{
          height: 23,
          width: 23,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

export default CardInputCheck;

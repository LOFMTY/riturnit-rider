import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {icons, SIZES} from '../../constants';

const Rating = ({containerStyle, rate}: any) => {
  const starComponent = [];

  for (let i = 0; i < 5; i++) {
    starComponent.push(
      <FastImage
        key={`full-${i}`}
        source={i < rate ? icons.rate : icons.star}
        resizeMode={FastImage.resizeMode.cover}
        style={{
          marginLeft: i == 0 ? 0 : 3,
          width: SIZES.radius,
          height: SIZES.radius,
        }}
      />,
    );
  }

  return (
    <View style={{flexDirection: 'row', ...containerStyle}}>
      {starComponent}
    </View>
  );
};

export default Rating;

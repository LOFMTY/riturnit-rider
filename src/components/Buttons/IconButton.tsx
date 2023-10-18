import React from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

const IconButton = ({containerStyle, icon, iconStyle, onPress}: any) => {
  return (
    <TouchableOpacity
      style={{
        ...containerStyle,
      }}
      onPress={onPress}>
      <FastImage
        source={icon}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          width: 18,
          height: 18,
          ...iconStyle,
        }}
      />
    </TouchableOpacity>
  );
};

export default IconButton;

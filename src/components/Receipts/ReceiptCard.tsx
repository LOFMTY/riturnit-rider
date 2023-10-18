import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

import {SIZES, FONTS} from '../../constants';
import {DEFAULT_IMAGE} from '../../utilities/Utils';
import {Store} from '../../API';

interface IStoreCard {
  store: Store | any;
  appTheme: any;
  onPress: Function;
}

const ReceiptCard = ({appTheme, store, onPress}: IStoreCard) => {
  return (
    <TouchableOpacity
      style={{
        height: 185,
        borderRadius: SIZES.radius,
         width: SIZES.width / 2 - 24,
        backgroundColor: appTheme.tabBackgroundColor,
      }}
      onPress={() => onPress()}>
      <FastImage
        source={{uri: store.image || DEFAULT_IMAGE}}
        resizeMode={FastImage.resizeMode.contain}
        style={{
          width: '100%',
          height: '75%',
          top: 10,
          alignSelf: 'center',
        }}
      />

      {/* Store Name */}
      <View
        style={{
          padding: 19,
        }}>
        <Text
         numberOfLines={1}
          style={{
            ...FONTS.body3,
            fontWeight: '500',
            textAlign: 'center',
            color: appTheme.textColor,
          }}>
          {store.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(ReceiptCard);

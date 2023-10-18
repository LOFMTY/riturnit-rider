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

const StoreCard = ({store, appTheme, onPress}: IStoreCard) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: SIZES.base,
        width: SIZES.width / 2 - 10,
        paddingHorizontal: 8,
      }}
      onPress={() => onPress()}>
      <View
        style={{
          height: 180,
          borderRadius: SIZES.radius,
          backgroundColor: appTheme.tabBackgroundColor,
        }}>
        <FastImage
          source={{uri: store.image || DEFAULT_IMAGE}}
          style={{
            width: '90%',
            height: '75%',
            top: 10,
            borderRadius: SIZES.base,
            alignSelf: 'center',
          }}
          resizeMode={FastImage.resizeMode.cover}
        />

        {/* Store Name */}
        <View
          style={{
            padding: 19,
          }}>
          <Text
            numberOfLines={1}
            style={{
              color: appTheme.textColor,
              ...FONTS.body3,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            {store.name}
          </Text>
        </View>
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

export default connect(mapStateToProps)(StoreCard);

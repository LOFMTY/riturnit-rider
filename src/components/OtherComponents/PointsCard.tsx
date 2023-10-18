import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

import {SIZES, FONTS, icons} from '../../constants';
import {Store} from '../../API';
import {DEFAULT_IMAGE} from '../../utilities/Utils';

interface IStoreCard {
  store: Store | any;
  appTheme: any;
  points?: number;
}

const PointsCard = ({points, store, appTheme}: IStoreCard) => {
  return (
    <View
      style={{
        marginTop: SIZES.base,
        width: SIZES.width / 2,
        paddingHorizontal: 8,
      }}>
      <View
        style={{
          height: 190,
          borderRadius: SIZES.padding,
          backgroundColor: appTheme.tabBackgroundColor,
        }}>
        <FastImage
          source={{uri: store.image || DEFAULT_IMAGE}}
          resizeMode={FastImage.resizeMode.cover}
          style={{
            width: '88%',
            height: '62%',
            top: 10,
            borderRadius: 18,
            alignSelf: 'center',
          }}
        />

        {/* Store Name */}
        <View
          style={{
            paddingTop: SIZES.margin,
            alignSelf: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={{
              color: appTheme.textColor,
              ...FONTS.h5,
              textAlign: 'center',
            }}>
            {store.name}
          </Text>
        </View>

        {/* Store Points value  */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingHorizontal: SIZES.padding * 2.7,
            paddingTop: 4,
          }}>
          <View
            style={{
              marginRight: SIZES.base,
              justifyContent: 'center',
            }}>
            <FastImage
              source={icons.coins}
              resizeMode={FastImage.resizeMode.cover}
              style={{height: 17, width: 17}}
            />
          </View>

          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                ...FONTS.body3,
                color: appTheme.textColor,
                fontWeight: '500',
              }}>
              {points}
            </Text>
          </View>
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

export default connect(mapStateToProps)(PointsCard);

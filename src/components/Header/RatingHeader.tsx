import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';

import {FONTS, SIZES, icons} from '../../constants';

const RatingHeader = ({title, appTheme, right}: any) => {
  const navigation = useNavigation<any>();

  return (
    <View
      style={{
        paddingTop: 45,
        backgroundColor: appTheme.tabBackgroundColor,
        height: Platform.OS == 'ios' ? '12%' : '10%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        marginBottom: SIZES.radius,
      }}>
      <View
        style={{
          flex: 1,
          marginHorizontal: SIZES.padding,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {/* Header Back Button */}
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={() => navigation.navigate('Home')}>
          <FastImage
            source={icons.close}
            resizeMode={FastImage.resizeMode.contain}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
        {/* Header Address Title */}
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{
              ...FONTS.h3,
              fontWeight: '500',
              textAlign: 'center',
              color: appTheme.textColor,
            }}>
            {title}
          </Text>
        </View>

        {right && (
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => navigation.navigate('Home')}>
            <FastImage
              source={icons.menu}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 25,
                height: 25,
              }}
            />
          </TouchableOpacity>
        )}
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

export default connect(mapStateToProps)(RatingHeader);

import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';

import FastImage from 'react-native-fast-image';
import {SIZES, FONTS, icons} from '../../constants';
import { Header } from '../../components';
import { useNavigation, useRoute } from '@react-navigation/native';

const methods = [
    {
        id: 1,
        icon: require('../../assets/icons/appleBlue.png'),
        iconSizes: {
            width: 19,
            height: 24,
        },
        title: 'Apple Pay'
    },
    {
        id: 2,
        icon: require('../../assets/icons/card.png'),
        iconSizes: {
            width: 20,
            height: 16,
        },
        title: 'Credit or debit card',
        path: 'AddCard'
    }
]

const PaymentMethod = ({appTheme, onPress}: any) => {
  const navigation = useNavigation<any>();
  return (
    <View
      style={{
        flex: 1,
          backgroundColor: appTheme.backgroundColor,
      }}>
        <Header
          title="Add payment method "
          onPress={() => navigation.goBack()}
          titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
        />
        <View style={{
            backgroundColor: 'white',
            margin: 30,
            paddingVertical: 19,
            borderRadius: 10,
        }}>
            {methods.map((e, i) => (
                <TouchableOpacity
                    onPress={() => e.path && navigation.navigate(e.path)}
                    activeOpacity={0.8}
                    key={e.id} style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottomColor: '#F2F3F5',
                    borderBottomWidth: i === methods.length - 1 ? 0 : 1,
                    paddingHorizontal: 22,
                    paddingTop: i === 0 ? 0 : 19,
                    paddingBottom: i === 0 ? 19 : 0
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <FastImage source={e.icon} style={{width: e.iconSizes.width, height: e.iconSizes.height}} />
                        <Text style={{ fontSize: 14, fontWeight: '600', marginLeft: 12 }}>{e.title}</Text>
                    </View>
                    <FastImage
                        source={icons.right}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            width: 15,
                            height: 15,
                        }}
                    />
                </TouchableOpacity>
            ))}
        </View>
    </View>
  );
};

function mapStateToProps(state: {themeReducer: {appTheme: any}; error: any}) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(PaymentMethod);
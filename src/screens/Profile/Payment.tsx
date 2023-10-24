import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';

import {PaymentTab, Header} from '../../components';
import {SIZES, dummyData, COLORS, icons} from '../../constants';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const Payment = ({appTheme}: any) => {
  const navigation = useNavigation()
  const route = useRoute()

  const amount = route?.params?.amount

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.backgroundColor,
      }}>
      <Header
        title=""
        onPress={() => navigation.navigate('MyProfile')}
        titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
        type
      />
      <View style={{
        // alignItems: 'center'
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <View />
        <View style={{
            alignItems: 'center'
        }}>
            <FastImage
                source={icons.check_circle}
                style={{
                    width: 160,
                    height: 160
                }}
            />
            <Text>You have successfully added <Text style={{color: '#3580FF'}}>${amount}</Text></Text>
            <Text>to your wallet</Text>
        </View>
        <TouchableOpacity
            onPress={() => navigation.navigate('MyProfile')}
            style={{
                marginBottom: 48
            }}
        >
            <LinearGradient
                colors={["#6098F6", "#3580FF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                    height: 64,
                    marginHorizontal: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 1,
                    borderRadius: 16
                }}
            >
                <Text style={{
                    fontSize: 18,
                    color: 'white',
                    fontWeight: '700'
                }}>Save</Text>
            </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
  };
}

export default connect(mapStateToProps)(Payment);

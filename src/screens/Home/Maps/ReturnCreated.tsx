import {View, Text} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {v4 as uuidv4} from 'uuid';

import {COLORS, FONTS, SIZES} from '../../../constants';
import {TabHeader, TextButton} from '../../../components';
import {HomeStackNavigatorParamList} from '../../../type/navigation';
import {useReturnContext} from '../../../context/ReturnContext';

const ReturnCreated = ({appTheme}: any) => {
  const navigation = useNavigation<HomeStackNavigatorParamList>();

  const {setTripsId} = useReturnContext();

  return (
    <View style={{flex: 1, backgroundColor: appTheme.backgroundColor}}>
      <TabHeader title="Return Created" />

      <View style={{marginTop: SIZES.padding * 2}}>
        <LottieView
          style={{height: 250, width: 250, alignSelf: 'center'}}
          autoPlay
          speed={1}
          loop={true}
          source={require('../../../assets/json/findingDriver.json')}
        />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: SIZES.margin,
          }}>
          <Text
            style={{
              color: appTheme.textColor,
              ...FONTS.h5,
              paddingTop: SIZES.radius,
            }}>
            Your Riturnit request has been created.
          </Text>
        </View>

        {/* Button Cancel Driver */}
        <TextButton
          label={'Continue'}
          labelStyle={{color: COLORS.white, ...FONTS.h5}}
          buttonContainerStyle={{
            marginTop: SIZES.padding,
            height: 45,
            width: 250,
            alignSelf: 'center',
            backgroundColor: COLORS.gradient2,
          }}
          onPress={() => {
            navigation.replace('Home');
            setTripsId(uuidv4());
          }}
        />
      </View>
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
  };
}

export default connect(mapStateToProps)(ReturnCreated);

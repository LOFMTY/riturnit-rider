import {View, ActivityIndicator, Alert} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {connect} from 'react-redux';

import {SIZES, FONTS, COLORS} from '../../../constants';
import {timeConvert} from '../../../utilities/service';
import TextButton from '../../Buttons/TextButton';
import {useReturnContext} from '../../../context/ReturnContext';
import RouteDistance from './RouteDistance';
import ShippingTotal from '../../ShippingItem/ShippingTotal';

const RouteDetails = ({totalKm, totalMinutes}: any) => {
  const navigation = useNavigation<any>();

  //CONTEXT DATA
  const {
    updateNewReturn,
    cartFee,
    RITURNIT_DISCOUNT,
    sumTotal,
    userLoad,
    deliveryFee,
  }: any = useReturnContext();

  // USE STATE VARIABLES
  const [onLoading, setOnLoading] = useState(false);

  // ITEMS TO RETURN FUNCTION
  const createItemsReturns = async () => {
    if (onLoading) {
      return;
    }
    setOnLoading(true);
    try {
      await updateNewReturn();
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: 'ReturnCreated',
            },
          ],
        }),
      );
    } catch (error) {
      Alert.alert('Oops', (error as Error).message);
    } finally {
      setOnLoading(false);
    }
  };

  if (userLoad) {
    return (
      <ActivityIndicator
        style={{flex: 1, justifyContent: 'center'}}
        size={'large'}
        color={'#3580ff'}
      />
    );
  }

  return (
    <View>
      <Spinner
        visible={onLoading}
        animation={'fade'}
        overlayColor={'rgba(0,0,0,0.5)'}
      />

      {/* Distance in miles */}
      <RouteDistance
        distance={totalKm.toFixed(2)}
        duration={timeConvert(totalMinutes)}
      />

      <View
        style={{
          paddingTop: SIZES.base,
          marginHorizontal: SIZES.base,
        }}>
        {/* Delivery Cost */}
        <ShippingTotal
          cartFee={cartFee.toFixed(2)}
          deliveryFee={deliveryFee}
          total={sumTotal.toFixed(2)}
          discount={RITURNIT_DISCOUNT.toFixed(2)}
        />
      </View>

      <TextButton
        label={onLoading ? 'Loading...' : 'Check Out'}
        labelStyle={{color: COLORS.white, ...FONTS.h5}}
        buttonContainerStyle={{
          height: 45,
          width: 300,
          marginTop: SIZES.radius,
        }}
        onPress={() => createItemsReturns()}
      />
    </View>
  );
};

function mapStateToProps(state: {themeReducer: {appTheme: any}; error: any}) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}
export default connect(mapStateToProps)(RouteDetails);

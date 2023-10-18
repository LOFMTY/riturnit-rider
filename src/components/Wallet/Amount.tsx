import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {SIZES, FONTS, COLORS} from '../../constants';

const Amount = ({onPress, amount, value, appTheme}: any) => {
  return (
    <TouchableOpacity
      style={[
        {
          height: 40,
          width: 90,
          borderRadius: SIZES.padding,
          backgroundColor: appTheme.amountSelect,
          justifyContent: 'space-between',
        },
        {
          backgroundColor:
            value === amount ? COLORS.gradient2 : appTheme.tabBackgroundColor,
        },
      ]}
      onPress={() => onPress(amount)}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          borderRadius: SIZES.padding,
        }}>
        <Text
          style={{
            ...FONTS.body2,
            lineHeight: 18,
            textAlign: 'center',
            color: appTheme.textColor,
          }}>
          ${amount}
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

export default connect(mapStateToProps)(Amount);

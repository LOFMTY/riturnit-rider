import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {connect} from 'react-redux';

import {FONTS, SIZES, COLORS} from '../../constants';

const CardInput = ({
  containerStyle,
  inputContainerStyle,
  label,
  placeholder,
  appTheme,
  inputStyle,
  value = '',
  prependComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  keyboardType = 'default',
  autoCompleteType = 'off',
  autoCapitalize = 'none',
  errorMsg = '',
  maxLength,
}: any) => {
  return (
    <View style={{...containerStyle}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            color: appTheme.textColor,
            ...FONTS.body1,
            fontWeight: '500',
          }}>
          {label}
        </Text>
        <Text style={{color: COLORS.red, ...FONTS.body4}}>{errorMsg}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          height: SIZES.height > 700 ? 50 : 45,
          paddingHorizontal: 20,
          marginTop: SIZES.height > 700 ? SIZES.radius : 6,
          borderRadius: SIZES.radius,
          backgroundColor: appTheme.tabBackgroundColor,
          ...inputContainerStyle,
        }}>
        {prependComponent}
        <TextInput
          style={{
            flex: 1,
            ...FONTS.body1,
            color: appTheme.textColor,
          }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoComplete={autoCompleteType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          onChangeText={text => onChange(text)}
        />
        {appendComponent}
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

export default connect(mapStateToProps)(CardInput);

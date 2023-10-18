import {Control, Controller} from 'react-hook-form';
import {KeyboardTypeOptions, Text, TextInput, View} from 'react-native';
import {connect} from 'react-redux';

import {COLORS, FONTS, SIZES} from '../../constants';
import {User} from '../../models';
import React from 'react';

export type IEditableUserField = 'name' | 'phone_number' | 'email' | 'image' | 'home_address';
export type IEditableUser = Pick<User, IEditableUserField>;

interface ICustomInput {
  label: string;
  multiline?: boolean;
  control: Control<IEditableUser, object>;
  name: IEditableUserField;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  rules?: object;
  appTheme: any;
  textInputStyle?: any;
}

const CustomInput = ({
  appTheme,
  label,
  editable,
  keyboardType,
  control,
  name,
  textInputStyle,
  multiline = false,
  rules = {},
}: ICustomInput) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({field: {onChange, value, onBlur}, fieldState: {error}}) => {
      return (
        <View style={{paddingTop: SIZES.radius}}>
          <View>
            <Text style={{color: appTheme.textColor, ...FONTS.h6}}>
              {label}
            </Text>
          </View>

          <View style={{paddingTop: 4}}>
            <TextInput
              value={value || ' '}
              onChangeText={onChange}
              onBlur={onBlur}
              style={{
                borderWidth: 0.3,
                paddingLeft: 10,
                height: 45,
                ...FONTS.body3,
                borderRadius: SIZES.base,
                color: appTheme.textColor,
                backgroundColor: appTheme.inputBackgroundColor,
                borderColor: error ? COLORS.scarlet : appTheme.buttonText,
                ...textInputStyle,
              }}
              editable={editable}
              keyboardType={keyboardType}
              placeholder={label}
              multiline={multiline}
            />
          </View>
          {error && (
            <Text
              style={{
                color: COLORS.red2,
                paddingLeft: 10,
                paddingTop: 10,
                ...FONTS.h6,
              }}>
              {error.message || 'Error'}
            </Text>
          )}
        </View>
      );
    }}
  />
);

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(CustomInput);

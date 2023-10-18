import {View, Text, TouchableOpacity, Modal, TextInput} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';

import {SIZES, FONTS, COLORS} from '../../constants';

const InputCustomAmountModal = ({
  appTheme,
  onRequestClose,
  visible,
  noCancel,
}: any) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      amount: '',
    },
  });

  const submitAmount = (data: any) => {
    // navigation.navigate('Profile', data);
    // console.log('custom amount', data?.amount);
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <View
            style={{
              margin: 40,
              backgroundColor: appTheme.backgroundColor,
              borderRadius: SIZES.base,
            }}>
            {/* Alert Header Message */}
            <View style={{marginTop: SIZES.padding}}>
              <Text
                style={{
                  marginBottom: SIZES.padding,
                  textAlign: 'center',
                  ...FONTS.body2,
                  color: appTheme.textColor,
                }}>
                Input custom amount
              </Text>
            </View>

            <View style={{paddingHorizontal: SIZES.margin}}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    selectTextOnFocus={true}
                    textContentType={'telephoneNumber'}
                    maxFontSizeMultiplier={0}
                    keyboardType={'phone-pad'}
                    returnKeyType={'done'}
                    style={{
                      borderWidth: 0.3,
                      paddingLeft: 10,
                      height: 40,
                      ...FONTS.body2,
                      borderRadius: SIZES.radius,
                      borderColor: appTheme.buttonText,
                      color: appTheme.textColor,
                      backgroundColor: appTheme.inputBackgroundColor,
                    }}
                  />
                )}
                name="amount"
              />
            </View>
            {errors.amount ? (
              <Text
                style={{
                  color: COLORS.red2,
                  paddingLeft: 15,
                  paddingTop: SIZES.base,
                  ...FONTS.body3,
                }}>
                This field is required.
              </Text>
            ) : (
              <View />
            )}

            {/* Confirm amount Button */}
            <View
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 15,
              }}>
              <TouchableOpacity
                style={{
                  borderRadius: SIZES.base,
                  padding: 10,
                  height: 40,
                  width: 150,
                  elevation: 2,
                  backgroundColor: COLORS.gradient2,
                }}
                onPress={handleSubmit(submitAmount)}>
                <Text
                  style={{
                    fontWeight: '500',
                    textAlign: 'center',
                    ...FONTS.h6,
                    color: COLORS.white,
                  }}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>

            {/* Cancel Button */}
            <View
              style={{
                marginTop: SIZES.radius,
                justifyContent: 'center',
                alignSelf: 'center',
                marginBottom: 15,
              }}>
              <TouchableOpacity
                style={{
                  borderRadius: SIZES.base,
                  padding: 10,
                  height: 40,
                  width: 150,
                  elevation: 2,
                  backgroundColor: COLORS.gainsboro,
                }}
                onPress={noCancel}>
                <Text
                  style={{
                    textAlign: 'center',
                    ...FONTS.h6,
                    color: COLORS.black,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
  };
}

export default connect(mapStateToProps)(InputCustomAmountModal);

import {View, Text, Pressable, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import React, { useState } from 'react';
import {connect} from 'react-redux';
import {v4 as uuidV4} from 'uuid';
import FastImage from 'react-native-fast-image';
import {SIZES, FONTS, icons} from '../../constants';
import { Header } from '../../components';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

const AddCard = ({appTheme, onPress}: any) => {
  const navigation = useNavigation<any>();

  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')

  const isDisabled = card?.length < 14 || expiry?.length !== 5 || cvv?.length !== 3
  
  const handleExpiryChange = (text: string) => {
    text = text.replace(/\D/g, '');

    if (text.length > 4) {
      return;
    }

    if (text.length >= 3) {
      text = text.slice(0, 2) + '/' + text.slice(2);
    }

    setExpiry(text);
  }

  const handleCardChange = (text: string) => {
    text = text.replace(/\D/g, '');
    text = text.substring(0, 16);

    let formattedText = '';
    for (let i = 0; i < text.length; i += 4) {
      if (i > 0) {
        formattedText += ' ';
      }
      formattedText += text.substr(i, 4);
    }

    setCard(formattedText);
  }

  const onSubmit = async () => {
    const newObj = {
        id: uuidV4(),
        img: require('../../assets/icons/card.png'),
        label: '----1942',
        amount: 0,
        cardNumber: card.replace(/\s/g, ''),
        cvv,
        expiryDate: expiry
      };
      
    try {
        const jsonValue = JSON.stringify([newObj]);
        await AsyncStorage.setItem('selectedPayment', jsonValue);
        navigation.navigate('MyProfile')
      } catch (error) {
        // saving error
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: 'Error',
          textBody: 'Something went wrong',
          autoClose: 1000,
        });
      }
  }

  return (
    <View
      style={{
        flex: 1,
          backgroundColor: appTheme.backgroundColor,
      }}>
        <Header
          title="Add card "
          onPress={() => navigation.goBack()}
          titleContainerStyle={{alignItems: 'center', paddingRight: 30}}
        />
        <ScrollView scrollEnabled={false}>
            <TextInput
                value={card}
                onChangeText={handleCardChange}
                keyboardType='number-pad'
                placeholder='Card Number'
                style={{
                    marginTop: 40,
                    height: 60,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: '#DCDCDC',
                    marginHorizontal: 29,
                    paddingLeft: 16,
                    color: appTheme.textColor
                }}
                placeholderTextColor={'#898A8D'}
            />
            <View style={{
                flex: 1,
                flexDirection: 'row',
                marginHorizontal: 29,
                gap: 16
            }}>
                <View style={{
                    flex: 2,
                }}>
                    <TextInput
                        value={expiry}
                        onChangeText={handleExpiryChange}
                        keyboardType='number-pad'
                        placeholder='MM/YY'
                        style={{
                            marginTop: 40,
                            height: 60,
                            borderRadius: 16,
                            borderWidth: 1,
                            borderColor: '#DCDCDC',
                            paddingLeft: 16,
                            color: appTheme.textColor
                        }}
                        maxLength={5}
                        placeholderTextColor={'#898A8D'}
                    />
                </View>
                <View style={{
                    flex: 1,
                }}>
                    <TextInput
                        value={cvv}
                        onChangeText={setCvv}
                        secureTextEntry={true}
                        keyboardType='number-pad'
                        placeholder='CVV'
                        maxLength={3}
                        style={{
                            marginTop: 40,
                            height: 60,
                            borderRadius: 16,
                            borderWidth: 1,
                            borderColor: '#DCDCDC',
                            paddingLeft: 16,
                            color: appTheme.textColor
                        }}
                        placeholderTextColor={'#898A8D'}
                    />
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 24
            }}>
                <FastImage
                    source={require('../../assets/icons/padlock2.png')}
                    style={{
                        width: 24,
                        height: 24
                    }}
                />
                <Text style={{
                    fontSize: 12,
                    color: '#757577'
                }}>Your payment info will be stored securely.</Text>
            </View>
        </ScrollView>
        <TouchableOpacity
            disabled={isDisabled}
            onPress={onSubmit}
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
                    opacity: isDisabled ? 0.4 : 1,
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
  );
};

function mapStateToProps(state: {themeReducer: {appTheme: any}; error: any}) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(AddCard);
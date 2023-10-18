import React, {useState} from 'react';
import {View, Text, TextInput, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import FastImage from 'react-native-fast-image';
import {useMutation, useQuery} from '@apollo/client';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import Spinner from 'react-native-loading-spinner-overlay';

import {COLORS, FONTS, SIZES, icons} from '../../constants';
import {ScanInfo, SubHeader, TextButton} from '../../components';
import {ScanDetailsRouteProp} from '../../type/navigation';
import {
  CreateProductMutation,
  CreateProductMutationVariables,
  GetStoreQuery,
  GetStoreQueryVariables,
  ListStoresQuery,
  ListStoresQueryVariables,
} from '../../API';
import {useAuthContext} from '../../context/AuthContext';
import {
  createProduct,
  getStore,
  listStores,
} from '../../queries/Home/StoreQueries';

interface IScanDetails {
  name: string;
  image: string;
  description: string;
  price: any;
}

const ScanDetails = ({appTheme}: any) => {
  const navigation = useNavigation<any>();
  const route = useRoute<ScanDetailsRouteProp>();
  const {name, image, description, price}: IScanDetails = route?.params;

  const {userID} = useAuthContext();

  const {loading, data} = useQuery<ListStoresQuery, ListStoresQueryVariables>(
    listStores,
  );
  const storeNames = data?.listStores?.items || [];

  const [quantity, setQuantity] = useState<any>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [stores, setStores] = useState<any>(storeNames);
  const [storeID, setStoreID] = useState('');

  const {data: onData} = useQuery<GetStoreQuery, GetStoreQueryVariables>(
    getStore,
    {
      variables: {id: storeID},
    },
  );
  const getStoreInfo: any = onData?.getStore?.expiryDays;

  const productScanExpiry = dayjs().add(getStoreInfo, 'd').format('YYYY-MM-DD');

  function isSubmit() {
    return quantity != '' && stores !== '';
  }

  const [doCreateProduct] = useMutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >(createProduct);

  const onSubmit = async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await doCreateProduct({
        variables: {
          input: {
            name: name,
            image: image,
            description: description,
            expiry_date: productScanExpiry,
            quantity: quantity,
            price: price,
            userID: userID,
            storeID: storeID,
          },
        },
      });
      navigation.popToTop();
      navigation.navigate('HomeStack');
      // console.log('PRODUCT CREATED', response);
    } catch (error) {
      Alert.alert((error as Error).message);
      setIsSubmitting(false);
    }
  };

  function renderFormSection() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding,
          justifyContent: 'center',
          marginBottom: 150,
        }}>
        <Text
          style={{
            color: appTheme.textColor,
            ...FONTS.h6,
          }}>
          Quantity
        </Text>

        <View style={{marginTop: SIZES.base}}>
          <TextInput
            onChangeText={setQuantity}
            value={quantity}
            selectTextOnFocus={true}
            maxFontSizeMultiplier={0}
            returnKeyType={'done'}
            placeholder="Product quantity"
            placeholderTextColor={appTheme.inputColor}
            keyboardType={'numeric'}
            style={{
              padding: SIZES.radius,
              height: 45,
              backgroundColor: appTheme.tabBackgroundColor,
              borderRadius: SIZES.radius,
              color: appTheme.textColor,
              ...FONTS.body3,
            }}
          />
        </View>

        <View style={{justifyContent: 'center', marginTop: SIZES.radius}}>
          <Text
            style={{
              color: appTheme.textColor,
              ...FONTS.h6,
            }}>
            Store
          </Text>
        </View>

        <DropDownPicker
          schema={{
            label: 'name',
            value: 'id',
          }}
          open={open}
          showArrowIcon={true}
          placeholder="Select store"
          showTickIcon={true}
          dropDownDirection="AUTO"
          listMode="MODAL"
          value={value}
          items={stores}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setStores}
          style={{
            backgroundColor: appTheme.tabBackgroundColor,
            borderRadius: SIZES.radius,
            height: 50,
            marginTop: SIZES.base,
            borderColor: appTheme.tabBackgroundColor,
          }}
          loading={loading}
          placeholderStyle={{color: appTheme.inputColor, ...FONTS.body3}}
          textStyle={{
            ...FONTS.body3,
            color: appTheme.textColor,
          }}
          disabledStyle={{
            backgroundColor: appTheme.tabBackgroundColor,
          }}
          labelStyle={{
            fontWeight: '500',
          }}
          arrowIconStyle={{
            width: 20,
            height: 20,
          }}
          tickIconStyle={{
            width: 20,
            height: 20,
          }}
          closeIconStyle={{
            width: 25,
            height: 25,
          }}
          modalProps={{
            animationType: 'fade',
          }}
          ArrowDownIconComponent={({style}) => (
            <FastImage
              source={icons.down}
              style={{width: 15, height: 15}}
              tintColor={appTheme.textColor}
            />
          )}
          modalContentContainerStyle={{
            backgroundColor: appTheme.backgroundColor,
            paddingHorizontal: SIZES.padding * 3,
          }}
          modalTitle="Select store where item was purchased"
          modalTitleStyle={{
            fontWeight: '500',
          }}
          onChangeValue={(value: any) => {
            setStoreID(value);
            // console.log('value', value);
          }}
        />

        <TextButton
          disabled={isSubmit() ? false : true}
          label={isSubmitting ? 'Submitting...' : 'Submit'}
          labelStyle={{color: COLORS.white, ...FONTS.h5}}
          buttonContainerStyle={{
            height: 45,
            width: 300,
            marginTop: SIZES.margin,
            backgroundColor: isSubmit() ? COLORS.gradient2 : COLORS.gray,
          }}
          onPress={onSubmit}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.backgroundColor,
      }}>
      <Spinner
        visible={isSubmitting}
        animation={'fade'}
        overlayColor={'rgba(0,0,0,0.5)'}
      />
      <SubHeader title="Product Details" />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        extraHeight={200}
        extraScrollHeight={200}>
        <ScanInfo
          productImage={image}
          productName={name}
          productDescription={description}
          productPrice={price}
          expiryPeriod={getStoreInfo}
        />
        {renderFormSection()}
      </KeyboardAwareScrollView>
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(ScanDetails);

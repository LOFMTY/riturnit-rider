import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Linking,
  ActivityIndicator,
  Alert,
  Vibration,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Svg, Defs, Mask, Rect} from 'react-native-svg';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

import {COLORS, SIZES, FONTS, icons} from '../../constants';
import {ScanHeader} from '../../components';
import {ScanNavigationProp} from '../../type/navigation';

const Scan = ({appTheme}: any) => {
  const navigation = useNavigation<ScanNavigationProp>();

  // Camera
  const devices = useCameraDevices();
  const device = devices.back;

  const [barcode, setBarcode] = useState('');
  const [torch, setTorch] = useState<any>('off');

  const [frameProcessor, barcodes] = useScanBarcodes(
    [BarcodeFormat.ALL_FORMATS],
    {checkInverted: true},
  );

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') await Linking.openSettings();
  }, []);

  const toggleTorch = () => {
    setTorch(torch === 'off' ? 'on' : 'off');
  };

  const toggleActiveState = () => {
    if (barcodes.length > 0) {
      barcodes.map((scanBarcode: any) => {
        if (scanBarcode.rawValue !== '') {
          setBarcode(scanBarcode?.rawValue);
        }
        fetchUser(barcode);
      });
    }
  };

  const fetchUser = async (data: any) => {
    const url = `https://barcode-lookup.p.rapidapi.com/v3/products?barcode=${data}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '9828d41bb8mshdf670648d600c69p1f3394jsn0903910e2d94',
        'X-RapidAPI-Host': 'barcode-lookup.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      Vibration.vibrate();
      console.log('result', result);

      navigation.navigate('ScanDetails', {
        image: '',
        name: '',
        description: '',
        price: 0,
      });
    } catch (error) {
      Alert.alert((error as Error).message);
    }
  };

  useEffect(() => {
    let unmounted = false;
    toggleActiveState();
    return () => {
      unmounted = true;
    };
  }, [barcodes]);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  // Camera Frame
  function CameraFrame() {
    return (
      <Svg height="100%" width="100%">
        <Defs>
          <Mask id="mask" x="0" y="0" height="100%" width="100%">
            <Rect height="100%" width="100%" fill="#fff" />
            <Rect
              x="14%"
              y="25%"
              rx={SIZES.radius}
              width="280"
              height="250"
              fill="black"
            />
          </Mask>
        </Defs>

        <Rect
          height="100%"
          width="100%"
          fill="rgba(0, 0, 0, 0.8)"
          mask="url(#mask)"
        />
      </Svg>
    );
  }

  function renderCameraSection() {
    if (device == null) {
      return (
        <ActivityIndicator
          size="large"
          color={'#3580ff'}
          style={{flex: 1, backgroundColor: COLORS.black}}
        />
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <Camera
            style={StyleSheet.absoluteFill}
            isActive={true}
            device={device}
            enableZoomGesture
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
            torch={torch}
          />

          {/* QR Code Camera Frame */}
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}>
            <CameraFrame />
            {/* Label 1 */}
            <View
              style={{
                position: 'absolute',
                top: '5%',
                left: 0,
                right: 0,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.h2,
                  color: COLORS.white,
                }}>
                Scan product...
              </Text>
            </View>

            {/* Label 2 */}
            <View
              style={{
                position: 'absolute',
                top: SIZES.height * 0.3 + 350,
                left: 0,
                right: 0,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.body2,
                  color: COLORS.white,
                  fontWeight: '700',
                }}>
                Align the barcode in the middle of this box
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.tabBackgroundColor,
      }}>
      <ScanHeader
        icon={torch === 'off' ? icons.flashOff : icons.flash}
        title={'Scan barcode'}
        // onPress={toggleTorch}
        onPress={() =>
          navigation.navigate('ScanDetails', {
            image:
              'https://res.cloudinary.com/dy6v7jqqk/image/upload/v1674481731/Riturnit/Customer/assets/images/logitech.jpg',
            name: 'Logitech Keyboard',
            description: 'cool key',
            price: 99.89,
          })
        }
      />
      {renderCameraSection()}
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(Scan);

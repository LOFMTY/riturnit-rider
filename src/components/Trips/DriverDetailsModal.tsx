import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  Pressable,
} from 'react-native';
import {Storage} from 'aws-amplify';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

import {COLORS, FONTS, SIZES} from '../../constants';
import {DEFAULT_PROFILE_IMG} from '../../utilities/Utils';

const DriverDetailsModal = ({
  isVisible,
  onClose,
  appTheme,
  driverImage,
  driverName,
  plateNumber,
  vehicleType,
}: any) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  const [imageUri, setImageUri] = useState<any>(null);
  const [showDriverDetailsModal, setShowDriverDetailsModal] =
    useState(isVisible);

  useEffect(() => {
    let unmounted = false;
    if (showDriverDetailsModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => onClose());
    }
     return () => {
      unmounted = true;
    };
  }, [showDriverDetailsModal]);

  useEffect(() => {
    let unmounted = false;
    if (driverImage) {
      Storage.get(driverImage).then(setImageUri);
    }
     return () => {
      unmounted = true;
    };
  }, [driverImage]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      SIZES.height,
      SIZES.height > 700 ? SIZES.height - 270 : SIZES.height - 580,
    ],
  });

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.transparentBlack2,
        }}>
        {/* transparent background */}
        <TouchableWithoutFeedback
          onPress={() => setShowDriverDetailsModal(false)}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: modalY,
            width: '100%',
            height: '100%',
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: appTheme.backgroundColor,
          }}>
          {/* Driver FastImage */}
          <Pressable
            style={{
              alignItems: 'center',
              paddingHorizontal: SIZES.padding,
            }}
            onPress={() => setShowDriverDetailsModal(true)}>
            <FastImage
              source={{uri: imageUri || DEFAULT_PROFILE_IMG}}
              resizeMode={FastImage.resizeMode.cover}
              style={{
                width: 100,
                height: 100,
                borderRadius: SIZES.padding * 2,
                borderWidth: 1,
                borderColor: appTheme.textColor,
              }}
            />
            {/* Driver Name */}
            <View
              style={{
                width: 240,
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: SIZES.radius,
              }}>
              <Text
                style={{
                  color: appTheme.textColor,
                  ...FONTS.h4,
                  fontWeight: '500',
                  letterSpacing: 0.3,
                }}>
                {driverName}
              </Text>
            </View>
          </Pressable>

          {/* Horizontal Rule */}
          <View
            style={{
              alignSelf: 'center',
              marginTop: SIZES.radius,
              width: '100%',
              borderWidth: 0.3,
              borderColor: COLORS.silver,
            }}
          />

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: SIZES.radius,
            }}>
            {/* License Number */}
            <View style={{alignItems: 'flex-start'}}>
              <Text
                style={{
                  ...FONTS.h5,
                  color: appTheme.textColor,
                }}>
                Plate Number
              </Text>
              <Text
                style={{
                  ...FONTS.body3,
                  fontWeight: '500',
                  color: COLORS.gray,
                }}>
                {plateNumber}
              </Text>
            </View>

            {/* Car Model */}
            <View style={{alignItems: 'flex-start'}}>
              <Text
                style={{
                  ...FONTS.h5,
                  color: appTheme.textColor,
                }}>
                Vehicle Type
              </Text>
              <Text
                style={{
                  ...FONTS.body3,
                  fontWeight: '500',
                  color: COLORS.gray,
                }}>
                {vehicleType}
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(DriverDetailsModal);

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';

import {FONTS, COLORS, SIZES, icons} from '../../constants';

const UploadReceiptModal = ({
  isVisible,
  onClose,
  onImageLibraryPress,
  onCameraPress,
  appTheme,
}: any) => {
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [showReceiptModal, setShowReceiptModal] = useState(isVisible);

  useEffect(() => {
    let unmounted = false
    if (showReceiptModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
    return () => {
      unmounted = true;
    };
  }, [showReceiptModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      SIZES.height,
      SIZES.height > 700 ? SIZES.height - 130 : SIZES.height - 120,
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
        <TouchableWithoutFeedback onPress={() => setShowReceiptModal(false)}>
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
            backgroundColor: appTheme.tabBackgroundColor,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: -SIZES.padding,
            }}>
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
              onPress={onImageLibraryPress}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: 30,
                  height: 30,
                  margin: SIZES.base,
                }}
                source={icons.gallery}
              />
              <Text
                style={{
                  color: appTheme.textColor,
                  ...FONTS.body2,
                  fontWeight: '500',
                }}>
                Gallery
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
              onPress={onCameraPress}>
              <FastImage
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: 30,
                  height: 30,
                  margin: 5,
                }}
                source={icons.camera}
              />
              <Text
                style={{
                  color: appTheme.textColor,
                  ...FONTS.body2,
                  fontWeight: '500',
                }}>
                Camera
              </Text>
            </TouchableOpacity>
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

export default connect(mapStateToProps)(UploadReceiptModal);

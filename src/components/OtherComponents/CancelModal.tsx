import {View, Text, TouchableOpacity, Modal} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';

import {SIZES, FONTS, COLORS} from '../../constants';

const CancelModal = ({
  appTheme,
  onRequestClose,
  visible,
  confirmCancel,
  noCancel,
}: any) => {
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
            alignItems: 'center',
          }}>
          <View
            style={{
              margin: 15,
              backgroundColor: appTheme.tabBackgroundColor,
              borderRadius: 20,
              padding: SIZES.padding * 1.2,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            {/* Alert Header Message */}
            <View>
              <Text
                style={{
                  marginBottom: SIZES.padding,
                  textAlign: 'center',
                  ...FONTS.body1,
                  fontWeight: '500',
                  color: appTheme.textColor,
                }}>
                Cancel ride with Driver
              </Text>
            </View>
            {/* Confirm Button */}
            <View style={{justifyContent: 'center'}}>
              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  padding: 10,
                  height: 40,
                  width: 150,
                  elevation: 2,
                  backgroundColor: COLORS.gradient2,
                }}
                onPress={confirmCancel}>
                <Text
                  style={{
                    fontWeight: '500',
                    textAlign: 'center',
                    ...FONTS.body2,
                    color: COLORS.white,
                  }}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
            {/* Cancel Button */}
            <View style={{marginTop: SIZES.radius, justifyContent: 'center'}}>
              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  padding: 10,
                  height: 40,
                  width: 150,
                  elevation: 2,
                  backgroundColor: COLORS.gainsboro,
                }}
                onPress={noCancel}>
                <Text
                  style={{
                    fontWeight: '500',
                    textAlign: 'center',
                    ...FONTS.body2,
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

export default connect(mapStateToProps)(CancelModal);

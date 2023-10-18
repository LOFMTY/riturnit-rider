import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';

import {SIZES, COLORS, FONTS} from '../../constants';

interface IProductProps {
  appTheme: any;
  onPress: Function;
  onDelete: Function;
  showSelect: boolean;
}

const StoreFooterEdit = ({
  showSelect,
  appTheme,
  onPress,
  onDelete,
}: IProductProps) => {
  return (
    <>
      {showSelect && (
        <View
          style={{
            position: 'absolute',
            height: '10%',
            left: 0,
            right: 0,
            bottom: 0,
            padding: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: appTheme.tabBackgroundColor,
            paddingHorizontal: SIZES.padding * 1.2,
          }}>
          <TouchableOpacity
            style={{paddingTop: SIZES.radius}}
            onPress={() => onDelete()}>
            <Text
              style={{
                color: COLORS.gradient1,
                ...FONTS.h4,
                lineHeight: 20,
                fontWeight: '500',
              }}>
              Delete
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{paddingTop: SIZES.radius}}
            onPress={() => onPress()}>
            <Text
              style={{
                color: COLORS.gradient1,
                ...FONTS.h4,
                lineHeight: 20,
                fontWeight: '500',
              }}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

function mapStateToProps(state: any) {
  return {
    appTheme: state.themeReducer.appTheme,
    error: state.error,
  };
}

export default connect(mapStateToProps)(StoreFooterEdit);
